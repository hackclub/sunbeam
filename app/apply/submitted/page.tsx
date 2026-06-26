"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SubmittedContent() {
	const params = useSearchParams();
	const firstName = params.get("name") || "";

	return (
		<div className="relative z-20 flex flex-col items-center min-h-screen pt-[14vh] pb-[6vh]">
			{/* Sunbeam logo */}
			<img
				src="/imgs/hcflag_logo.png"
				style={{ width: "30%" }}
				alt="Sunbeam"
			/>

			{/* Thank-you text */}
			<div className="text-center mt-[6vh]" style={{ width: "58%" }}>
				<p className="galindo text-[#2E599C] text-[1.7vw] leading-snug">
					Thanks {firstName} for applying to organize a Sunbeam Social!
				</p>
				<p className="galindo text-[#2E599C] text-[1.7vw] leading-snug mt-[4vh]">
					We&apos;ll review applications and send you an email within the next two weeks.
				</p>
				<p className="galindo text-[#2E599C] text-[1.7vw] leading-snug mt-[4vh]">
					In the meantime, encourage your friends to check out the Sunbeam website!
				</p>
			</div>

			{/* Surfboard "home" button */}
			<a
				href="/"
				className="hover:scale-105 transition-transform cursor-pointer mt-[6vh]"
				style={{ width: "22vw" }}
			>
				<img src="/imgs/surfboard_home.png" className="w-full" alt="home" />
			</a>
		</div>
	);
}

export default function Submitted() {
	return (
		<div className="relative w-full min-h-screen overflow-hidden">
			{/* Sky gradient */}
			<div
				className="absolute top-0 left-0 w-full"
				style={{
					height: "28vh",
					background:
						"linear-gradient(to bottom, rgb(213,240,249) 0%, rgb(114,191,218) 70%, rgb(251,245,226) 100%)",
				}}
			/>

			{/* Warm sand gradient */}
			<div
				className="absolute left-0 w-full"
				style={{
					top: "28vh",
					bottom: 0,
					background:
						"linear-gradient(to bottom, rgb(234,242,233) 0%, rgb(251,247,232) 3%, rgb(250,240,212) 100%)",
				}}
			/>

			{/* Foam wave */}
			<img
				src="/imgs/foam.png"
				className="absolute top-0 left-0 w-full z-10 pointer-events-none"
				alt=""
			/>

			{/* Ray — bottom right decorative */}
			<img
				src="/imgs/ray1.png"
				className="absolute z-10 pointer-events-none"
				style={{ right: 0, bottom: "2vh", width: "28vw" }}
				alt=""
			/>

			<Suspense>
				<SubmittedContent />
			</Suspense>
		</div>
	);
}
