export default function Step2() {
	return (
		<div className="relative w-full h-screen overflow-hidden bg-white">
			{/* Left placeholder panel (unfinished) */}
			<div
				className="absolute top-0 left-0 h-full"
				style={{ width: "30.9%", background: "rgb(217,217,217)" }}
			/>

			{/* "Read the ultimate organizer guide!" */}
			<h1
				className="galindo absolute z-10 text-[#F393B4] whitespace-nowrap"
				style={{
					top: "38%",
					left: "50%",
					transform: "translateX(-50%)",
					fontSize: "2.9vw",
				}}
			>
				Read the ultimate organizer guide!
			</h1>

			{/* Surfboard "OK!" button */}
			<a
				href="/apply/step3"
				className="absolute z-10 hover:scale-105 transition-transform cursor-pointer"
				style={{
					left: "37%",
					top: "50%",
					width: "25vw",
				}}
			>
				<img src="/imgs/surfboard_ok.png" className="w-full" alt="OK!" />
			</a>
		</div>
	);
}
