import GuideContent from "./GuideContent";

export default function Apply() {
	return (
		<div className="relative w-full h-screen overflow-hidden">
			<div
				className="absolute top-0 left-0 w-full"
				style={{
					height: "26vh",
					background:
						"linear-gradient(to bottom, rgb(213,240,249) 0%, rgb(114,191,218) 60%, rgb(251,245,226) 100%)",
				}}
			/>

			{/* Warm sand gradient — rest of page */}
			<div
				className="absolute left-0 w-full"
				style={{
					top: "26vh",
					bottom: 0,
					background:
						"linear-gradient(to bottom, rgb(234,242,233) 0%, rgb(251,247,232) 3%, rgb(250,240,212) 100%)",
				}}
			/>

			{/* Foam wave decoration */}
			<img
				src="/imgs/foam.png"
				className="absolute top-0 left-0 w-full z-10 pointer-events-none"
				alt=""
			/>

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
			<img
				src="/imgs/ray1.png"
				className="absolute z-10 pointer-events-none"
				style={{
					left: "68%",
					top: "52%",
					width: "28vw",
				}}
				alt=""
			/>

			{/* Surfboard "next!" button */}
			<a
				href="/apply/step2"
				className="absolute z-20 hover:scale-105 transition-transform cursor-pointer"
				style={{
					left: "32%",
					top: "50%",
					width: "30vw",
				}}
			>
				<img
					src="/imgs/surfboard_next.png"
					className="w-full"
					alt="next!"
				/>
			</a>
		</div>
	);
}