"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";

type City = {
	city: string;
	slug: string;
	country: string;
	attendees: number;
	projects: number;
	lat: number | null;
	lng: number | null;
};

function fmt(n: number) {
	return n.toLocaleString("en-US");
}

// Extra room at the top so pins don't start under the banner pinned across the map's top edge.
const FIT = { paddingTopLeft: [24, 90] as [number, number], paddingBottomRight: [24, 24] as [number, number] };

// Pins with more girls are a little bigger, but every city stays easy to tap.
function radius(attendees: number) {
	return Math.min(16, 6 + Math.sqrt(attendees) * 0.45);
}

export default function RecapMap({ cities }: { cities: City[] }) {
	const containerRef = useRef<HTMLDivElement>(null);
	const mapRef = useRef<LeafletMap | null>(null);
	const [selected, setSelected] = useState<City | null>(null);

	useEffect(() => {
		let cancelled = false;

		(async () => {
			// Leaflet touches `window` at import time, so load it only in the browser.
			const { default: L } = await import("leaflet");
			if (cancelled || !containerRef.current || mapRef.current) return;

			const map = L.map(containerRef.current, {
				minZoom: 0,
				zoomSnap: 0.25,
				worldCopyJump: true,
				scrollWheelZoom: false,
				zoomControl: false,
			});
			mapRef.current = map;
			// The banner covers the top-left corner, so keep the controls on the right.
			L.control.zoom({ position: "topright" }).addTo(map);

			L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
				maxZoom: 19,
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			}).addTo(map);

			const placed = cities.filter((c): c is City & { lat: number; lng: number } => c.lat !== null && c.lng !== null);
			// Draw the smaller pins last so they sit on top of big neighbours.
			const markers = [...placed]
				.sort((a, b) => b.attendees - a.attendees)
				.map((c) => {
					const marker = L.circleMarker([c.lat, c.lng], {
						radius: radius(c.attendees),
						color: "#0E387A",
						weight: 2,
						fillColor: "#C54390",
						fillOpacity: 0.85,
					}).addTo(map);
					marker.bindTooltip(c.city, { direction: "top", offset: [0, -6] });
					marker.on("click", () => {
						setSelected(c);
						map.flyTo([c.lat, c.lng], Math.max(map.getZoom(), 5), { duration: 0.8 });
					});
					marker.on("mouseover", () => marker.setStyle({ fillColor: "#D88127" }));
					marker.on("mouseout", () => marker.setStyle({ fillColor: "#C54390" }));
					return marker;
				});

			if (markers.length) {
				map.fitBounds(L.featureGroup(markers).getBounds(), FIT);
			} else {
				map.setView([25, 0], 1);
			}
		})();

		return () => {
			cancelled = true;
			mapRef.current?.remove();
			mapRef.current = null;
		};
	}, [cities]);

	const reset = () => {
		setSelected(null);
		const map = mapRef.current;
		if (!map) return;
		const pts = cities.filter((c) => c.lat !== null && c.lng !== null).map((c) => [c.lat!, c.lng!] as [number, number]);
		if (pts.length) map.flyToBounds(pts, { ...FIT, duration: 0.8 });
	};

	return (
		<div className="relative w-full h-full rounded-[2.5vh] overflow-hidden border-[0.5vh] border-[#2E599C] bg-[#AAD3DF] shadow-lg shadow-blue-dark/20">
			<div ref={containerRef} className="absolute inset-0 z-0" aria-label="Map of every Sunbeam city" />

			{!selected && (
				<p className="pointer-events-none absolute bottom-8 right-3 z-[500] outfit text-xs sm:text-sm text-[#0E387A] bg-[#FBF6E7]/90 border border-[#2E599C] rounded-full px-3 py-1 whitespace-nowrap">
					Tap a pin to see each Sunbeam
				</p>
			)}

			{selected && (
				<div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:w-64 z-[500] bg-[#FBF6E7] border-2 border-[#2E599C] rounded-2xl p-4 shadow-lg">
					<button
						type="button"
						onClick={reset}
						aria-label="Close"
						className="absolute top-2 right-3 text-[#2E599C] text-xl leading-none hover:scale-110"
					>
						×
					</button>
					<p className="galindo text-[#C54390] text-2xl leading-tight pr-5">{selected.city}</p>
					{selected.country !== selected.city && (
						<p className="outfit text-[#0E387A]/60 text-sm">{selected.country}</p>
					)}
					<div className="flex gap-6 mt-3">
						{selected.attendees > 0 && (
							<div>
								<p className="galindo text-[#0E387A] text-3xl leading-none">{fmt(selected.attendees)}</p>
								<p className="outfit text-[#0E387A] text-sm">girls</p>
							</div>
						)}
						<div>
							<p className="galindo text-[#0E387A] text-3xl leading-none">{selected.projects}</p>
							<p className="outfit text-[#0E387A] text-sm">
								{selected.projects === 1 ? "project" : "projects"}
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
