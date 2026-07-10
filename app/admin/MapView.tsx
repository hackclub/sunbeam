"use client";

import { useEffect, useMemo, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { AppRecord } from "./AdminDashboard";

type PocPoint = {
  id: string;
  name: string;
  city?: string;
  email?: string;
  slackId?: string;
  latitude: number;
  longitude: number;
};

function pocPoints(apps: AppRecord[]): PocPoint[] {
  return apps
    .filter((app) => {
      const f = app.fields;
      return (
        f.approve_as_org === "approved" &&
        f.approved_as_poc === true &&
        typeof f.approved_latitude === "number" &&
        typeof f.approved_longitude === "number"
      );
    })
    .map((app) => {
      const f = app.fields;
      return {
        id: app.id,
        name: [f.preferred_name ?? f.first_name, f.last_name].filter(Boolean).join(" ") || "—",
        city: f.approved_city ?? f.host_city,
        email: f.email,
        slackId: f.slack_id,
        latitude: f.approved_latitude as number,
        longitude: f.approved_longitude as number,
      };
    });
}

// Build popup content with DOM nodes so record data is never parsed as HTML.
function popupContent(point: PocPoint): HTMLElement {
  const root = document.createElement("div");
  root.className = "outfit flex flex-col gap-0.5";

  const name = document.createElement("p");
  name.className = "galindo text-blue-dark text-sm font-bold";
  name.textContent = point.name;
  root.appendChild(name);

  if (point.city) {
    const city = document.createElement("p");
    city.className = "text-xs text-blue-dark";
    city.textContent = point.city;
    root.appendChild(city);
  }
  if (point.slackId) {
    const slack = document.createElement("p");
    slack.className = "text-xs text-pink-dark font-semibold";
    slack.textContent = `@${point.slackId}`;
    root.appendChild(slack);
  }
  if (point.email) {
    const email = document.createElement("a");
    email.className = "text-xs text-blue-bright underline";
    email.href = `mailto:${point.email}`;
    email.textContent = point.email;
    root.appendChild(email);
  }

  return root;
}

export default function MapView({ apps, onClose }: { apps: AppRecord[]; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);

  const points = useMemo(() => pocPoints(apps), [apps]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      // Leaflet touches `window` at import time, so load it only in the browser.
      const L = (await import("leaflet")).default;
      if (cancelled || !containerRef.current || mapRef.current) return;

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

      const markers = points.map((point) =>
        L.circleMarker([point.latitude, point.longitude], {
          radius: 8,
          color: "#1e3a8a",
          weight: 2,
          fillColor: "#ec4899",
          fillOpacity: 0.85,
        })
          .bindPopup(popupContent(point))
          .addTo(map)
      );

      if (markers.length > 0) {
        map.fitBounds(L.featureGroup(markers).getBounds().pad(0.2), { maxZoom: 6 });
      }
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [points]);

  return (
    <div className="fixed inset-0 z-50 bg-[#fdf6e3] flex flex-col outfit">
      <div className="bg-[#fdf6e3] border-b border-blue-dark/20 flex items-center justify-between px-6 py-3">
        <button
          onClick={onClose}
          className="text-blue-dark galindo text-sm flex items-center gap-1 hover:opacity-70 transition-opacity"
        >
          ← Back
        </button>
        <span className="galindo text-blue-dark text-sm">
          poc map · {points.length} approved
        </span>
      </div>

      <div ref={containerRef} className="flex-1" />

      {points.length === 0 && (
        <div className="absolute inset-x-0 top-1/2 flex justify-center pointer-events-none">
          <p className="bg-white border border-blue-dark/20 rounded-full px-4 py-2 text-sm text-blue-dark shadow">
            No approved POCs with a verified city yet.
          </p>
        </div>
      )}
    </div>
  );
}
