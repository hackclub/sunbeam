// TemplatePage.tsx
import React from "react";
import config from "./config.json";

const TemplatePage = () => {
	const { cityName, schedule, sponsors } = config;

	return (
		<div className="relative">
			{/* ── HERO ── */}
			<div className="relative min-h-[110vh] w-full">
				<div className="absolute inset-0 h-[110vh] overflow-hidden">
					<img
						src="/imgs/water.webp"
						className="w-full h-full object-cover object-bottom"
						alt=""
					/>
				</div>

				{/* Shark */}
				<img
					src="/imgs/shark1.webp"
					className="absolute top-[-2vh] left-[2.5vw] z-10 w-[30vw] md:w-[17.5vw]"
					alt=""
				/>

				{/* Foam wave */}
				<img
					src="/imgs/foam-fixed.webp"
					className="hidden md:block md:absolute bottom-[-20vh] left-0 z-5 w-full"
					alt=""
				/>

				<div className="flex flex-col relative z-5">
					{/* Logo + video */}
					<div className="relative w-[80vw] mx-auto flex flex-col md:flex-row mt-[5vh] mb-[1vh]">
						<img
							src="/imgs/sunbeam.webp"
							className="w-[80vw] md:w-[49vw] absolute bottom-[-10vh] md:bottom-[-6vh] left-0 md:left-[5vw]"
							alt="Sunbeam"
						/>
						{/* Video placeholder */}
						<div className="w-[70vw] md:w-[45vw] h-[30vh] md:h-[40vh] bg-neutral-200/80 ml-auto flex items-center justify-center rounded-sm">
							<span className="galindo text-black text-[1.8vw]">
								launch video
							</span>
						</div>
					</div>
					<h1 className="galindo text-[5vh] leading-[5vh] md:leading-[8vh] text-center gradient-text mt-[1vh]">
						{cityName}
					</h1>

					<h2 className="galindo text-[3vh] px-[5vw] md:px-0 md:text-[4.5vh] text-[#2E599C] text-center">
						A social coding event for girls 13-18 around the world
					</h2>
					<h3 className="outfit text-[#0E387A] text-center text-[1.5vh] md:text-[3vh]">
						August 29th, 2026 || 20+ cities worldwide
					</h3>
					<h1 className="galindo text-[6.5vh] leading-[6.5vh] md:leading-[8vh] text-center gradient-text mt-[1.5vh]">
						No experience necessary - join today!
					</h1>
					<a
						href="/sign-up"
						className="hover:scale-105 transition-all cursor-pointer w-fit mx-auto"
					>
						<img
							src="/imgs/sign-up.webp"
							className="w-[65vw] md:w-[25vw] mx-auto"
							alt="apply!"
						/>
					</a>
				</div>
			</div>

			{/* ── HOW-TO ── */}
			<div className="relative min-h-screen w-full pt-[26vh] flex flex-col items-center">
				{/* sand on a laptop */}
				<img
					src="/imgs/sand.webp"
					className="w-full absolute top-0 z-0"
					alt=""
				/>
				<img
					src="/imgs/sand.webp"
					className="w-full absolute top-[100vh] z-0"
					alt=""
				/>
				{/* sand on a phone */}
				<img
					src="/imgs/sand.webp"
					className="w-full absolute md:hidden top-0 z-0"
					alt=""
				/>
				<img
					src="/imgs/sand.webp"
					className="w-full absolute md:hidden top-[60vh] z-0"
					alt=""
				/>
				<img
					src="/imgs/sand.webp"
					className="w-full absolute md:hidden top-[120vh] z-0"
					alt=""
				/>
				<img
					src="/imgs/sand.webp"
					className="w-full absolute md:hidden top-[180vh] z-0"
					alt=""
				/>
				<img
					src="/imgs/sand.webp"
					className="w-full absolute md:hidden top-[240vh] z-0"
					alt=""
				/>
				<img
					src="/imgs/sand.webp"
					className="w-full absolute md:hidden top-[300vh] z-0"
					alt=""
				/>
				<img
					src="/imgs/sand.webp"
					className="w-full absolute md:hidden top-[360vh] z-0"
					alt=""
				/>
				<img
					src="/imgs/sand.webp"
					className="w-full absolute md:hidden top-[420vh] z-0"
					alt=""
				/>
				<img
					src="/imgs/ray1.webp"
					className="absolute top-[20vh] right-[6vw] z-5 w-[17.5vw]"
					alt=""
				/>

				<div className="flex flex-col relative z-5 items-center justify-center">
					<h2 className="galindo text-[6.5vh] text-[#D88127] text-center w-[80vw] md:w-[50vw] leading-[7.5vh] mb-[1vh]">
						What do you do at a Sunbeam Social?
					</h2>

					{/* Three cards */}
					<div className="w-[77.5vw] flex flex-col md:flex-row items-center justify-center gap-[3vw] my-[4vh]">
						<div className="w-full h-[67.5vh] rounded-[3.5vh] border border-neutral-400 drop-shadow-sm bg-neutral-50 p-[0.75vw]">
							<div className="border-[1vh] border-[#C54390] w-full h-full rounded-[3vh] flex flex-col items-center justify-start p-[1vw]">
								<img src="/imgs/img1.webp" className="pb-[2vh]" alt="" />
								<h2 className="galindo text-center text-[4vh] text-[#C54390]">
									Sign Up!
								</h2>
								<p className="outfit text-[2.25vh] text-center text-[#C54390]">
									Sign up for a Sunbeam social in your area with the link below!
								</p>
							</div>
						</div>
						<div className="w-full h-[75vh] rounded-[3.5vh] border border-neutral-400 drop-shadow-sm bg-neutral-50 p-[0.75vw]">
							<div className="border-[1vh] border-[#2E599C] w-full h-full rounded-[3vh] flex flex-col items-center justify-start p-[1vw]">
								<img src="/imgs/img2.webp" className="pb-[2vh]" alt="" />
								<h2 className="galindo text-center text-[4vh] text-[#2E599C]">
									Team!
								</h2>
								<p className="outfit text-[2.25vh] text-center text-[#2E599C]">
									Join a team of 1-3 people. Come in with your friends or meet
									new friends at the social! No experience is needed - everyone
									is welcome!
								</p>
							</div>
						</div>
						<div className="w-full h-[67.5vh] rounded-[3.5vh] border border-neutral-400 drop-shadow-sm bg-neutral-50 p-[0.75vw]">
							<div className="border-[1vh] border-[#C79713] w-full h-full rounded-[3vh] flex flex-col items-center justify-start p-[1vw]">
								<img src="/imgs/img3.webp" className="pb-[2vh]" alt="" />
								<h2 className="galindo text-center text-[4vh] text-[#C79713]">
									Fun!
								</h2>
								<p className="outfit text-[2.25vh] text-center text-[#C79713]">
									August 29!! Have fun during the event: make friends, enjoy the
									food/drinks, and learn from workshops!
								</p>
							</div>
						</div>
					</div>

					{/* The License Plates */}
					<div className="w-[77.5vw] my-[4vh] flex flex-col gap-[2vh]">
						<div className="grid grid-cols-[6fr_4fr] gap-[3vw]">
							<img
								src="/imgs/plate1.webp"
								alt=""
								className="w-full h-full object-cover"
							/>

							<img
								src="/imgs/img4.webp"
								alt=""
								className="w-full h-full object-cover pb-[1vh]"
							/>
						</div>
						<div className="grid grid-cols-[4fr_6fr] gap-[3vw]">
							<img
								src="/imgs/img5.webp"
								alt=""
								className="w-full h-full object-cover pb-[1vh]"
							/>
							<img
								src="/imgs/plate1.webp"
								alt=""
								className="w-full h-full object-cover"
							/>
						</div>
						<div className="grid grid-cols-[6fr_4fr] gap-[3vw]">
							<img
								src="/imgs/plate1.webp"
								alt=""
								className="w-full h-full object-cover"
							/>

							<img
								src="/imgs/img6.webp"
								alt=""
								className="w-full h-full object-cover pb-[1vh]"
							/>
						</div>
					</div>

					{/* CTA */}
					<h2 className="outfit text-[6vh] text-[#C54390] text-center w-[70vw] md:w-[60vw] leading-[7.5vh] my-[4vh] drop-shadow-sm">
						Ready? Come enjoy the sunshine!
					</h2>
					<a
						href="/apply"
						className="hover:scale-105 transition-all cursor-pointer w-fit mx-auto"
					>
						<img
							src="/imgs/sign-up2.webp"
							className="w-[50vw] md:w-[30vw] mx-auto"
							alt="apply!"
						/>
					</a>
				</div>
			</div>

			{/* Schedule */}
			<div className="relative min-h-[130vh] items-center justify-center w-full mt-[5vh] flex flex-col pt-[0vh] z-5">
				<img
					src="/imgs/boardwalk2.webp"
					className="z-0 absolute w-full h-[130vh] top-0 left-0"
					alt=""
				/>
				<div className="z-5 relative">
					<h1 className="galindo text-[9vh] leading-[9vh] md:leading-[8vh] text-center text-[#72BFDA] stroke-text mb-[1vh]">
						Schedule
					</h1>
				</div>
				<div className="flex flex-col items-center justify-center w-[80vw] mx-auto mt-[2vh] gap-[1vh] relative z-5">
					{schedule.map((item: any, index: any) => (
						<div
							className={`flex gap-[1vh] items-center justify-center w-full`}
							key={index}
						>
							<div
								className={`bg-[#c0e5f2] border-[0.2vh] border-[#0e387a] rounded-[0.75vh] w-1/5 items-center justify-center flex py-[2.5vh] ${
									index === 0 ? "rounded-tl-[5vh]" : ""
								}
                ${index === schedule.length - 1 ? "rounded-bl-[5vh]" : ""}
                `}
							>
								<p className="text-[#0e387a] text-[3.5vh] font-semibold">
									{item.time}
								</p>
							</div>
							<div
								className={`bg-[#c0e5f2] border-[0.2vh] border-[#0e387a] rounded-[0.75vh] w-4/5 items-center justify-center flex py-[2.5vh] ${
									index === 0 ? "rounded-tr-[5vh]" : ""
								}
                ${index === schedule.length - 1 ? "rounded-br-[5vh]" : ""}
                `}
							>
								<p className="text-[#0e387a] text-[3.5vh] font-semibold">
									{item.event}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* ── SPONSOR ── */}
			<div className="relative min-h-screen w-full pt-[5vh] flex flex-col items-center z-3">
				{/* sand on a laptop */}
				<img
					src="/imgs/sand.webp"
					className="w-full absolute top-[-10vh] z-0"
					alt=""
				/>
				<img
					src="/imgs/sand.webp"
					className="w-full absolute top-[100vh] z-0"
					alt=""
				/>
				{/* sand on a phone */}
				<img
					src="/imgs/sand.webp"
					className="w-full absolute md:hidden top-0 z-0"
					alt=""
				/>
				<img
					src="/imgs/sand.webp"
					className="w-full absolute md:hidden top-[60vh] z-0"
					alt=""
				/>
				<img
					src="/imgs/sand.webp"
					className="w-full absolute md:hidden top-[120vh] z-0"
					alt=""
				/>
				<img
					src="/imgs/sand.webp"
					className="w-full absolute md:hidden top-[180vh] z-0"
					alt=""
				/>
				<img
					src="/imgs/sand.webp"
					className="w-full absolute md:hidden top-[240vh] z-0"
					alt=""
				/>
				<img
					src="/imgs/sand.webp"
					className="w-full absolute md:hidden top-[300vh] z-0"
					alt=""
				/>
				<img
					src="/imgs/sand.webp"
					className="w-full absolute md:hidden top-[360vh] z-0"
					alt=""
				/>
				<img
					src="/imgs/sand.webp"
					className="w-full absolute md:hidden top-[420vh] z-0"
					alt=""
				/>

				<div className="flex flex-col relative z-5 items-center justify-center">
					<h2 className="galindo text-[6.5vh] text-[#D88127] text-center w-[80vw] md:w-[80vw] leading-[7.5vh] mb-[1vh]">
						Thank you to our Sponsors!
					</h2>
					<div className="grid grid-cols-4 w-[90vw] gap-[3vw] mt-[3vh]">
						{sponsors.map((sponsor, index) => (
							<div
								className="aspect-[1] w-full relative flex flex-col items-center justify-center"
								key={index}
							>
								<img
									src={`/imgs/${index % 2 === 0 ? "star1" : "star2"}.webp`}
									className="w-full absolute top-0 left-0 z-0"
									alt=""
								/>
								<div className="flex flex-col relative z-5 items-center justify-center w-[80%] mx-auto">
									<img
										src={sponsor.logo}
										alt={sponsor.name}
										className="w-[45%]"
									/>
									<p className="text-[#0E387A] stroke-text-idk font-semibold galindo text-[3vh] leading-[3vh] text-center w-[80%] mx-auto">
										{sponsor.name}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="relative min-h-[120vh] w-full mt-[17.5vh] flex flex-col pt-[0vh]"></div>

			{/* ── FOOTER ── */}
			<div className="relative min-h-[80vh] w-full mt-[17.5vh] flex flex-col pt-[23vh] z-10">
				<div className="absolute inset-0 h-[80vh] overflow-hidden">
					<img
						src="/imgs/water.webp"
						className="w-full h-full object-cover object-bottom rotate-180"
						alt=""
					/>
				</div>
				<img
					src="/imgs/foam-fixed2.webp"
					alt=""
					className="hidden md:block md:absolute top-[-15vh] left-0 z-10 w-full"
				/>
				<img
					src="/imgs/ray2.webp"
					className="hidden md:absolute bottom-[2vh] right-0 z-5 w-[20vw]"
					alt=""
				/>

				<div className="relative z-5 flex flex-col">
					{/* Footer headline */}
					<h3 className="outfit text-[#FBF6E7]/90 font-semibold text-[5.5vh] text-center">
						made with ♡ by{" "}
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
									target={href !== "#" ? "_blank" : undefined}
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
};

export default TemplatePage;
