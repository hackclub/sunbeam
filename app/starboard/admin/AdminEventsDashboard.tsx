"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type EventRecord = {
	id: string;
	fields: {
		City?: string;
		organizer?: string[];
		poc?: string[];
		sponsors?: string;
		schedule?: string;
		venue?: string;
		signups?: string[];
	};
};

type FilterOption = {
	key: string;
	label: string;
	test: (event: EventRecord) => boolean;
};

type FilterGroup = {
	title: string;
	options: FilterOption[];
};

const FILTER_GROUPS: FilterGroup[] = [
	{
		title: "Venue",
		options: [
			{ key: "has-venue", label: "Has venue", test: (e) => Boolean(e.fields.venue?.trim()) },
			{ key: "no-venue", label: "No venue", test: (e) => !e.fields.venue?.trim() },
		],
	},
];

export default function AdminEventsDashboard() {
	const [events, setEvents] = useState<EventRecord[] | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [search, setSearch] = useState("");
	const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

	const toggleFilter = (key: string) => {
		setActiveFilters((prev) => {
			const next = new Set(prev);
			if (next.has(key)) next.delete(key);
			else next.add(key);
			return next;
		});
	};

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

	const filtered = (events ?? []).filter((event) => {
		const matchesSearch = (event.fields.City ?? "")
			.toLowerCase()
			.includes(search.toLowerCase());

		const matchesFilters = FILTER_GROUPS.every((group) => {
			const activeOptions = group.options.filter((option) => activeFilters.has(option.key));
			if (activeOptions.length === 0) return true;
			return activeOptions.some((option) => option.test(event));
		});

		return matchesSearch && matchesFilters;
	});

	return (
		<div
			className="min-h-screen outfit p-6"
			style={{
				backgroundImage: "url('/imgs/sand.webp')",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<h1 className="galindo text-blue-dark text-lg mb-4">starboard admin</h1>

			<div className="flex gap-6 items-start">
				<aside className="w-44 shrink-0 flex flex-col gap-5">
					{FILTER_GROUPS.map((group) => (
						<div key={group.title}>
							<p className="text-xs font-bold text-blue-dark mb-2 uppercase tracking-wide">
								{group.title}
							</p>
							<div className="flex flex-col gap-1.5">
								{group.options.map((option) => (
									<label
										key={option.key}
										className="flex items-center gap-2 text-sm text-blue-dark cursor-pointer"
									>
										<input
											type="checkbox"
											checked={activeFilters.has(option.key)}
											onChange={() => toggleFilter(option.key)}
											className="accent-blue-dark"
										/>
										{option.label}
									</label>
								))}
							</div>
						</div>
					))}
				</aside>

				<div className="flex-1">
					<input
						type="text"
						placeholder="Search by city..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full border border-blue-dark rounded-full px-4 py-2 text-sm bg-white outline-none mb-6"
					/>

					{error && <p className="text-sm text-pink-dark font-semibold">{error}</p>}
					{!error && events === null && <p className="text-sm text-blue-dark">Loading events...</p>}

					{events && (
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
							{filtered.map((event) => (
								<Link
									key={event.id}
									href={`/starboard/event?id=${event.id}`}
									className="rounded-2xl border-2 border-blue-dark bg-white p-4 shadow-sm flex flex-col gap-1 cursor-pointer hover:shadow-md transition-shadow"
								>
									<p className="galindo text-blue-dark text-base font-bold leading-tight">
										{event.fields.City ?? "(no city)"}
									</p>
									<p className="text-xs text-blue-dark/60">
										{event.fields.organizer?.length ?? 0} organizer(s), {event.fields.poc?.length ?? 0} poc(s)
									</p>
									<p className="text-xs text-blue-dark/60">
										{event.fields.signups?.length ?? 0} signup(s)
									</p>
									<p className={`text-xs font-semibold ${event.fields.venue?.trim() ? "text-green-700" : "text-pink-dark"}`}>
										{event.fields.venue?.trim() ? "Has venue" : "No venue"}
									</p>
								</Link>
							))}
							{filtered.length === 0 && (
								<p className="col-span-full text-center text-blue-dark text-sm mt-10">
									No events found.
								</p>
							)}
						</div>
					)}
				</div>
			</div>

			<div className="mt-6">
				<a href="/api/starboard-signout" className="text-xs text-blue-bright underline">
					Sign out
				</a>
			</div>
		</div>
	);
}
