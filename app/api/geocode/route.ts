import { requireAdmin } from "@/app/lib/admin-auth";

type NominatimResult = {
	display_name: string;
	lat: string;
	lon: string;
	address?: {
		city?: string;
		town?: string;
		village?: string;
		municipality?: string;
		county?: string;
		state?: string;
		country?: string;
	};
	name?: string;
};

export async function GET(request: Request) {
	const denied = await requireAdmin();
	if (denied) return denied;

	const q = new URL(request.url).searchParams.get("q")?.trim();
	if (!q || q.length < 3) {
		return Response.json({ results: [] });
	}

	const url = new URL("https://nominatim.openstreetmap.org/search");
	url.searchParams.set("q", q);
	url.searchParams.set("format", "jsonv2");
	url.searchParams.set("addressdetails", "1");
	url.searchParams.set("limit", "5");

	const res = await fetch(url, {
		headers: {
			// Nominatim usage policy requires an identifying User-Agent.
			"User-Agent": "sunbeam-admin (hackclub.com)",
			"Accept-Language": "en",
		},
	});

	if (!res.ok) {
		console.error("[geocode] Nominatim error:", res.status, await res.text());
		return Response.json({ error: "Geocoding failed" }, { status: 502 });
	}

	const data: NominatimResult[] = await res.json();

	const results = data
		.map((r) => {
			const a = r.address ?? {};
			const city = a.city ?? a.town ?? a.village ?? a.municipality ?? a.county ?? r.name;
			const latitude = parseFloat(r.lat);
			const longitude = parseFloat(r.lon);
			if (!city || isNaN(latitude) || isNaN(longitude)) return null;
			return {
				city,
				state: a.state ?? null,
				country: a.country ?? null,
				displayName: r.display_name,
				latitude,
				longitude,
			};
		})
		.filter(Boolean);

	return Response.json({ results });
}
