"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Person = { email: string; name: string | null };

type EventRecord = {
	id: string;
	city: string | null;
	country: string | null;
	organizers: Person[];
	pocs: Person[];
	venueConfirmed: boolean;
	signupsCount: number;
};

function personLabel(person?: Person) {
	if (!person) return "—";
	return person.name ?? person.email;
}

export default function AdminEventsDashboard() {
	const [events, setEvents] = useState<EventRecord[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [search, setSearch] = useState("");
	const [venueFilter, setVenueFilter] = useState<"all" | "confirmed" | "tbd">("all");
	const [countryFilter, setCountryFilter] = useState<string>("all");

	useEffect(() => {
		fetch("/api/get-all-events")
			.then((res) => res.json())
			.then((data) => {
				console.log("[starboard] get-all-events:", data);
				setEvents(data.records ?? []);
			})
			.catch((err) => {
				console.error("[starboard] get-all-events failed:", err);
				setError("Failed to load events.");
			});
	}, []);

	const countries = useMemo(() => {
		const set = new Set((events ?? []).map((e) => e.country).filter(Boolean) as string[]);
		return Array.from(set).sort();
	}, [events]);

	const totalSignups = useMemo(
		() => (events ?? []).reduce((sum, e) => sum + e.signupsCount, 0),
		[events]
	);

	const filtered = (events ?? []).filter((event) => {
		const q = search.trim().toLowerCase();
		const matchesSearch =
			!q ||
			(event.city ?? "").toLowerCase().includes(q) ||
			(event.country ?? "").toLowerCase().includes(q);

		const matchesVenue =
			venueFilter === "all" ||
			(venueFilter === "confirmed" ? event.venueConfirmed : !event.venueConfirmed);

		const matchesCountry = countryFilter === "all" || event.country === countryFilter;

		return matchesSearch && matchesVenue && matchesCountry;
	});

	return (
		<div className="relative min-h-screen outfit">
			<div
				className="fixed inset-0 -z-10"
				style={{
					backgroundImage: "url('/imgs/sand.webp')",
					backgroundSize: "cover",
					backgroundPosition: "center bottom",
				}}
			/>
			<div className="p-6 lg:p-10">
			<div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-2 mb-8">
				<h1 className="galindo text-orange-dark text-5xl lg:text-6xl">
					Starboard
				</h1>
				<p className="text-blue-dark outfit">All events in one place</p>
			</div>

			<div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
				<div className="glassbox-white rounded-2xl p-6">
					<p className="galindo text-blue-dark text-4xl lg:text-5xl">{totalSignups}</p>
					<p className="text-blue-dark/70 text-sm mt-1">Sign Ups</p>
				</div>
				<div className="glassbox-white rounded-2xl p-6">
					<p className="galindo text-blue-dark text-4xl lg:text-5xl">{events?.length ?? 0}</p>
					<p className="text-blue-dark/70 text-sm mt-1">Events</p>
				</div>
			</div>

			<div className="max-w-6xl mx-auto">
				<h2 className="galindo text-blue-dark text-xl mb-4">Events</h2>

				<div className="glassbox-white rounded-2xl p-4 flex flex-col sm:flex-row gap-3 mb-4">
					<input
						type="text"
						placeholder="Search events, cities, countries..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="flex-1 border border-blue-dark/30 rounded-full px-4 py-2 text-sm bg-white outline-none"
					/>
					<select
						value={venueFilter}
						onChange={(e) => setVenueFilter(e.target.value as "all" | "confirmed" | "tbd")}
						className="border border-blue-dark/30 rounded-full px-4 py-2 text-sm bg-white outline-none text-blue-dark"
					>
						<option value="all">All venues</option>
						<option value="confirmed">Venue confirmed</option>
						<option value="tbd">Venue TBD</option>
					</select>
					<select
						value={countryFilter}
						onChange={(e) => setCountryFilter(e.target.value)}
						className="border border-blue-dark/30 rounded-full px-4 py-2 text-sm bg-white outline-none text-blue-dark"
					>
						<option value="all">All Countries</option>
						{countries.map((c) => (
							<option key={c} value={c}>
								{c}
							</option>
						))}
					</select>
				</div>

				{error && <p className="text-sm text-pink-dark font-semibold">{error}</p>}
				{!error && events === null && <p className="text-sm text-blue-dark">Loading events...</p>}

				{events && (
					<>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{filtered.map((event) => (
								<Link
									key={event.id}
									href={`/starboard/event?id=${event.id}`}
									className="glassbox-white rounded-2xl p-5 flex flex-col gap-3 hover:scale-102 duration-200"
								>
									<div className="flex items-start justify-between gap-2">
										<p className="galindo text-blue-dark text-lg leading-tight">
											{event.city ?? "(no city)"}
										</p>
										<span
											className={`shrink-0 text-xs font-semibold px-2 py-1 rounded-full ${
												event.venueConfirmed
													? "bg-green-100 text-green-700"
													: "bg-pink-bright/20 text-pink-dark"
											}`}
										>
											{event.venueConfirmed ? "venue confirmed" : "venue TBD"}
										</span>
									</div>

									{event.country && (
										<p className="text-xs text-blue-dark/60">
											📍 {event.city}, {event.country}
										</p>
									)}

									<div className="flex gap-6 text-xs text-blue-dark/70">
										<div>
											<p className="uppercase tracking-wide text-blue-dark/40">Organizers</p>
											<p className="font-semibold text-blue-dark">{event.organizers.length}</p>
										</div>
										<div>
											<p className="uppercase tracking-wide text-blue-dark/40">Signups</p>
											<p className="font-semibold text-blue-dark">{event.signupsCount}</p>
										</div>
									</div>

									<div className="text-xs text-blue-dark/70 border-t border-blue-dark/10 pt-2">
										<p>
											<span className="text-blue-dark/40">POC: </span>
											{personLabel(event.pocs[0])}
										</p>
										<p>
											<span className="text-blue-dark/40">Organizers: </span>
											{personLabel(event.organizers[0])}
										</p>
									</div>
								</Link>
							))}
							{filtered.length === 0 && (
								<p className="col-span-full text-center text-blue-dark text-sm mt-10">
									No events found.
								</p>
							)}
						</div>
					</>
				)}
			</div>

			<div className="max-w-6xl mx-auto mt-8">
				<a href="/api/starboard-signout" className="text-xs text-blue-bright underline">
					Sign out
				</a>
			</div>
			</div>
		</div>
	);
}
