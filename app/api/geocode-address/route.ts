import { requireAdmin } from "@/app/lib/admin-auth";
import { getOrganizerRole } from "@/app/lib/organizer-auth";

type NominatimResult = {
	display_name: string;
	lat: string;
	lon: string;
	address?: {
		road?: string;
		house_number?: string;
		city?: string;
		town?: string;
		village?: string;
		municipality?: string;
		county?: string;
		state?: string;
		country?: string;
		postcode?: string;
	};
	name?: string;
};

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const requestedId = searchParams.get("id");

	// Same auth split as /api/update-event-venue: admins can search while editing any city's
	// venue, otherwise the caller must be the point of contact for their own event.
	if (requestedId) {
		const denied = await requireAdmin();
		if (denied) return denied;
	} else {
		const role = await getOrganizerRole();
		if (!role.ok) return role.response;
		if (!role.roles.some((r) => r.startsWith("person of contact"))) {
			return Response.json({ error: "Only the point of contact can search for a venue" }, { status: 403 });
		}
	}

	const q = searchParams.get("q")?.trim();
	if (!q || q.length < 3) {
		return Response.json({ results: [] });
	}

	const url = new URL("https://nominatim.openstreetmap.org/search");
	url.searchParams.set("q", q);
	url.searchParams.set("format", "jsonv2");
	url.searchParams.set("addressdetails", "1");
	url.searchParams.set("limit", "8");

	const res = await fetch(url, {
		headers: {
			// Nominatim usage policy requires an identifying User-Agent.
			"User-Agent": "sunbeam-admin (hackclub.com)",
			"Accept-Language": "en",
		},
	});

	if (!res.ok) {
		console.error("[geocode-address] Nominatim error:", res.status, await res.text());
		return Response.json({ error: "Geocoding failed" }, { status: 502 });
	}

	const data: NominatimResult[] = await res.json();

	const results = data
		.map((r) => {
			const a = r.address ?? {};
			const latitude = parseFloat(r.lat);
			const longitude = parseFloat(r.lon);
			// Unlike /api/geocode (built for city-level lookups), a venue address doesn't need a
			// resolvable city/town name — a valid pin + display name is enough to save a venue.
			if (!r.display_name || isNaN(latitude) || isNaN(longitude)) return null;
			const street = [a.house_number, a.road].filter(Boolean).join(" ");
			const city = a.city ?? a.town ?? a.village ?? a.municipality ?? a.county ?? null;
			return {
				label: street || r.name || city || r.display_name,
				displayName: r.display_name,
				road: a.road ?? null,
				houseNumber: a.house_number ?? null,
				city,
				state: a.state ?? null,
				country: a.country ?? null,
				postcode: a.postcode ?? null,
				latitude,
				longitude,
			};
		})
		.filter(Boolean);

	return Response.json({ results });
}
