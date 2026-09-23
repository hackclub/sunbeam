import type { Metadata } from "next";
import Link from "next/link";
import Countdown from "./Countdown";

export const metadata: Metadata = {
	title: "Sunbeam Global - Hack Club",
	description:
		"Keep working on your project for up to two weeks after Sunbeam and earn prizes. Submissions are due September 12, theme: Perfect Day.",
};

const SUBMIT_URL = "https://forms.hackclub.com/t/xeSuQVhKnAus";

const prizes = [
	{ place: "1st", prize: "AirPods 4", note: null, color: "#C54390" },
	{ place: "2nd", prize: "$75 Steam gift card", note: null, color: "#2E599C" },
	{ place: "3rd", prize: "Large Blahaj", note: null, color: "#D88127" },
];

const categories = [
	"Most Creative",
	"Most on Theme",
	"Best Art",
	"Most Enjoyable",
];

export default function SunbeamGlobal() {
	return (
		<div className="outfit relative h-screen w-full overflow-hidden">
			{/* water background */}
			<img
				src="/imgs/water.webp"
				alt=""
				className="absolute inset-0 w-full h-full object-cover object-bottom"
			/>

			{/* decorations */}
			<img
				src="/imgs/shark1.webp"
				alt=""
				className="wave-float absolute top-[-3vh] left-[1vw] z-5 w-[26vw] md:w-[13vw] pointer-events-none"
			/>
			<img
				src="/imgs/ray1.webp"
				alt=""
				className="wave-float absolute bottom-[12vh] right-[2vw] z-5 w-[26vw] md:w-[13vw] pointer-events-none hidden md:block"
			/>
			<img
				src="/imgs/star1.webp"
				alt=""
				className="absolute top-[8vh] right-[6vw] z-5 w-[7vw] md:w-[4vw] pointer-events-none hidden md:block"
			/>
			<img
				src="/imgs/star2.webp"
				alt=""
				className="absolute bottom-[16vh] left-[4vw] z-5 w-[6vw] md:w-[3.5vw] pointer-events-none hidden md:block"
			/>

			{/* foam wave along the bottom */}
			<img
				src="/imgs/foam-fixed.png"
				alt=""
				className="foam-float absolute bottom-[-10vh] md:bottom-[-14vh] left-0 z-5 w-full pointer-events-none"
			/>

			{/* back btn */}
			<Link
				href="/"
				className="absolute z-20 top-0 left-0 bg-white/70 border-[0.2vh] border-white py-[0.8vh] px-[2vw] rounded-br-[2.5vh]"
			>
				<span className="galindo text-[#0E387A] text-[min(1.9vh,4vw)]">
					{"<-"} Back
				</span>
			</Link>

			{/* content */}
			<main className="relative z-10 h-full flex items-center justify-center px-[4vw] py-[2vh]">
				<div className="glassbox-white max-h-full w-full max-w-[920px] rounded-[3vh] px-[5vw] md:px-[3.5vw] py-[2.2vh] md:py-[3vh] flex flex-col items-center gap-[1.1vh] md:gap-[2vh] overflow-hidden">
					{/* title */}
					<h1 className="shrink-0 galindo blue-outlined-text text-center text-[min(6vh,11vw)] leading-none pt-[0.5vh]">
						Sunbeam Global
					</h1>

					<p className="shrink-0 text-center text-[#0E387A] font-semibold text-[min(2.1vh,4.3vw)] leading-snug max-w-[720px]">
						An online event, open to everyone. Keep working on your project for
						up to two weeks after Sunbeam and earn prizes!
					</p>

					{/* deadline + theme */}
					<div className="shrink-0 flex flex-wrap justify-center gap-[0.8vh] md:gap-[1vw]">
						<span className="glassbox-clear galindo rounded-full text-[#C54390] text-[min(1.85vh,3.4vw)] leading-none px-[1.5vh] py-[1vh]">
							Due September 12
						</span>
						<span className="glassbox-clear galindo rounded-full text-[#359BBF] text-[min(1.85vh,3.4vw)] leading-none px-[1.5vh] py-[1vh]">
							Theme: Perfect Day
						</span>
					</div>

					{/* countdown to the deadline */}
					<Countdown />

					{/* prizes + categories/grants */}
					<div className="shrink-0 w-full grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-[1.1vh] md:gap-[2.5vw] text-[#0E387A]">
						<div>
							<h2 className="galindo text-[#C54390] text-[min(2.4vh,4.6vw)] leading-none mb-[0.9vh]">
								Prizes
							</h2>
							<ul className="flex flex-col gap-[0.8vh] text-[min(1.9vh,3.8vw)] leading-snug">
								{prizes.map(({ place, prize, note, color }) => (
									<li key={place} className="flex items-baseline gap-[1vh]">
										<span
											className="galindo shrink-0 leading-none"
											style={{ color }}
										>
											{place}
										</span>
										<span>
											{prize}
											{note && <span className="opacity-60"> ({note})</span>}
										</span>
									</li>
								))}
								<li className="flex items-baseline gap-[1vh]">
									<span className="galindo shrink-0 leading-none text-[#359BBF]">
										All
									</span>
									<span>Everyone who submits gets a custom stickersheet</span>
								</li>
							</ul>
						</div>

						<div className="flex flex-col gap-[1.4vh]">
							<div>
								<h2 className="galindo text-[#359BBF] text-[min(2.4vh,4.6vw)] leading-none mb-[0.9vh]">
									Categories
								</h2>
								<div className="flex flex-wrap gap-[0.6vh]">
									{categories.map((category) => (
										<span
											key={category}
											className="galindo text-[#2E599C] text-[min(1.65vh,3.4vw)] leading-none bg-white/70 border border-[#359BBF]/40 rounded-full px-[1.2vh] py-[0.7vh]"
										>
											{category}
										</span>
									))}
								</div>
							</div>
							<div>
								<h2 className="galindo text-[#D88127] text-[min(2.4vh,4.6vw)] leading-none mb-[0.9vh]">
									Category wins
								</h2>
								<p className="text-[min(1.9vh,3.8vw)] leading-snug">
									Win a category and you get to pick a $50 grant for your
									project:
								</p>
								<ul className="list-disc pl-[1.3em] text-[min(1.9vh,3.8vw)] leading-snug">
									<li>a digicam</li>
									<li>arts and craft supplies</li>
								</ul>
							</div>
						</div>
					</div>

					{/* submit */}
					<a
						href={SUBMIT_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="shrink-0 hover:scale-105 transition-all cursor-pointer"
					>
						<img
							src="/imgs/surfboard_submit.webp"
							alt="Submit your project"
							className="h-[8vh] md:h-[10vh] w-auto max-h-[100px]"
						/>
					</a>
				</div>
			</main>
		</div>
	);
}
