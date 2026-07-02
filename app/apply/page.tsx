"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Apply() {
	return (
		<div className="relative w-full h-screen overflow-hidden">
			<a
				href="/"
				className="fixed z-10 top-0 left-0 bg-white/70 border-[0.2vh] border-white py-[1vh] px-[2vw] rounded-br-[3vh]"
			>
				<span className="text-[2vh] outfit">{"<-"} Back</span>
			</a>

			<motion.div
				className="absolute top-0 left-0 w-full h-[24vh] md:h-[20vh] z-2"
				style={{
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
					top: "10vh",
					bottom: 0,
					backgroundColor: "rgb(250,240,212)",
					backgroundImage: "url('/imgs/sand4.webp')",
					backgroundSize: "100% auto",
					backgroundRepeat: "repeat-y",
				}}
			/>

			{/* Foam wave decoration */}
			<motion.div
				className="absolute top-[15vh] md:top-0 left-0 w-full z-10 pointer-events-none"
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
				className="
		galindo absolute z-20 left-1/2 -translate-x-1/2
		text-center text-[#D88127]
		top-[28%] w-[90vw] text-[8vw] leading-tight
		whitespace-normal
		md:top-[40%] md:w-auto md:text-[6vh] md:whitespace-nowrap
	"
			>
				So you want to organize a Sunbeam in your city...
			</h1>

			{/* Ray image — right side */}
			<Image
				src="/imgs/ray1.webp"
				width={356}
				height={267}
				alt=""
				className="absolute z-10 pointer-events-none h-auto left-[68%] top-[57.5%] md:top-[52%] w-[28vw]"
			/>

			{/* Surfboard "next!" button */}
			<a
				href="/apply/step2"
				className="absolute z-20 hover:scale-105 transition-transform cursor-pointer top-[45%] md:top-[45%] -translate-y-[-50%] left-[50%] -translate-x-[50%]"
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
