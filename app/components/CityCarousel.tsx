"use client";

import { useEffect, useRef, useState } from "react";

type City = { city: string; country: string; attendees: number; projects: number };

const COLORS = ["#C54390", "#2E599C", "#C79713", "#D88127"];
const TILTS = ["-rotate-1", "rotate-1", "rotate-0", "-rotate-[0.5deg]"];

function fmt(n: number) {
	return n.toLocaleString("en-US");
}

export default function CityCarousel({ cities }: { cities: City[] }) {
	const track = useRef<HTMLDivElement>(null);
	const [atStart, setAtStart] = useState(true);
	const [atEnd, setAtEnd] = useState(false);

	const update = () => {
		const el = track.current;
		if (!el) return;
		setAtStart(el.scrollLeft <= 4);
		setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
	};

	useEffect(() => {
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	const scroll = (dir: 1 | -1) => {
		const el = track.current;
		if (!el) return;
		el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
	};

	const arrow =
		"absolute top-1/2 -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-[#FBF6E7] border-2 border-[#2E599C] text-[#2E599C] galindo text-2xl shadow-md transition-opacity hover:scale-105 disabled:opacity-0 disabled:pointer-events-none";

	return (
		<div className="relative w-full">
			<button
				type="button"
				aria-label="Previous cities"
				onClick={() => scroll(-1)}
				disabled={atStart}
				className={`${arrow} -left-4 md:-left-6`}
			>
				‹
			</button>

			<div
				ref={track}
				onScroll={update}
				className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth px-2 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
			>
				{cities.map(({ city, country, attendees, projects }, i) => {
					const color = COLORS[i % COLORS.length];
					return (
						<div
							key={city}
							className={`snap-center shrink-0 w-[70%] sm:w-[42%] lg:w-[27%] rounded-[3vh] border border-neutral-400 drop-shadow-sm bg-neutral-50 p-2 ${TILTS[i % TILTS.length]}`}
						>
							<div
								className="h-full border-[0.8vh] rounded-[2.5vh] flex flex-col items-center justify-center text-center px-4 py-[3vh]"
								style={{ borderColor: color }}
							>
								<p className="galindo text-[min(3.6vh,7vw)] leading-tight" style={{ color }}>
									{city}
								</p>
								<p className="outfit text-[#0E387A]/60 text-sm min-h-[1.25rem]">
									{country !== city ? country : ""}
								</p>
								<div className="flex gap-6 mt-[2vh]">
									{attendees > 0 && (
										<div>
											<p className="galindo text-[#0E387A] text-[min(4.5vh,9vw)] leading-none">
												{fmt(attendees)}
											</p>
											<p className="outfit text-[#0E387A] text-sm">girls</p>
										</div>
									)}
									<div>
										<p className="galindo text-[#0E387A] text-[min(4.5vh,9vw)] leading-none">
											{projects}
										</p>
										<p className="outfit text-[#0E387A] text-sm">
											{projects === 1 ? "project" : "projects"}
										</p>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<button
				type="button"
				aria-label="More cities"
				onClick={() => scroll(1)}
				disabled={atEnd}
				className={`${arrow} -right-4 md:-right-6`}
			>
				›
			</button>
		</div>
	);
}
