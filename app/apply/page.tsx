"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Apply() {
	return (
		<div className="relative w-full h-screen overflow-hidden">
			<motion.div
				className="absolute top-0 left-0 w-full"
				style={{
					height: "26vh",
					background:
						"linear-gradient(to bottom, rgb(213,240,249) 0%, rgb(114,191,218) 60%, rgb(251,245,226) 100%)",
				}}
				animate={{ scaleY: [1, 1.07, 1] }}
				transition={{
					duration: 3,
					ease: "easeInOut",
					repeat: Infinity,
				}}
			/>

			{/* Warm sand gradient — rest of page */}
			<div
				className="absolute left-0 w-full"
				style={{
					top: "26vh",
					bottom: 0,
					backgroundColor: "rgb(250,240,212)",
					backgroundImage: "url('/imgs/sand4.webp')",
					backgroundSize: "100% auto",
					backgroundRepeat: "repeat-y",
				}}
			/>

			{/* Foam wave decoration */}
			<motion.div
				className="absolute top-0 left-0 w-full z-10 pointer-events-none"
				animate={{ y: ["0vh", "1.6vh", "0vh"] }}
				transition={{
					duration: 3,
					ease: "easeInOut",
					repeat: Infinity,
				}}
			>
				<Image
					src="/imgs/foam-fixed.png"
					width={1727}
					height={428}
					alt=""
					className="w-full h-auto"
					priority
				/>
			</motion.div>

			{/* Title */}
			<h1
				className="galindo absolute z-20 text-center text-[#D88127] whitespace-nowrap"
				style={{
					top: "38%",
					left: "50%",
					transform: "translateX(-50%)",
					fontSize: "2.9vw",
				}}
			>
				So you want to organize a Sunbeam in your city...
			</h1>

			{/* Ray image — right side */}
			<Image
				src="/imgs/ray1.webp"
				width={356}
				height={267}
				alt=""
				className="absolute z-10 pointer-events-none h-auto"
				style={{ left: "68%", top: "52%", width: "28vw" }}
			/>

			{/* Surfboard "next!" button */}
			<a
				href="/apply/step2"
				className="absolute z-20 hover:scale-105 transition-transform cursor-pointer"
				style={{ left: "32%", top: "50%", width: "30vw" }}
			>
				<Image
					src="/imgs/surfboard_next.webp"
					width={1031}
					height={382}
					alt="next!"
					className="w-full h-auto"
				/>
			</a>
		</div>
	);
}
