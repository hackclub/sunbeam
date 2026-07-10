"use client";

import { useEffect, useRef, useState } from "react";

export type VerifiedCity = {
  city: string;
  state: string | null;
  country: string | null;
  displayName: string;
  latitude: number;
  longitude: number;
};

export function cityLabel(c: VerifiedCity) {
  return [c.city, c.state, c.country].filter(Boolean).join(", ");
}

export default function CityPicker({
  value,
  onChange,
  initialQuery = "",
}: {
  value: VerifiedCity | null;
  onChange: (city: VerifiedCity | null) => void;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<VerifiedCity[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchNonce, setSearchNonce] = useState(0);
  // Skip the mount run so the seeded query doesn't auto-search and pop the dropdown.
  const skipSearch = useRef(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (skipSearch.current) {
      skipSearch.current = false;
      return;
    }
    const q = query.trim();
    if (q.length < 3) {
      setResults([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/geocode?q=${encodeURIComponent(q)}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error();
        const { results } = await res.json();
        setResults(results ?? []);
        setOpen(true);
        setLoading(false);
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
        setError("Address lookup failed.");
        setLoading(false);
      }
    }, 400);
    return () => {
      clearTimeout(timer);
      controller.abort();
      setLoading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, searchNonce]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function select(c: VerifiedCity) {
    skipSearch.current = true;
    setQuery(cityLabel(c));
    setResults([]);
    setOpen(false);
    onChange(c);
  }

  return (
    <div ref={containerRef} className="relative flex flex-col gap-1">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (value) onChange(null);
        }}
        onFocus={() => {
          if (results.length > 0) setOpen(true);
          else if (!value && query.trim().length >= 3) setSearchNonce((n) => n + 1);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (query.trim().length >= 3) setSearchNonce((n) => n + 1);
          }
        }}
        placeholder="Type an address or city to verify..."
        className={`border rounded-full px-3 py-1 text-xs bg-white outline-none ${
          value ? "border-green-500" : "border-blue-dark"
        }`}
      />
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 z-20 bg-white border border-blue-dark rounded-xl shadow-md overflow-hidden">
          {results.map((r, i) => (
            <button
              key={`${r.latitude},${r.longitude},${i}`}
              onClick={(e) => {
                e.stopPropagation();
                select(r);
              }}
              className="w-full text-left px-3 py-2 hover:bg-blue-dark/5 transition-colors border-b border-blue-dark/10 last:border-b-0"
            >
              <span className="block text-xs font-semibold text-blue-dark">{cityLabel(r)}</span>
              <span className="block text-[10px] text-blue-dark/60 truncate">{r.displayName}</span>
            </button>
          ))}
          {results.length === 0 && !loading && (
            <p className="px-3 py-2 text-xs text-blue-dark/60 italic">No matching places found.</p>
          )}
        </div>
      )}
      {loading && <span className="text-[10px] text-blue-dark/60">Searching...</span>}
      {error && <span className="text-[10px] text-red-700 font-semibold">{error}</span>}
      {value ? (
        <span className="text-[10px] text-green-700 font-semibold">
          ✓ Verified: {cityLabel(value)} ({value.latitude.toFixed(4)}, {value.longitude.toFixed(4)})
        </span>
      ) : (
        <span className="text-[10px] text-blue-dark/60">
          Select a verified city from the suggestions to approve.
        </span>
      )}
    </div>
  );
}
