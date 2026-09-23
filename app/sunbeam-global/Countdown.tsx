"use client";

import { useEffect, useState } from "react";

// Submissions close at the end of September 12 (23:59 UTC).
const DEADLINE = new Date("2026-09-12T23:59:00Z");

type Remaining = {
	days: string;
	hours: string;
	minutes: string;
	seconds: string;
};

function remainingFrom(ms: number): Remaining {
	const total = Math.floor(ms / 1000);
	const pad = (n: number) => String(n).padStart(2, "0");
	return {
		days: pad(Math.floor(total / 86400)),
		hours: pad(Math.floor((total % 86400) / 3600)),
		minutes: pad(Math.floor((total % 3600) / 60)),
		seconds: pad(total % 60),
	};
}

export default function Countdown() {
	const [remaining, setRemaining] = useState<Remaining | null>(null);
	const [closed, setClosed] = useState(false);

	useEffect(() => {
		const tick = () => {
			const ms = DEADLINE.getTime() - Date.now();
			if (ms <= 0) {
				setClosed(true);
				setRemaining(null);
				return;
			}
			setRemaining(remainingFrom(ms));
		};

		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	}, []);

	if (closed) {
		return (
			<p className="shrink-0 galindo text-[#C54390] text-[min(2vh,4.2vw)] leading-none">
				Submissions are closed!
			</p>
		);
	}

	const tiles = [
		{ label: "days", value: remaining?.days },
		{ label: "hrs", value: remaining?.hours },
		{ label: "min", value: remaining?.minutes },
		{ label: "sec", value: remaining?.seconds },
	];

	return (
		<div
			className="shrink-0 flex justify-center gap-[0.8vh] md:gap-[0.8vw]"
			aria-label="Time left to submit"
		>
			{tiles.map(({ label, value }) => (
				<div
					key={label}
					className="glassbox-clear rounded-[1.4vh] text-center px-[1.4vh] py-[0.8vh] min-w-[7.5vh]"
				>
					<div className="galindo tabular-nums text-[#0E387A] text-[min(2.4vh,5vw)] leading-none">
						{value ?? "--"}
					</div>
					<div className="outfit uppercase tracking-wide text-[#2E599C] text-[min(1.3vh,2.8vw)] leading-none mt-[0.5vh]">
						{label}
					</div>
				</div>
			))}
		</div>
	);
}
