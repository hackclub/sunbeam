"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dayjs from "dayjs";

type ScheduleItem = { time: string; event: string };
type Sponsor = { name: string; logo: string };
type AddressResult = { displayName: string; latitude: number; longitude: number };

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

type Person = { name: string | null; email: string };

type EventResponse = {
	record: EventRecord | null;
	organizers?: Person[];
	pocs?: Person[];
	slug?: string | null;
};

function parseSchedule(raw: string | undefined): ScheduleItem[] {
	if (!raw) return [];
	try {
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed
			.filter((item) => item && typeof item === "object")
			.map((item) => ({ time: String(item.time ?? ""), event: String(item.event ?? "") }));
	} catch {
		return [];
	}
}

function parseSponsors(raw: string | undefined): Sponsor[] {
	if (!raw) return [];
	try {
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed
			.filter((item) => item && typeof item === "object")
			.map((item) => ({ name: String(item.name ?? ""), logo: String(item.logo ?? "") }));
	} catch {
		return [];
	}
}

function SponsorsEditor({ initialSponsors, eventId }: { initialSponsors: Sponsor[]; eventId?: string }) {
	const [items, setItems] = useState<Sponsor[]>(initialSponsors);
	const [saving, setSaving] = useState(false);
	const [status, setStatus] = useState<string | null>(null);

	function updateItem(index: number, field: "name" | "logo", value: string) {
		setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
	}

	function addRow() {
		setItems((prev) => [...prev, { name: "", logo: "" }]);
	}

	function removeRow(index: number) {
		setItems((prev) => prev.filter((_, i) => i !== index));
	}

	async function handleSave() {
		setSaving(true);
		setStatus(null);
		try {
			const res = await fetch("/api/update-event-sponsors", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: eventId, sponsors: items }),
			});
			if (!res.ok) throw new Error(await res.text());
			setStatus("Saved!");
		} catch (err) {
			console.error("[starboard/event] update-event-sponsors failed:", err);
			setStatus("Failed to save sponsors.");
		} finally {
			setSaving(false);
		}
	}

	return (
		<div className="flex flex-col gap-2">
			<span className="text-xs font-bold text-blue-dark/60 uppercase tracking-wide">Sponsors</span>

			<div className="flex flex-col gap-2">
				{items.map((item, index) => (
					<div key={index} className="flex gap-2 items-center">
						<input
							type="text"
							placeholder="GitHub Education"
							value={item.name}
							onChange={(e) => updateItem(index, "name", e.target.value)}
							className="outfit bg-white px-2 py-1 text-xs text-blue-dark border-2 border-blue-dark rounded-lg outline-none w-40"
						/>
						<input
							type="text"
							placeholder="https://.../logo.png"
							value={item.logo}
							onChange={(e) => updateItem(index, "logo", e.target.value)}
							className="outfit bg-white px-2 py-1 text-xs text-blue-dark border-2 border-blue-dark rounded-lg outline-none flex-1"
						/>
						<button
							type="button"
							onClick={() => removeRow(index)}
							className="text-xs text-pink-dark underline"
						>
							Remove
						</button>
					</div>
				))}
			</div>

			<div className="flex items-center gap-3">
				<button
					type="button"
					onClick={addRow}
					className="text-xs text-blue-bright underline w-fit"
				>
					+ Add row
				</button>
				<button
					type="button"
					onClick={handleSave}
					disabled={saving}
					className="bg-blue-dark text-white galindo px-4 py-1 rounded-full text-xs hover:opacity-90 transition-opacity disabled:opacity-60"
				>
					{saving ? "Saving..." : "Save sponsors"}
				</button>
				{status && <span className="text-xs text-blue-dark">{status}</span>}
			</div>
		</div>
	);
}

function VenueEditor({
	initialVenue,
	eventId,
	canEdit,
}: {
	initialVenue?: string;
	eventId?: string;
	canEdit: boolean;
}) {
	const [query, setQuery] = useState(initialVenue ?? "");
	const [savedVenue, setSavedVenue] = useState(initialVenue ?? "");
	const [results, setResults] = useState<AddressResult[]>([]);
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!canEdit) return;
		const q = query.trim();
		if (q.length < 3 || q === savedVenue) {
			setResults([]);
			setOpen(false);
			return;
		}
		setLoading(true);
		const controller = new AbortController();
		const timer = setTimeout(async () => {
			try {
				const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}`, { signal: controller.signal });
				if (!res.ok) throw new Error();
				const { results } = await res.json();
				setResults(results ?? []);
				setOpen(true);
			} catch (e) {
				if ((e as Error).name !== "AbortError") setResults([]);
			} finally {
				setLoading(false);
			}
		}, 400);
		return () => {
			clearTimeout(timer);
			controller.abort();
			setLoading(false);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query, canEdit]);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	async function selectAddress(address: AddressResult) {
		setQuery(address.displayName);
		setResults([]);
		setOpen(false);
		setSaving(true);
		try {
			const res = await fetch("/api/update-event-venue", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: eventId, venue: address.displayName }),
			});
			if (!res.ok) throw new Error();
			setSavedVenue(address.displayName);
		} catch (err) {
			console.error("[starboard/event] update-event-venue failed:", err);
		} finally {
			setSaving(false);
		}
	}

	if (!canEdit) {
		return (
			<div className="flex flex-col gap-1">
				<span className="text-xs font-bold text-blue-dark/60 uppercase tracking-wide">Venue</span>
				<span className="text-xs text-blue-dark">{savedVenue || "Not set yet"}</span>
				<span className="text-[10px] text-blue-dark/40">Only the point of contact can set the venue.</span>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-2">
			<span className="text-xs font-bold text-blue-dark/60 uppercase tracking-wide">Venue</span>

			<div ref={containerRef} className="relative">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Search for a venue address..."
					className="outfit w-full bg-white px-2 py-1 text-xs text-blue-dark border-2 border-blue-dark rounded-lg outline-none"
				/>
				{open && (
					<div className="absolute top-full left-0 right-0 mt-1 z-20 bg-white border border-blue-dark rounded-lg shadow-md overflow-hidden max-h-40 overflow-y-auto">
						{results.map((r, i) => (
							<button
								key={`${r.latitude},${r.longitude},${i}`}
								type="button"
								onClick={() => selectAddress(r)}
								className="block w-full text-left px-2 py-1.5 hover:bg-blue-dark/5 text-[11px] text-blue-dark border-b border-blue-dark/10 last:border-b-0"
							>
								{r.displayName}
							</button>
						))}
						{results.length === 0 && !loading && (
							<p className="px-2 py-1.5 text-[11px] text-blue-dark/60 italic">No matching addresses found.</p>
						)}
					</div>
				)}
			</div>

			<div className="text-[10px] h-3">
				{loading && <span className="text-blue-dark/60">Searching...</span>}
				{!loading && saving && <span className="text-blue-dark/60">Saving...</span>}
				{!loading && !saving && savedVenue && (
					<span className="text-green-700 font-semibold">✓ {savedVenue}</span>
				)}
			</div>
		</div>
	);
}

function ScheduleEditor({ initialSchedule, eventId }: { initialSchedule: ScheduleItem[]; eventId?: string }) {
	const [items, setItems] = useState<ScheduleItem[]>(initialSchedule);
	const [saving, setSaving] = useState(false);
	const [status, setStatus] = useState<string | null>(null);

	function updateItem(index: number, field: "time" | "event", value: string) {
		setItems((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
	}

	function addRow() {
		setItems((prev) => [...prev, { time: "", event: "" }]);
	}

	function removeRow(index: number) {
		setItems((prev) => prev.filter((_, i) => i !== index));
	}

	async function handleSave() {
		setSaving(true);
		setStatus(null);
		try {
			const res = await fetch("/api/update-event-schedule", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id: eventId, schedule: items }),
			});
			if (!res.ok) throw new Error(await res.text());
			setStatus("Saved!");
		} catch (err) {
			console.error("[starboard/event] update-event-schedule failed:", err);
			setStatus("Failed to save schedule.");
		} finally {
			setSaving(false);
		}
	}

	return (
		<div className="flex flex-col gap-2">
			<span className="text-xs font-bold text-blue-dark/60 uppercase tracking-wide">Schedule</span>

			<div className="flex flex-col gap-2">
				{items.map((item, index) => (
					<div key={index} className="flex gap-2 items-center">
						<input
							type="text"
							placeholder="10:00"
							value={item.time}
							onChange={(e) => updateItem(index, "time", e.target.value)}
							className="outfit bg-white px-2 py-1 text-xs text-blue-dark border-2 border-blue-dark rounded-lg outline-none w-20"
						/>
						<input
							type="text"
							placeholder="Opening Ceremony"
							value={item.event}
							onChange={(e) => updateItem(index, "event", e.target.value)}
							className="outfit bg-white px-2 py-1 text-xs text-blue-dark border-2 border-blue-dark rounded-lg outline-none flex-1"
						/>
						<button
							type="button"
							onClick={() => removeRow(index)}
							className="text-xs text-pink-dark underline"
						>
							Remove
						</button>
					</div>
				))}
			</div>

			<div className="flex items-center gap-3">
				<button
					type="button"
					onClick={addRow}
					className="text-xs text-blue-bright underline w-fit"
				>
					+ Add row
				</button>
				<button
					type="button"
					onClick={handleSave}
					disabled={saving}
					className="bg-blue-dark text-white galindo px-4 py-1 rounded-full text-xs hover:opacity-90 transition-opacity disabled:opacity-60"
				>
					{saving ? "Saving..." : "Save schedule"}
				</button>
				{status && <span className="text-xs text-blue-dark">{status}</span>}
			</div>
		</div>
	);
}

export default function EventDashboard({
	city,
	roles,
	eventId,
}: {
	city: string | null;
	roles: string[];
	eventId?: string;
}) {
	const [data, setData] = useState<EventResponse | undefined>(undefined);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const url = eventId ? `/api/get-my-event?id=${encodeURIComponent(eventId)}` : "/api/get-my-event";
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				console.log("[starboard/event] get-my-event:", data);
				setData(data);
			})
			.catch((err) => {
				console.error("[starboard/event] get-my-event failed:", err);
				setError("Failed to load event.");
			});
	}, [eventId]);

	const record = data?.record ?? null;
	const heading = record?.fields.City ?? city ?? "event";
	const daysUntilEvent = dayjs("2026-08-29").diff(dayjs(), "day");
	const canEditVenue = roles.includes("admin") || roles.some((r) => r.startsWith("person of contact"));

	return (
		<div className="min-h-screen bg-[#fdf6e3] outfit flex flex-col items-center gap-4 py-10 px-4">
			<h1 className="galindo text-blue-dark text-2xl">{heading}</h1>

			<div className="flex flex-col items-center gap-1">
				{roles.map((role) => (
					<span key={role} className="text-xs text-blue-dark/60">
						{role}
					</span>
				))}
			</div>

			{error && <p className="text-sm text-pink-dark font-semibold">{error}</p>}
			{!error && data === undefined && <p className="text-sm text-blue-dark">Loading event...</p>}
			{data && record === null && <p className="text-sm text-blue-dark">No event has been set up for this city yet.</p>}

			{record && (
				<div className="w-full max-w-2xl rounded-2xl border-2 border-blue-dark bg-white p-4 flex flex-col gap-3">
					<div className="flex justify-between items-center">
						<span className="galindo text-blue-dark">{record.fields.City}</span>
						<span className="galindo text-pink-dark">{daysUntilEvent} days until Sunbeam</span>
					</div>

					{data?.slug && (
						<Link
							href={`/${data.slug}`}
							target="_blank"
							className="text-xs text-blue-bright underline w-fit"
						>
							City website: /{data.slug}
						</Link>
					)}

					<div className="flex flex-col gap-1">
						<span className="text-xs font-bold text-blue-dark/60 uppercase tracking-wide">
							Organizers ({data?.organizers?.length ?? 0})
						</span>
						{data?.organizers?.length ? (
							data.organizers.map((person) => (
								<span key={person.email} className="text-xs text-blue-dark">
									{person.name ? `${person.name} — ${person.email}` : person.email}
								</span>
							))
						) : (
							<span className="text-xs text-blue-dark/40">None</span>
						)}
					</div>

					<div className="flex flex-col gap-1">
						<span className="text-xs font-bold text-blue-dark/60 uppercase tracking-wide">
							Points of contact ({data?.pocs?.length ?? 0})
						</span>
						{data?.pocs?.length ? (
							data.pocs.map((person) => (
								<span key={person.email} className="text-xs text-blue-dark">
									{person.name ? `${person.name} — ${person.email}` : person.email}
								</span>
							))
						) : (
							<span className="text-xs text-blue-dark/40">None</span>
						)}
					</div>

					<div className="flex flex-col gap-1">
						<span className="text-xs font-bold text-blue-dark/60 uppercase tracking-wide">Signups</span>
						<span className="text-xs text-blue-dark">{record.fields.signups?.length ?? 0}</span>
					</div>

					<VenueEditor
						key={`${record.id}-venue`}
						initialVenue={record.fields.venue}
						eventId={eventId}
						canEdit={canEditVenue}
					/>

					<ScheduleEditor
						key={record.id}
						initialSchedule={parseSchedule(record.fields.schedule)}
						eventId={eventId}
					/>

					<SponsorsEditor
						key={`${record.id}-sponsors`}
						initialSponsors={parseSponsors(record.fields.sponsors)}
						eventId={eventId}
					/>
				</div>
			)}
		</div>
	);
}
