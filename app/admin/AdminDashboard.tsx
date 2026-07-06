"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

export type AppRecord = {
  id: string;
  fields: {
    slack_id?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    preferred_name?: string;
    pronouns?: string;
    phone_number?: string;
    address_line_1?: string;
    address_line_2?: string;
    city?: string;
    state_province?: string;
    postal_code?: string;
    country?: string;
    host_city?: string;
    date_of_birth?: string;
    expected_attendee_count?: string;
    different_to_home_address?: boolean;
    github_repo?: string;
    github_user?: string;
    playable_link?: string;
    project_information?: string;
    attended_or_organized_hackathon?: boolean;
    which_hackathons?: string;
    comfortable_with_poc?: boolean;
    approve_as_org?: string;
    [key: string]: unknown;
  };
};

function statusColors(status: string) {
  if (status === "Approved") return { border: "border-green-400 bg-green-50", badge: "bg-green-200 text-green-800" };
  if (status === "Rejected") return { border: "border-red-400 bg-red-50", badge: "bg-red-200 text-red-800" };
  if (status === "needs_follow_up") return { border: "border-orange-400 bg-orange-50", badge: "bg-orange-200 text-orange-800" };
  return { border: "border-blue-dark bg-white", badge: "bg-yellow-light text-orange-dark" };
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-2xl border-2 border-blue-dark bg-white p-4 flex flex-col gap-1">
      <span className="text-[10px] font-bold text-blue-bright uppercase tracking-wide">{label}</span>
      <span className="galindo text-blue-dark text-3xl">{value}</span>
      {sub && <span className="text-xs text-blue-dark/60">{sub}</span>}
    </div>
  );
}

function StatsView({ apps, onClose }: { apps: AppRecord[]; onClose: () => void }) {
  const stats = useMemo(() => {
    const total = apps.length;
    const approved = apps.filter(a => a.fields.approve_as_org === "Approved").length;
    const rejected = apps.filter(a => a.fields.approve_as_org === "Rejected").length;
    const needsFollowUp = apps.filter(a => a.fields.approve_as_org === "needs_follow_up").length;
    const pending = total - approved - rejected - needsFollowUp;
    const withPoc = apps.filter(a => a.fields.comfortable_with_poc).length;
    const withHackathon = apps.filter(a => a.fields.attended_or_organized_hackathon).length;
    const withGithub = apps.filter(a => a.fields.github_repo).length;

    const attendeeCounts = apps
      .map(a => parseInt(a.fields.expected_attendee_count as string ?? "0"))
      .filter(n => !isNaN(n) && n > 0);
    const totalAttendees = attendeeCounts.reduce((s, n) => s + n, 0);
    const avgAttendees = attendeeCounts.length
      ? Math.round(totalAttendees / attendeeCounts.length)
      : 0;

    const countryCounts: Record<string, number> = {};
    const cityCounts: Record<string, number> = {};
    for (const app of apps) {
      const country = app.fields.country ?? "Unknown";
      const city = app.fields.host_city ?? "Unknown";
      countryCounts[country] = (countryCounts[country] ?? 0) + 1;
      cityCounts[city] = (cityCounts[city] ?? 0) + 1;
    }
    const topCountries = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const topCities = Object.entries(cityCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

    return { total, approved, rejected, needsFollowUp, pending, withPoc, withHackathon, withGithub, totalAttendees, avgAttendees, topCountries, topCities };
  }, [apps]);

  const pct = (n: number) => stats.total ? `${Math.round((n / stats.total) * 100)}%` : "—";

  return (
    <div className="fixed inset-0 z-50 bg-[#fdf6e3] overflow-y-auto outfit">
      <div className="sticky top-0 bg-[#fdf6e3] border-b border-blue-dark/20 flex items-center justify-between px-6 py-3 z-10">
        <button onClick={onClose} className="text-blue-dark galindo text-sm flex items-center gap-1 hover:opacity-70 transition-opacity">
          ← Back
        </button>
        <span className="galindo text-blue-dark text-sm">stats</span>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 flex flex-col gap-8">
        {/* Overview */}
        <section>
          <h2 className="galindo text-blue-dark text-base border-b border-blue-dark/20 pb-1 mb-4">Overview</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard label="Total" value={stats.total} />
            <StatCard label="Approved" value={stats.approved} sub={pct(stats.approved)} />
            <StatCard label="Unreviewed" value={stats.pending} sub={pct(stats.pending)} />
            <StatCard label="Rejected" value={stats.rejected} sub={pct(stats.rejected)} />
            <StatCard label="Follow Up" value={stats.needsFollowUp} sub={pct(stats.needsFollowUp)} />
          </div>
        </section>

        {/* Attendees */}
        <section>
          <h2 className="galindo text-blue-dark text-base border-b border-blue-dark/20 pb-1 mb-4">Attendees</h2>
          <div className="grid grid-cols-2 gap-3">
            <StatCard label="Total Expected" value={stats.totalAttendees.toLocaleString()} />
            <StatCard label="Avg per Event" value={stats.avgAttendees} />
          </div>
        </section>

        {/* Organizer profile */}
        <section>
          <h2 className="galindo text-blue-dark text-base border-b border-blue-dark/20 pb-1 mb-4">Organizer Profile</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <StatCard label="Comfortable w/ POC" value={stats.withPoc} sub={pct(stats.withPoc)} />
            <StatCard label="Prior Hackathon Exp." value={stats.withHackathon} sub={pct(stats.withHackathon)} />
            <StatCard label="Submitted GitHub" value={stats.withGithub} sub={pct(stats.withGithub)} />
          </div>
        </section>

        {/* Geography */}
        <section>
          <h2 className="galindo text-blue-dark text-base border-b border-blue-dark/20 pb-1 mb-4">Geography</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-[10px] font-bold text-blue-bright uppercase tracking-wide mb-2">Top Countries</p>
              <div className="flex flex-col gap-2">
                {stats.topCountries.map(([country, count]) => (
                  <div key={country} className="flex items-center gap-2">
                    <div className="flex-1 bg-blue-dark/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-bright h-full rounded-full"
                        style={{ width: `${(count / stats.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-blue-dark w-4 text-right font-semibold">{count}</span>
                    <span className="text-xs text-blue-dark w-20 truncate">{country}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-blue-bright uppercase tracking-wide mb-2">Top Cities</p>
              <div className="flex flex-col gap-2">
                {stats.topCities.map(([city, count]) => (
                  <div key={city} className="flex items-center gap-2">
                    <div className="flex-1 bg-blue-dark/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-pink-bright h-full rounded-full"
                        style={{ width: `${(count / stats.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-blue-dark w-4 text-right font-semibold">{count}</span>
                    <span className="text-xs text-blue-dark w-20 truncate">{city}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function DetailRow({ label, value }: { label: string; value?: string | boolean | null }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-bold text-blue-bright uppercase tracking-wide">{label}</span>
      <span className="text-sm text-blue-dark break-words">
        {typeof value === "boolean" ? (value ? "Yes" : "No") : value}
      </span>
    </div>
  );
}

function AppDetail({ app, onClose }: { app: AppRecord; onClose: () => void }) {
  const f = app.fields;
  const status = f.approve_as_org ?? "unreviewed";
  const { badge } = statusColors(status);
  const displayName = [f.preferred_name ?? f.first_name, f.last_name].filter(Boolean).join(" ") || "—";
  const fullName = [f.first_name, f.last_name].filter(Boolean).join(" ");
  const location = [f.host_city, f.state_province, f.country].filter(Boolean).join(", ");
  const homeAddress = [f.address_line_1, f.address_line_2, f.city, f.postal_code].filter(Boolean).join(", ");

  return (
    <div className="fixed inset-0 z-50 bg-[#fdf6e3] overflow-y-auto outfit">
      {/* Top bar */}
      <div className="sticky top-0 bg-[#fdf6e3] border-b border-blue-dark/20 flex items-center justify-between px-6 py-3 z-10">
        <button
          onClick={onClose}
          className="text-blue-dark galindo text-sm flex items-center gap-1 hover:opacity-70 transition-opacity"
        >
          ← Back
        </button>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${badge}`}>{status}</span>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-8 flex flex-col gap-6">
        {/* Name + identifiers */}
        <div>
          <h1 className="galindo text-blue-dark text-3xl leading-tight">{displayName}</h1>
          {fullName !== displayName && (
            <p className="text-sm text-blue-dark/60 mt-0.5">{fullName}</p>
          )}
          <div className="flex flex-wrap gap-3 mt-2">
            {f.slack_id && (
              <span className="text-xs font-semibold text-pink-dark">@{f.slack_id}</span>
            )}
            {f.pronouns && (
              <span className="text-xs text-blue-bright">{f.pronouns}</span>
            )}
          </div>
        </div>

        {/* Contact */}
        <section className="flex flex-col gap-3">
          <h2 className="galindo text-blue-dark text-base border-b border-blue-dark/20 pb-1">Contact</h2>
          <div className="grid grid-cols-2 gap-4">
            <DetailRow label="Email" value={f.email} />
            <DetailRow label="Phone" value={f.phone_number} />
            <DetailRow label="Date of Birth" value={f.date_of_birth} />
            <DetailRow label="Slack ID" value={f.slack_id} />
          </div>
        </section>

        {/* Event */}
        <section className="flex flex-col gap-3">
          <h2 className="galindo text-blue-dark text-base border-b border-blue-dark/20 pb-1">Event</h2>
          <div className="grid grid-cols-2 gap-4">
            <DetailRow label="Host City" value={location || f.host_city} />
            <DetailRow label="Expected Attendees" value={f.expected_attendee_count} />
            <DetailRow label="POC Comfortable" value={f.comfortable_with_poc} />
            <DetailRow label="Organized Hackathon Before" value={f.attended_or_organized_hackathon} />
            {f.which_hackathons && (
              <div className="col-span-2">
                <DetailRow label="Which Hackathons" value={f.which_hackathons} />
              </div>
            )}
          </div>
        </section>

        {/* Address */}
        {(f.address_line_1 || f.city) && (
          <section className="flex flex-col gap-3">
            <h2 className="galindo text-blue-dark text-base border-b border-blue-dark/20 pb-1">Address</h2>
            <DetailRow label="Home Address" value={homeAddress} />
            <DetailRow label="Different from Home" value={f.different_to_home_address} />
          </section>
        )}

        {/* Project */}
        <section className="flex flex-col gap-3">
          <h2 className="galindo text-blue-dark text-base border-b border-blue-dark/20 pb-1">Project</h2>
          {f.github_repo && (
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold text-blue-bright uppercase tracking-wide">GitHub Repo</span>
              {isSafeUrl(f.github_repo) ? (
                <a
                  href={f.github_repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-bright underline break-all hover:text-blue-dark transition-colors"
                >
                  {f.github_repo}
                </a>
              ) : (
                <span className="text-sm text-blue-dark break-all">{f.github_repo}</span>
              )}
            </div>
          )}
          {f.github_user && (
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold text-blue-bright uppercase tracking-wide">GitHub User</span>
              <a
                href={`https://github.com/${f.github_user}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-bright underline hover:text-blue-dark transition-colors"
              >
                {f.github_user}
              </a>
            </div>
          )}
          {f.playable_link && (
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold text-blue-bright uppercase tracking-wide">Playable Link</span>
              {isSafeUrl(f.playable_link) ? (
                <a
                  href={f.playable_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-bright underline break-all hover:text-blue-dark transition-colors"
                >
                  {f.playable_link}
                </a>
              ) : (
                <span className="text-sm text-blue-dark break-all">{f.playable_link}</span>
              )}
            </div>
          )}
          {f.project_information && (
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold text-blue-bright uppercase tracking-wide">Project Info</span>
              <p className="text-sm text-blue-dark whitespace-pre-wrap">{f.project_information}</p>
            </div>
          )}
          {!f.github_repo && !f.github_user && !f.playable_link && !f.project_information && (
            <p className="text-sm text-blue-dark/50 italic">No project info submitted.</p>
          )}
        </section>
      </div>
    </div>
  );
}

const STATUS_OPTIONS = [
  { value: "Approved",        label: "Approve",     active: "bg-green-500 text-white border-green-500",   inactive: "border-green-400 text-green-700 hover:bg-green-50" },
  { value: "needs_follow_up", label: "Follow Up",   active: "bg-orange-400 text-white border-orange-400", inactive: "border-orange-400 text-orange-700 hover:bg-orange-50" },
  { value: "unreviewed",      label: "Pending",     active: "bg-yellow-400 text-yellow-900 border-yellow-400", inactive: "border-yellow-400 text-yellow-700 hover:bg-yellow-50" },
  { value: "Rejected",        label: "Deny",        active: "bg-red-500 text-white border-red-500",       inactive: "border-red-400 text-red-700 hover:bg-red-50" },
] as const;

function StatusButtons({ appId, current, onUpdate }: { appId: string; current: string; onUpdate: (id: string, status: string) => void }) {
  const [saving, setSaving] = useState<string | null>(null);

  async function handleClick(e: React.MouseEvent, status: string) {
    e.stopPropagation();
    if (saving || status === current) return;
    setSaving(status);
    onUpdate(appId, status);
    try {
      const res = await fetch("/api/update-status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: appId, status }),
      });
      if (!res.ok) onUpdate(appId, current);
    } catch {
      onUpdate(appId, current);
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="flex gap-1 mt-2" onClick={(e) => e.stopPropagation()}>
      {STATUS_OPTIONS.map(({ value, label, active, inactive }) => (
        <button
          key={value}
          onClick={(e) => handleClick(e, value)}
          disabled={!!saving}
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-colors disabled:opacity-60 ${current === value ? active : inactive}`}
        >
          {saving === value ? "..." : label}
        </button>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [allApps, setAllApps] = useState<AppRecord[]>([]);
  const [search, setSearch] = useState("");
  const [searchMode, setSearchMode] = useState<"name" | "city">("name");
  const [filter, setFilter] = useState("unreviewed");
  const [selected, setSelected] = useState<AppRecord | null>(null);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    fetch("/api/get-all-apps")
      .then((r) => r.json())
      .then(({ records }) => setAllApps(records ?? []));
  }, []);

  function updateStatus(id: string, approve_as_org: string) {
    setAllApps((apps) =>
      apps.map((a) => a.id === id ? { ...a, fields: { ...a.fields, approve_as_org } } : a)
    );
  }

  const filtered = allApps.filter((app) => {
    const f = app.fields;
    const name = `${f.preferred_name ?? f.first_name ?? ""} ${f.last_name ?? ""}`.toLowerCase();
    const city = `${f.host_city ?? ""} ${f.state_province ?? ""} ${f.country ?? ""}`.toLowerCase();
    const haystack = searchMode === "city" ? city : name;
    const matchesSearch = !search || haystack.includes(search.toLowerCase());
    const status = f.approve_as_org ?? "unreviewed";
    const matchesFilter = filter === "All" || status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      {selected && <AppDetail app={selected} onClose={() => setSelected(null)} />}
      {showStats && <StatsView apps={allApps} onClose={() => setShowStats(false)} />}

      <div className="min-h-screen bg-[#fdf6e3] outfit p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button className="text-blue-dark font-bold galindo text-sm flex items-center gap-1 cursor-pointer"
          onClick = {() => {
            if (showStats) {
              setShowStats(false)
            } else {
              router.push('/')
            }
          }}>
            ← Back
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setShowStats(true)}
              className="border border-blue-dark text-blue-dark text-xs font-semibold px-3 py-1 rounded-full hover:bg-blue-dark hover:text-white transition-colors"
            >
              Stats
            </button>
          
          </div>
        </div>

        <h1 className="galindo text-blue-dark text-lg mb-4">admin portal</h1>

        {/* Search */}
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder={searchMode === "city" ? "Search by city..." : "Search by name..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-blue-dark rounded-full px-4 py-2 text-sm bg-white outline-none"
          />
          <button
            onClick={() => { setSearchMode(searchMode === "name" ? "city" : "name"); setSearch(""); }}
            className="text-xs font-semibold px-4 py-1 rounded-full border border-blue-dark text-blue-dark bg-white whitespace-nowrap"
          >
            {searchMode === "name" ? "by city" : "by name"}
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {["All", "unreviewed", "Approved", "needs_follow_up", "Rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-semibold px-4 py-1 rounded-full border transition-colors ${
                filter === f
                  ? "bg-blue-dark text-white border-blue-dark"
                  : "border-blue-dark text-blue-dark bg-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((app) => {
            const f = app.fields;
            const status = f.approve_as_org ?? "unreviewed";
            const displayName = f.preferred_name ?? f.first_name ?? "—";
            const location = [f.host_city, f.state_province, f.country].filter(Boolean).join(", ");
            const { border, badge } = statusColors(status);

            return (
              <div
                key={app.id}
                onClick={() => setSelected(app)}
                className={`rounded-2xl border-2 p-4 shadow-sm flex flex-col gap-1 text-left cursor-pointer hover:shadow-md transition-shadow ${border}`}
              >
                <p className="galindo text-blue-dark text-base font-bold leading-tight">
                  {displayName} {f.last_name ?? ""}
                </p>
                <p className="text-xs text-pink-dark font-semibold">
                  {f.slack_id ? `@${f.slack_id}` : "no slack"}
                </p>
                <p className="text-xs text-blue-bright">{f.pronouns ?? "—"}</p>
                <p className="text-xs text-blue-dark">{location || "—"}</p>
                <p className="text-xs text-blue-dark">
                  organizing: {f.attended_or_organized_hackathon ? "yes" : "no"}
                </p>
                <p className="text-xs text-blue-dark">
                  poc: {f.comfortable_with_poc ? "yes" : "no"}
                </p>
                <StatusButtons appId={app.id} current={status} onUpdate={updateStatus} />
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="col-span-3 text-center text-blue-dark text-sm mt-10">
              No applications found.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
