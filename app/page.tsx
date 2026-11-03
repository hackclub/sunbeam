import type { Metadata } from "next";
import Image from "next/image";
import { readdirSync } from "node:fs";
import path from "node:path";
// Frozen snapshot of the Sunbeam Airtable — regenerate with `node scripts/generate-recap-stats.mjs`,
// which also documents how each number is counted.
import stats from "./lib/recap-stats.json";
import CityCarousel from "./components/CityCarousel";
import RecapMap from "./components/RecapMap";

// Every image in public/imgs/recap/photos is shown, in filename order. The page is
// prerendered, so new photos show up on the next build. A descriptive filename
// (e.g. "03-karachi-opening-ceremony.jpg") doubles as the photo's caption and alt text,
// minus any leading number used to order the photos.
const PHOTO_DIR = "imgs/recap/photos";

const TILTS = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1"];

// From the post-event feedback form, trimmed but otherwise as written. City only, no names.
const quotes = [
	{ city: "Delhi", text: "Was worth it attending it was my happiest day of this year." },
	{
		city: "Winnipeg",
		text: "It was an amazing event and my first hackathon! I'm really happy I went here despite how nervous I was",
	},
	{ city: "Austin", text: "DO MORE OF THESE PLEASEEE🙏" },
	{
		city: "Karachi",
		text: "As a person who doesn't know computer or coding, it was really fun and engaging. Thank you for having me",
	},
	{
		city: "Penang",
		text: "I like how my organizer specially ordered a porridge for me because I just had braces on",
	},
	{ city: "Islamabad", text: "Loved the idea of the event in general, for girls by girls? Awesome" },
	{
		city: "Dhaka",
		text: "Please host these more often, I genuinely had so so much fun and made so many amazing memories!",
	},
	{ city: "Jakarta", text: "LOVEEE SUNBEAM JAKARTAAA 🩷🩷" },
];

function fmt(n: number) {
	return n.toLocaleString("en-US");
}

type Photo = { src: string; caption: string | null };

function getPhotos(): Photo[] {
	let files: string[];
	try {
		files = readdirSync(path.join(process.cwd(), "public", PHOTO_DIR));
	} catch {
		return [];
	}
	return files
		.filter((file) => /\.(jpe?g|png|webp|avif|gif)$/i.test(file))
		.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
		.map((file) => {
			const name = file
				.replace(/\.[^.]+$/, "")
				.replace(/[-_]+/g, " ")
				.replace(/^\d+\s+(?=\D)/, "")
				.trim();
			// Camera/app filenames ("IMG 2041", "WhatsApp Image 2026 08 29...") aren't worth captioning.
			const descriptive =
				/[a-z]{3,}/i.test(name) && !/^(img|dsc|dscf|pxl|image|photo|whatsapp|screenshot|signal)\b/i.test(name);
			return { src: `/${PHOTO_DIR}/${encodeURIComponent(file)}`, caption: descriptive ? name : null };
		});
}

export const metadata: Metadata = {
	title: "Sunbeam - Hack Club",
	description: `On August 29th, 2026, ${fmt(stats.totals.attendees)} girls in ${stats.totals.cities} cities spent the day coding together at Sunbeam. Here's how it went!`,
	openGraph: {
		title: "Sunbeam - Hack Club",
		description: `On August 29th, 2026, ${fmt(stats.totals.attendees)} girls in ${stats.totals.cities} cities spent the day coding together at Sunbeam. Here's how it went!`,
		url: "https://sunbeam.hackclub.com",
		siteName: "Sunbeam",
		images: [
			{
				url: "https://sunbeam.hackclub.com/imgs/sunbeam-repo.png",
				width: 1200,
				height: 630,
			},
		],
	},
};

export default function Home() {
	const { totals, feedback, cities } = stats;
	const photos = getPhotos();

	const headline = [
		{ value: totals.attendees, label: "girls coded in person", star: "star1" },
		{ value: totals.cities, label: `cities in ${totals.countries} countries`, star: "star2" },
		{ value: totals.projects, label: "projects shipped", star: "star3" },
		{ value: totals.hours, label: "hours of coding logged", star: "star1" },
	];

	const cards = [
		{ value: totals.signups, label: "girls signed up for a Sunbeam near them", color: "#C54390" },
		{ value: totals.organizers, label: "organizers ran an event in their own city", color: "#2E599C" },
		{ value: totals.volunteers, label: "volunteers helped out on the day", color: "#C79713" },
		{ value: totals.shippers, label: "girls shipped a project with their team", color: "#D88127" },
	];

	return (
		<div className="relative bg-[url('/imgs/sandNoFade.webp')] bg-cover bg-center bg-no-repeat">
			{/* ── HERO ── */}
			<div className="relative min-h-[110vh] w-full pb-[24vh]">
				<div className="absolute inset-0 overflow-hidden">
					<img
						src="/imgs/water.webp"
						className="w-full h-full object-cover object-bottom"
						alt=""
					/>
				</div>

				{/* Shark */}
				<img
					src="/imgs/shark1.webp"
					className="wave-float absolute top-[-2vh] left-[2.5vw] z-10 w-[24vw] md:w-[15vw]"
					alt=""
				/>

				{/* Foam wave */}
				<img
					src="/imgs/foam-fixed.png"
					className="hidden md:block md:absolute bottom-[-20vh] left-0 z-5 w-full"
					alt=""
				/>

				<div className="flex flex-col relative z-5 items-center">
					<img
						src="/imgs/logo.svg"
						className="w-[70vw] md:w-[36vw] mx-auto mt-[8vh] md:mt-[5vh]"
						alt="Sunbeam"
					/>

					<div className="grid grid-cols-1 grid-rows-1 mt-[1vh] px-[4vw]">
						<h1 className="row-start-1 col-start-1 galindo text-[min(9vh,13vw)] leading-tight text-center pink-outlined-text-drop-shadow">
							That&apos;s a wrap!
						</h1>
						<h1
							aria-hidden
							className="row-start-1 col-start-1 galindo text-[min(9vh,13vw)] leading-tight text-center gradient-text"
						>
							That&apos;s a wrap!
						</h1>
					</div>

					{/* Map of every city, with the hand-painted Sunbeam banner pinned across its top edge */}
					<div className="relative w-[90vw] md:w-[72vw] max-w-[1100px] mt-[3vh] pt-[14vw] md:pt-[7vw] lg:pt-[min(7vw,100px)]">
						<div className="w-full aspect-[4/3] md:aspect-[2/1] md:min-h-[360px] rotate-1">
							<RecapMap cities={cities} />
						</div>
						<Image
							src="/imgs/recap/sunbeam-poster.webp"
							alt="A hand-painted Sunbeam banner reading 'Girls. Code. Create.', held up by attendees"
							width={1800}
							height={785}
							priority
							sizes="(min-width: 768px) 32vw, 70vw"
							className="absolute top-0 left-1/2 -translate-x-1/2 z-[600] w-[72%] md:w-[44%] h-auto -rotate-3 drop-shadow-[0_10px_14px_rgba(14,56,122,0.4)] transition-transform duration-300 hover:-rotate-1 hover:scale-[1.03]"
						/>
					</div>

					<h2 className="galindo text-[min(4vh,6vw)] leading-tight text-[#2E599C] text-center mt-[2vh] px-[6vw] md:px-0 md:w-[60vw]">
						On August 29th, 2026, girls all over the world spent the day coding together.
					</h2>

					{/* Headline stats */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-[3vw] md:gap-[2vw] w-[88vw] md:w-[72vw] max-w-[1100px] mt-[4vh]">
						{headline.map(({ value, label, star }) => (
							<div
								key={label}
								className="aspect-[447/438] w-full relative flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 hover:-rotate-3"
							>
								<img
									src={`/imgs/${star}.webp`}
									className="w-full absolute top-0 left-0 z-0"
									alt=""
								/>
								<div className="relative z-5 flex flex-col items-center w-[54%] pt-[8%]">
									<p className="galindo gradient-text text-[min(6vh,9vw)] md:text-[min(5.5vh,3.6vw)] leading-none text-center">
										{fmt(value)}
									</p>
									<p className="outfit text-white font-semibold text-center text-[min(1.9vh,3.4vw)] md:text-[min(1.8vh,1.2vw)] leading-tight mt-[0.6vh] [text-shadow:0_1px_2px_#0e387a]">
										{label}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* ── BY THE NUMBERS + PHOTOS ── */}
			<div className="relative w-full pt-[26vh] pb-[6vh] flex flex-col items-center bg-[url('/imgs/sandNoFade.webp')] bg-cover bg-center">
				{/* sand transition from the foam above */}
				<img
					src="/imgs/sand.webp"
					className="w-full absolute top-0 z-0"
					alt=""
				/>
				<img
					src="/imgs/ray1.webp"
					className="hidden md:block absolute top-[18vh] right-[5vw] z-5 w-[14vw]"
					alt=""
				/>

				<div className="flex flex-col relative z-5 items-center w-full">
					<h2 className="galindo text-[min(6.5vh,10vw)] text-[#D88127] text-center w-[85vw] leading-tight">
						Sunbeam by the numbers
					</h2>

					<div className="w-[85vw] max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[3vh] sm:gap-[2vw] my-[4vh]">
						{cards.map(({ value, label, color }) => (
							<div
								key={label}
								className="rounded-[3.5vh] border border-neutral-400 drop-shadow-sm bg-neutral-50 p-2 md:p-[0.6vw]"
							>
								<div
									className="border-[1vh] w-full h-full rounded-[3vh] flex flex-col items-center justify-center px-[4vw] sm:px-[1.5vw] py-[3vh]"
									style={{ borderColor: color }}
								>
									<p className="galindo text-[min(7vh,12vw)] leading-none" style={{ color }}>
										{fmt(value)}
									</p>
									<p className="outfit text-[2.1vh] text-center text-[#0E387A] leading-snug mt-[1vh]">
										{label}
									</p>
								</div>
							</div>
						))}
					</div>

					{photos.length > 0 && (
						<>
							<h2 className="galindo text-[min(6.5vh,10vw)] text-[#D88127] text-center w-[85vw] leading-tight mt-[6vh]">
								Snapshots from the day
							</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[4vh] sm:gap-10 w-[80vw] max-w-[1200px] mt-[4vh]">
								{photos.map((photo, i) => (
									<a
										key={photo.src}
										href={photo.src}
										target="_blank"
										rel="noopener noreferrer"
										className={`block bg-white pt-3 px-3 border-2 border-blue-dark/50 shadow-sm shadow-blue-dark/50 transition-transform duration-300 hover:scale-105 hover:rotate-0 ${TILTS[i % TILTS.length]}`}
									>
										<div className="relative aspect-[4/3] border border-blue-dark/50 overflow-hidden">
											<Image
												src={photo.src}
												alt={photo.caption ?? "A photo from Sunbeam"}
												fill
												sizes="(min-width: 1024px) 400px, (min-width: 640px) 40vw, 80vw"
												className="object-cover"
											/>
										</div>
										<p className="galindo text-[#2E599C] text-center text-lg leading-tight min-h-[3rem] py-2 flex items-center justify-center">
											{photo.caption}
										</p>
									</a>
								))}
							</div>
						</>
					)}
				</div>
			</div>

			{/* ── EVERY CITY ── */}
			<div className="relative w-full py-[4vh]">
				<div className="relative mx-auto w-[92%] md:w-[75%] max-w-[1200px] flex flex-col items-center py-[6vh] waterbg outline-2 rounded-2xl outline-blue-bright shadow-xl shadow-blue-dark/10">
					<div className="relative z-5 flex flex-col items-center w-[90%]">
						<div className="grid grid-rows-1 grid-flow-col">
							<h2 className="row-start-1 col-start-1 galindo text-5xl md:text-6xl text-center text-[#72BFDA] pink-outlined-text-drop-shadow mb-[0.25vh]">
								{totals.cities} cities, one day
							</h2>
							<h2
								aria-hidden
								className="row-start-1 col-start-1 galindo text-5xl md:text-6xl text-center text-[#72BFDA] pink-outlined-text-sm mb-[0.25vh]"
							>
								{totals.cities} cities, one day
							</h2>
						</div>
						<p className="outfit text-[#0E387A] text-[min(1.8vh,3.8vw)] text-center mb-[3vh]">
							Girls who checked in at each Sunbeam, and the projects they shipped.{" "}
							{cities[0].city} alone had {fmt(cities[0].attendees)} girls!
						</p>

						<CityCarousel cities={cities} />
					</div>
				</div>
			</div>

			{/* ── FEEDBACK ── */}
			<div className="relative w-full pt-[6vh] pb-[4vh] flex flex-col items-center">
				<h2 className="galindo text-[min(6.5vh,10vw)] text-[#D88127] text-center w-[85vw] md:w-[60vw] leading-tight">
					What did everyone think?
				</h2>
				<p className="outfit text-[#0E387A] text-[min(2vh,4vw)] text-center mt-[1vh] px-[6vw]">
					{fmt(feedback.responses)} girls filled out our feedback form after their Sunbeam
				</p>

				<div className="flex flex-col md:flex-row items-center justify-center gap-[3vh] md:gap-[2vw] w-[90vw] max-w-[1200px] mt-[3vh]">
					<div className="w-[75vw] md:w-[22vw] max-w-[320px] rounded-[3.5vh] border border-neutral-400 drop-shadow-sm bg-neutral-50 p-2 md:p-[0.6vw] order-2 md:order-1 -rotate-2">
						<div className="border-[1vh] border-[#C54390] rounded-[3vh] flex flex-col items-center px-[1.5vw] py-[3vh]">
							<p className="galindo text-[#C54390] text-[min(8vh,14vw)] leading-none">
								{feedback.madeFriendPct}%
							</p>
							<p className="outfit text-[#0E387A] text-[2.2vh] text-center leading-snug mt-[1vh]">
								made a new friend
							</p>
						</div>
					</div>

					{/* Average rating, in the Sunbeam frame */}
					<div className="relative w-[88vw] md:w-[36vw] max-w-[540px] aspect-[1440/1150] order-1 md:order-2">
						<img
							src="/imgs/sunbeam-photo.webp"
							className="absolute inset-0 w-full h-full"
							alt=""
						/>
						<div className="absolute inset-0 flex flex-col items-center justify-center px-[24%] pt-[4%]">
							<p className="galindo text-[#0E387A] text-[min(11vh,17vw)] md:text-[min(11vh,7vw)] leading-none">
								{feedback.averageScore}
								<span className="text-[0.45em]">/10</span>
							</p>
							<p className="outfit text-[#0E387A] font-semibold text-[min(2.3vh,4vw)] md:text-[min(2.3vh,1.4vw)] text-center leading-snug mt-[1vh]">
								average rating from participants
							</p>
							<p className="outfit text-[#0E387A]/80 text-[min(1.7vh,3.2vw)] md:text-[min(1.7vh,1vw)] text-center leading-snug mt-[0.5vh]">
								(organizers gave it {feedback.organizerAverageScore}/10!)
							</p>
						</div>
					</div>

					<div className="w-[75vw] md:w-[22vw] max-w-[320px] rounded-[3.5vh] border border-neutral-400 drop-shadow-sm bg-neutral-50 p-2 md:p-[0.6vw] order-3 rotate-2">
						<div className="border-[1vh] border-[#2E599C] rounded-[3vh] flex flex-col items-center px-[1.5vw] py-[3vh]">
							<p className="galindo text-[#2E599C] text-[min(8vh,14vw)] leading-none">
								{feedback.proudPct}%
							</p>
							<p className="outfit text-[#0E387A] text-[2.2vh] text-center leading-snug mt-[1vh]">
								made something they&apos;re proud of
							</p>
						</div>
					</div>
				</div>

				{/* Quotes */}
				<div className="columns-1 sm:columns-2 lg:columns-4 gap-6 w-[85vw] max-w-[1200px] mt-[6vh]">
					{quotes.map(({ city, text }, i) => (
						<figure
							key={city}
							className={`glassbox-white break-inside-avoid mb-8 rounded-[2vh] p-5 ${TILTS[i % TILTS.length]}`}
						>
							<blockquote className="outfit text-[#0E387A] text-base leading-snug">
								&ldquo;{text}&rdquo;
							</blockquote>
							<figcaption className="galindo text-[#C54390] mt-3">
								Sunbeam {city}
							</figcaption>
						</figure>
					))}
				</div>
			</div>

			{/* ── THANK YOU ── */}
			<div className="relative w-full pt-[4vh] pb-[16vh] flex flex-col items-center">
				<div className="grid grid-cols-1 grid-rows-1 px-[4vw]">
					<h2 className="row-start-1 col-start-1 galindo text-[min(8vh,12vw)] leading-tight text-center pink-outlined-text-drop-shadow">
						Thank you!!
					</h2>
					<h2
						aria-hidden
						className="row-start-1 col-start-1 galindo text-[min(8vh,12vw)] leading-tight text-center gradient-text"
					>
						Thank you!!
					</h2>
				</div>
				<p className="outfit text-[#0E387A] text-[min(2.4vh,4.2vw)] text-center leading-relaxed w-[85vw] md:w-[55vw] mt-[2vh]">
					Sunbeam only happened because {fmt(totals.organizers)} organizers and{" "}
					{fmt(totals.volunteers)} volunteers ran events in their own cities, and{" "}
					{fmt(totals.attendees)} girls showed up to build something together. Thank you to every
					organizer, volunteer, sponsor and venue who made it happen{" "}
					<b className="text-[#C54390]">♡</b>
				</p>
				<p className="outfit text-[#0E387A] text-[min(2.4vh,4.2vw)] text-center font-semibold w-[85vw] md:w-[55vw] mt-[2vh]">
					Want to keep building? Join the{" "}
					<a
						href="https://hackclub.com/slack"
						target="_blank"
						rel="noopener noreferrer"
						className="underline hover:text-[#2E599C]"
					>
						Hack Club Slack
					</a>{" "}
					or check out{" "}
					<a
						href="https://athena.hackclub.com"
						target="_blank"
						rel="noopener noreferrer"
						className="underline hover:text-[#2E599C]"
					>
						Athena
					</a>
					!
				</p>
			</div>

			{/* ── FOOTER ── */}
			<div className="relative min-h-[80vh] w-full flex flex-col pt-[23vh] z-10">
				<div className="absolute inset-0 overflow-hidden">
					<img
						src="/imgs/water2.webp"
						className="w-full h-full object-cover object-top"
						alt=""
					/>
				</div>
				<img
					src="/imgs/foam-fixed2.png"
					alt=""
					className="hidden md:block md:absolute top-[-15vh] left-0 z-10 w-full"
				/>

				<div className="relative z-5 flex flex-col">
					{/* Footer headline */}
					<h3 className="outfit text-[#FBF6E7]/90 font-semibold text-[5.5vh] text-center">
						made with <b className="text-[#FFC7DA]">♡</b> by{" "}
						<a
							href="https://athena.hackclub.com"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline"
						>
							Hack Club Athena
						</a>{" "}
						Team
					</h3>

					{/* Nav + description */}
					<div className="flex flex-col md:flex-row gap-[8vw] mt-[6vh] px-[5.3%]">
						{/* Left nav */}
						<div className="flex flex-row md:flex-col gap-[1.2vh] shrink-0">
							{[
								{ label: "Hack Club", href: "https://hackclub.com" },
								{ label: "Slack", href: "https://hackclub.com/slack" },
								{ label: "Athena", href: "https://athena.hackclub.com" },
								{ label: "Clubs", href: "https://hackclub.com/clubs" },
								{
									label: "Code of Conduct",
									href: "https://hackclub.com/conduct",
								},
							].map(({ label, href }) => (
								<a
									key={label}
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									className="galindo text-black/50 md:text-[#D5F0E8] text-[3vw] md:text-[1.8vw] hover:underline leading-tight"
								>
									{label}
								</a>
							))}
						</div>

						{/* Right description */}
						<p className="outfit text-black/60 md:text-[#FAF0D3] text-[2.75vw] md:text-[1.5vw] leading-relaxed max-w-[80vw] md:max-w-[60vw]">
							Hack Club is a 501(c)(3) nonprofit and network of 60k+ technical
							high schoolers. We believe you learn best by building so
							we&apos;re creating community and providing grants so you can make
							awesome projects. In the past few years, we&apos;ve partnered with
							GitHub to run&nbsp;Summer of Making, hosted the&nbsp;world&apos;s
							longest hackathon on land, and ran&nbsp;Canada&apos;s largest high
							school hackathon.
							<br />
							<br />
							At Hack Club, students are building real projects every single
							day.
						</p>
					</div>

					{/* Copyright */}
					<p className="outfit text-[#FCF7E8] text-[0.75vw] mt-[4vh] text-center">
						© 2026 Hack Club. 501(c)(3) nonprofit (EIN: 81-2908499)
					</p>
				</div>
			</div>
		</div>
	);
}
