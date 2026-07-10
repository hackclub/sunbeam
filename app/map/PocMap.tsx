"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

type Poc = {
  preferred_name: string | null;
  first_name: string | null;
  city_name: string | null;
  city_slug: string | null;
  latitude: number;
  longitude: number;
};

export default function PocMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // Leaflet touches `window` at import time, so load it only in the browser.
      const [{ default: L }, res] = await Promise.all([
        import("leaflet"),
        fetch("/api/get-approved-pocs"),
      ]);
      if (cancelled || !containerRef.current || mapRef.current) return;

      if (!res.ok) {
        setError(true);
        return;
      }
      const { pocs }: { pocs: Poc[] } = await res.json();
      if (cancelled) return;
      setCount(pocs.length);

      const map = L.map(containerRef.current, {
        minZoom: 2,
        worldCopyJump: true,
      }).setView([25, 0], 2);
      mapRef.current = map;

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const markers = pocs.map((poc) => {
        const marker = L.circleMarker([poc.latitude, poc.longitude], {
          radius: 8,
          color: "#1e3a8a",
          weight: 2,
          fillColor: "#ec4899",
          fillOpacity: 0.85,
        }).addTo(map);
        // textContent keeps names from being parsed as HTML.
        const popup = document.createElement("div");
        popup.className = "outfit flex flex-col gap-0.5";

        if (poc.city_name) {
          const heading = document.createElement("h1");
          heading.className = "galindo text-blue-dark text-base font-bold";
          heading.textContent = `Sunbeam ${poc.city_name}`;
          popup.appendChild(heading);
        }

        const name = document.createElement("p");
        name.className = "text-sm text-blue-dark";
        name.textContent = `Ran by ${poc.preferred_name ?? (poc.first_name ?? "A sunbeam organizer")}`;
        popup.appendChild(name);

        if (poc.city_slug) {
          const email = document.createElement("p");
          email.className = "text-sm text-pink-dark font-semibold";
          email.textContent = `${poc.city_slug}-sunbeam@events.hackclub.com`;
          popup.appendChild(email);
        }

        marker.bindPopup(popup);
        return marker;
      });

      if (markers.length > 0) {
        map.fitBounds(L.featureGroup(markers).getBounds().pad(0.2), { maxZoom: 6 });
      }
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#fdf6e3] flex flex-col outfit">
      <div className="bg-[#fdf6e3] border-b border-blue-dark/20 flex items-center justify-between px-6 py-3 z-10">
        <a
          href="/"
          className="text-blue-dark galindo text-sm flex items-center gap-1 hover:opacity-70 transition-opacity"
        >
          ← sunbeam
        </a>
        <span className="galindo text-blue-dark text-sm">
          organizer map{count !== null ? ` · ${count} organizers` : ""}
        </span>
      </div>

      <div ref={containerRef} className="flex-1" />

      {error && (
        <div className="absolute inset-x-0 top-1/2 flex justify-center pointer-events-none">
          <p className="bg-white border border-blue-dark/20 rounded-full px-4 py-2 text-sm text-blue-dark shadow">
            Couldn&apos;t load the map right now — try again in a bit.
          </p>
        </div>
      )}
      {count === 0 && (
        <div className="absolute inset-x-0 top-1/2 flex justify-center pointer-events-none">
          <p className="bg-white border border-blue-dark/20 rounded-full px-4 py-2 text-sm text-blue-dark shadow">
            No organizers on the map yet — check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
