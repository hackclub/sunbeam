"use client";
import { useState } from "react";
import Image from "next/image";
import ShorterGuideContent from "../ShorterGuideContent";

export default function Step2Client({ authUrl }: { authUrl: string }) {
	const [revealed, setRevealed] = useState(false);

	return (
		<div
			className="relative"
			style={{
				backgroundColor: "rgb(250,240,212)",
				backgroundImage: "url('/imgs/sand4.webp')",
				backgroundSize: "100% auto",
				backgroundRepeat: "repeat-y",
			}}
		>
			<a
				href="/apply"
				className="fixed z-20 backdrop-blur-sm top-0 left-0 bg-white/70 border-[0.2vh] border-white py-[1vh] px-[2vw] rounded-br-[3vh]"
			>
				<span className="text-[2vh] outfit">{"<-"} Back</span>
			</a>
			{/* Guide content — blurred until revealed */}
			<div
				style={{
					filter: revealed ? "none" : "blur(3px)",
					transition: "filter 0.7s ease",
					pointerEvents: revealed ? "auto" : "none",
				}}
			>
				<ShorterGuideContent />

				{/* HCA sign-in button at bottom */}
				<div className="flex flex-col items-center pt-0 pb-[6vh]">
					<a
						href={authUrl}
						className="hover:scale-105 transition-transform cursor-pointer"
						style={{ width: "25vw", display: "block" }}
					>
						<Image
							src="/imgs/surfboard_next2.webp"
							width={516}
							height={191}
							alt="Sign in with Hack Club"
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
					Here's what you need to know!
				</h1>
				<button
					onClick={() => setRevealed(true)}
					className="hover:scale-105 transition-transform cursor-pointer bg-transparent border-none p-0"
					style={{ width: "25vw" }}
				>
					<Image
						src="/imgs/surfboard_ok.webp"
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
