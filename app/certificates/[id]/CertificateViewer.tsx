"use client";

import { useEffect, useRef, useState } from "react";
import type { ModelViewerElement } from "@google/model-viewer";
import { belowCard, CARD_HEIGHT_PERCENT } from "./certificate-layout";

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, unknown>;
    }
  }
}

// An 11in x 8.5in card with three materials: "certificate" (front face, UV-mapped to the whole
// certificate texture), "back" (back face), and "edge" (the four thin sides). Textures are
// applied at runtime, so the same model is shared by every certificate.
const MODEL_SRC = "/certificate/certificate_base_thicker.gltf";
const FRONT_MATERIAL_NAME = "certificate";
const BACK_MATERIAL_NAME = "back";
// Idle sway so the foil catches the light before anyone touches it; stops on first drag.
const SWAY_THETA_DEG = 10;
const SWAY_PHI_DEG = 3;
const SWAY_PERIOD_MS = 18000;

// How close the camera starts, as a % of the distance that fits the whole model in view
// (model-viewer's default is 105%). Lower = the certificate starts bigger. The viewer box is
// much larger than the card so it has room to spin without clipping; on portrait screens the
// card is limited by width instead, so it starts at the fit-everything distance there.
const CAMERA_RADIUS_LANDSCAPE = "101%";
const CAMERA_RADIUS_PORTRAIT = "105%";

export default function CertificateViewer({ id, fullName, version }: { id: string; fullName: string; version: string }) {
  const viewerRef = useRef<ModelViewerElement | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  // `version` changes whenever the rendered images would (see renderVersion), so every layer
  // is fetched as a matching set.
  const base = `/certificates/${encodeURIComponent(id)}/image?v=${version}`;

  useEffect(() => {
    let cancelled = false;
    let swayFrame = 0;
    const viewer = viewerRef.current;
    if (!viewer) return;

    // Measured on the wrapper: <model-viewer> itself can still be an unstyled, 0-width inline
    // element when this runs, before its own styles are defined.
    const box = viewer.parentElement!.getBoundingClientRect();
    const radius = box.width > box.height ? CAMERA_RADIUS_LANDSCAPE : CAMERA_RADIUS_PORTRAIT;
    viewer.cameraOrbit = `0deg 75deg ${radius}`;

    const sway = (startedAt: number) => {
      const tick = (now: number) => {
        const t = ((now - startedAt) / SWAY_PERIOD_MS) * Math.PI * 2;
        viewer.cameraOrbit = `${Math.sin(t) * SWAY_THETA_DEG}deg ${75 + Math.cos(t) * SWAY_PHI_DEG}deg ${radius}`;
        swayFrame = requestAnimationFrame(tick);
      };
      swayFrame = requestAnimationFrame(tick);
    };

    const stopSwayOnUserInput = (event: Event) => {
      if ((event as CustomEvent<{ source: string }>).detail?.source !== "user-interaction") return;
      cancelAnimationFrame(swayFrame);
      viewer.removeEventListener("camera-change", stopSwayOnUserInput);
    };

    const applyCertificate = async () => {
      try {
        const materials = viewer.model?.materials ?? [];
        const material = materials.find((m) => m.name === FRONT_MATERIAL_NAME) ?? materials[0];
        if (!material) throw new Error("certificate model has no materials");

        const backMaterial = materials.find((m) => m.name === BACK_MATERIAL_NAME);

        const [art, metalRoughness, iridescence, back] = await Promise.all([
          viewer.createTexture(`${base}&layer=art&format=webp`),
          viewer.createTexture(`${base}&layer=metal-roughness`),
          viewer.createTexture(`${base}&layer=iridescence`),
          backMaterial ? viewer.createTexture(`${base}&layer=back`) : null,
        ]);
        if (cancelled) return;

        const pbr = material.pbrMetallicRoughness;
        pbr.baseColorTexture?.setTexture(art);
        pbr.setBaseColorFactor([1, 1, 1, 1]);
        // Factors multiply the texture, so 1 hands per-pixel control to the shine map.
        pbr.metallicRoughnessTexture?.setTexture(metalRoughness);
        pbr.setMetallicFactor(1);
        pbr.setRoughnessFactor(1);

        // Clearcoat and iridescence only exist on three.js's physical material, which the glTF
        // loader only creates when the model declares KHR_materials_clearcoat /
        // KHR_materials_iridescence (the model at MODEL_SRC does). A re-export that
        // drops them would make these setters throw, so fall back to the plain foil look instead.
        try {
          // Holographic foil wherever the iridescence map says so (template ink, a hint on the name).
          material.iridescenceTexture.setTexture(iridescence);
          material.setIridescenceFactor(1);
          material.setIridescenceIor(1.3);
          material.setIridescenceThicknessMinimum(100);
          material.setIridescenceThicknessMaximum(420);

          // A glossy laminate over the whole card — most of the "shiny" comes from this.
          material.setClearcoatFactor(1);
          material.setClearcoatRoughnessFactor(0.04);
        } catch (err) {
          console.warn(
            "[certificate viewer] model material has no clearcoat/iridescence extensions — add KHR_materials_clearcoat and KHR_materials_iridescence to the model at MODEL_SRC:",
            err
          );
        }

        // The Onshape export's front-face UVs put v=0 at the card's bottom edge, so the textures
        // would come out upside down. Flip v (v' = 1 - v) on every layer so the shine maps stay
        // aligned with the art. This has to go through the material's own texture slots after
        // setTexture() — a transform set on the created textures beforehand doesn't carry over.
        // Drop this if the model is re-exported with conventional UVs.
        for (const slot of [pbr.baseColorTexture, pbr.metallicRoughnessTexture, material.iridescenceTexture]) {
          slot?.texture?.sampler.setScale({ u: 1, v: -1 });
          slot?.texture?.sampler.setOffset({ u: 0, v: 1 });
        }

        if (backMaterial && back) {
          const backSlot = backMaterial.pbrMetallicRoughness.baseColorTexture;
          backSlot?.setTexture(back);
          // Seen from behind, the back face's u also runs right-to-left, so flip both axes
          // (a 180° turn) for the back design to read correctly.
          backSlot?.texture?.sampler.setScale({ u: -1, v: -1 });
          backSlot?.texture?.sampler.setOffset({ u: 1, v: 1 });
        }

        viewer.dismissPoster();
        setStatus("ready");
        viewer.addEventListener("camera-change", stopSwayOnUserInput);
        sway(performance.now());
      } catch (err) {
        console.error("[certificate viewer] failed to apply certificate textures:", err);
        if (!cancelled) setStatus("error");
      }
    };

    const onError = () => !cancelled && setStatus("error");

    // model-viewer touches `window` at import time, so it's loaded only in the browser.
    import("@google/model-viewer").then(() => {
      if (cancelled) return;
      viewer.addEventListener("load", applyCertificate, { once: true });
      viewer.addEventListener("error", onError, { once: true });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(swayFrame);
      viewer.removeEventListener("load", applyCertificate);
      viewer.removeEventListener("error", onError);
      viewer.removeEventListener("camera-change", stopSwayOnUserInput);
    };
  }, [base]);

  // From md up it fills the whole screen: the canvas is transparent, so the extra space is
  // invisible but lets the card spin without clipping, and the page floats its header and buttons
  // over it. On phones it's a normal block between the header and buttons.
  return (
    <div className="relative h-[45vh] min-h-[300px] w-full md:h-screen md:min-h-[420px]">
      <model-viewer
        ref={viewerRef}
        src={MODEL_SRC}
        // With reveal="manual", model-viewer's default loading waits for dismissPoster() before
        // even fetching the model — but dismissPoster() only runs once the model has loaded and
        // been textured. "eager" fetches it immediately while the flat poster stays up.
        reveal="manual"
        loading="eager"
        alt={`${fullName}'s Sunbeam certificate of achievement`}
        camera-controls
        // The page must always scroll: on touch, vertical swipes scroll the page and only
        // horizontal swipes spin the card (model-viewer's default, "none", captures every swipe);
        // disable-zoom hands the mouse wheel / pinch back to the page instead of zooming the model.
        touch-action="pan-y"
        disable-zoom
        // Spins freely all the way around; the tilt stops short of looking straight down at an edge.
        min-camera-orbit="auto 20deg auto"
        max-camera-orbit="auto 160deg auto"
        interaction-prompt="none"
        environment-image="neutral"
        tone-mapping="neutral"
        exposure="1"
        shadow-intensity="1"
        ar
        ar-modes="webxr scene-viewer quick-look"
        style={{ width: "100%", height: "100%", background: "transparent", "--poster-color": "transparent" } as React.CSSProperties}
      >
        {/* The flat certificate is the poster: it shows while the 3D loads (and stays if WebGL or
            the model is unavailable). Slotted rather than the poster attribute so it can be sized
            to roughly where the 3D card lands, instead of stretching to fill the whole box. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          slot="poster"
          src={`${base}&layer=art&format=webp`}
          alt=""
          className="absolute left-1/2 top-1/2 max-w-full -translate-x-1/2 -translate-y-1/2 object-contain"
          style={{ height: `${CARD_HEIGHT_PERCENT}%` }}
        />
      </model-viewer>
      {/* The certificate's details are already server-rendered; this covers the 3D model and its
          textures loading behind the flat poster. aria-live so screen readers hear the change. */}
      <p
        aria-live="polite"
        className={`outfit pointer-events-none absolute inset-x-0 bottom-2 text-center text-sm text-white/60 md:bottom-auto md:top-[var(--card-anchor)] ${
          status === "loading" ? "animate-pulse" : ""
        }`}
        style={belowCard("0.75rem")}
      >
        {status === "loading" && "Loading certificate…"}
        {status === "ready" && "drag to spin it around"}
        {status === "error" && "Couldn't load the 3D certificate, so here's the flat version"}
      </p>
    </div>
  );
}
