"use client";
import { useState } from "react";
import Image from "next/image";
import GuideContent from "../GuideContent";

export default function Step2() {
	const [revealed, setRevealed] = useState(false);

	return (
		<div className="relative">
			{/* Guide content — blurred until revealed */}
			<div
				style={{
					filter: revealed ? "none" : "blur(8px)",
					transition: "filter 0.7s ease",
					pointerEvents: revealed ? "auto" : "none",
				}}
			>
				<GuideContent />

				{/* Continue button at bottom */}
				<div
					className="flex justify-center py-[8vh]"
					style={{ background: "rgb(250,240,212)" }}
				>
					<a
						href="/apply/step3"
						className="hover:scale-105 transition-transform cursor-pointer"
						style={{ width: "25vw", display: "block" }}
					>
						<Image
							src="/imgs/surfboard_next2.png"
							width={516}
							height={191}
							alt="continue to apply!"
							className="w-full h-auto"
						/>
					</a>
				</div>
			</div>

			{/* Overlay — fades out on reveal */}
			<div
				className="fixed inset-0 z-10 flex flex-col items-center justify-center"
				style={{
					background: "rgba(250,240,212,0.9)",
					opacity: revealed ? 0 : 1,
					pointerEvents: revealed ? "none" : "auto",
					transition: "opacity 0.7s ease",
				}}
			>
				<h1
					className="galindo pink-outlined-text text-center mb-[4vh]"
					style={{ fontSize: "3.5vw" }}
				>
					Read the ultimate organizer guide!
				</h1>
				<button
					onClick={() => setRevealed(true)}
					className="hover:scale-105 transition-transform cursor-pointer bg-transparent border-none p-0"
					style={{ width: "25vw" }}
				>
					<Image
						src="/imgs/surfboard_ok.png"
						width={865}
						height={320}
						alt="OK!"
						className="w-full h-auto"
					/>
				</button>
			</div>
		</div>
	);
}
