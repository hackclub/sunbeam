// TemplatePage.tsx
"use client";

import React, { useState } from "react";

const participantFaqs = [
	{
		question: "I've never coded before, can I still join?",
		answer:
			"Of course! Sunbeam socials are a relaxed and supportive space for all girls with different skill levels. Workshops will help you learn everything you need.",
	},
	{
		question: "How much does it cost to attend?",
		answer:
			"Nothing. Sunbeam socials are free for participants, and we provide food, drinks, merch, and prizes.",
	},
	{
		question: "What should I bring?",
		answer:
			"Bring a laptop or iPad and anything else you like to code with, such as a charger, mouse, keyboard, or notepad.",
	},
	{
		question: "Who can join?",
		answer:
			"Any girl-identifying individual aged 13-18 (inclusive) can sign up for their local Sunbeam social.",
	},
	{
		question: "What is Hack Club?",
		answer:
			"Hack Club is a US-based charity that operates all around the world to get more young people involved in tech and coding. They've run events on an island, partnered with NASA, and hosted the world's largest all-girls high school hackathon!",
	},
	{
		question: "What is Sunbeam?",
		answer:
			"Sunbeam is a series of social coding events, for girls by girls, running simultaneously in 20+ cities around the world!",
	},
	{
		question: "Do I need to know anyone before I go?",
		answer:
			"No, you'll get to know everyone on the day of, but don't hesitate to chat to other girls in the Slack channels and bring your in-person friends along too!",
	},
	{
		question: "How do I join the Slack channels?",
		answer: (
			<>
				Click{" "}
				<a
					href="https://slack.hackclub.com/"
					style={{ textDecoration: "underline" }}
				>
					HERE
				</a>{" "}
				and join the sunbeam channels.
			</>
		),
	},
	{
		question: "What if I have allergies/dietary restrictions?",
		answer:
			"One you sign up, you'll receive a check-in form where you'll be able to let the organizers know about any health concerns and dietary requirements. We'll make sure to provide food options for everyone.",
	},
	{
		question: "Are we getting prizes?",
		answer:
			"You'll get a custom t-shirt, [company]-recognized certificate, and a bunch of other free merch just for attending! Each social will also have peer-voted winners which will get extra prizes for best project/nicest graphics/funniest ideas too!",
	},
];

type ScheduleItem = {
	time: string;
	event: string;
};

type SponsorItem = {
	name: string;
	logo: string;
};

const cityName = "For Example City";

const schedule: ScheduleItem[] = [
	{ time: "8:00 AM", event: "Opening Ceremony" },
	{ time: "10:30 AM", event: "Workshop: Boba Drops" },
	{ time: "11:30 AM", event: "Workshop: Godot" },
	{ time: "12:30 PM", event: "Lunch!!!" },
	{ time: "5:00 PM", event: "Karaoke" },
	{ time: "6:00 PM", event: "Dinner + Demos" },
	{time: "7:00 PM", event: "Closing Ceremony"},
	{ time: "8:00 PM", event: "Go home :(" },
];

const socialHighlights = [
	{
		title: "Build",
		description: "Turn an idea into something you're proud of.",
		img: "/imgs/plate1.webp",
	},
	{
		title: "Have Fun",
		description: "Enjoy snacks, laughs, and a great day together.",
		img: "/imgs/plate2.png",
	},
	{
		title: "Make Friends",
		description: "Meet other girls who love creating and coding.",
		img: "/imgs/plate3.png",
	},
];

const TemplatePage = () => {
	const [openFaq, setOpenFaq] = useState<number | null>(null);

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
					src="/imgs/foam-fixed.png"
					className="hidden md:block md:absolute bottom-[-20vh] left-0 z-5 w-full"
					alt=""
				/>

				<div className="flex flex-col relative z-5">
					{/* Logo + video */}
					<div className="relative w-[80vw] mx-auto flex flex-col md:flex-row mt-[5vh] mb-[1vh]">
						<img
							src="/imgs/logo.svg"
							className="w-[80vw] md:w-[44vw] mx-auto md:mx-0 md:absolute md:bottom-[-6vh] md:left-0 mb-[3vh] md:mb-0"
							alt="Sunbeam"
						/>
						{/* Spacer so video sits fully to the right of the logo (desktop only) */}
						<div className="hidden md:block md:w-[44vw] shrink-0" />
						{/* Launch video */}
						<div className="w-full md:w-[36vw] h-[25vh] md:h-[40vh] md:ml-auto rounded-sm overflow-hidden">
							<iframe
								src="https://www.youtube.com/embed/Ufmk9QW-XAs"
								title="Sunbeam Social launch video"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								className="w-full h-full"
							/>
						</div>
					</div>
					{/* <h1 className="galindo text-[5vh] leading-[5vh] md:leading-[8vh] text-center gradient-text mt-[1vh]">
						A social coding event for girls 13-18 around the world
					</h1> */}

					<h2 className="galindo text-[3vh] px-[5vw] md:px-0 md:text-[4.5vh] text-[#2E599C] text-center mt-[7vh]">
						A social coding event for girls 13-18 around the world
					</h2>
					<h3 className="outfit text-[#0E387A] text-center text-[1.5vh] md:text-[3vh]">
						August 29th, 2026 || 20+ cities worldwide
					</h3>
					<h1 className="galindo text-[6.5vh] leading-[6.5vh] md:leading-[8vh] text-center gradient-text mt-[1.5vh]">
						No experience necessary - join today!
					</h1>
					<a
						href="https://forms.hackclub.com/sunbeam-signup"
						target="_blank"
						rel="noopener noreferrer"
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
									SIGN UP
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
									TEAM
								</h2>
								<p className="outfit text-[2.25vh] text-center text-[#2E599C]">
									Join a team of 1-3 people. Come in with your friends or meet
									new friends at the social! No experience is needed - everyone
									is welcome!
								</p>
							</div>
						</div>
						<div className="w-full h-[70vh] rounded-[3.5vh] border border-neutral-400 drop-shadow-sm bg-neutral-50 p-[0.75vw]">
							<div className="border-[1vh] border-[#C79713] w-full h-full rounded-[3vh] flex flex-col items-center justify-start p-[1vw]">
								<img src="/imgs/img3.webp" className="pb-[2vh]" alt="" />
								<h2 className="galindo text-center text-[4vh] text-[#C79713]">
									FUN!
								</h2>
								<p className="outfit text-[2.25vh] text-center text-[#C79713]">
									August 29!! Have fun during the event: make friends, enjoy the
									food/drinks, and learn from workshops!
								</p>
							</div>
						</div>
					</div>

					{/* license plates */}
					<div className="m-12">
						<div className="flex flex-row flex-wrap m-4 gap-4 justify-center items-center">
							<div className="flex flex-row items-center gap-8">
								<img src="/imgs/plate1.webp" alt="build your project!" className="h-[30vh]" />
								<div className=" pt-4 pb-8 px-4 border-2 bg-white border-blue-dark/50 shadow-sm shadow-blue-dark/50">
									<img src="/imgs/img4.png" className="h-[30vh] border-1 border-blue-dark/50"/>
								</div>
							</div>
							<div className="flex flex-row-reverse items-center gap-12">
								<img src="/imgs/plate2.png" alt="show it off!" className="h-[30vh]" />
								<div className=" pt-4 pb-12 px-4 border-2 bg-white border-blue-dark/50 shadow-sm shadow-blue-dark/50">
									<img src="/imgs/img5.png" className="h-[30vh] border-1 border-blue-dark/50"/>
								</div>
							</div>
						<div className="flex flex-row items-center gap-8">
								<img src="/imgs/plate3.png" alt="get prizes!" className="h-[30vh]" />
								<div className=" pt-4 pb-8 px-4 border-2 bg-white border-blue-dark/50 shadow-sm shadow-blue-dark/50">
									<img src="/imgs/img6.webp" className="h-[30vh] border-1 border-blue-dark/50"/>
								</div>
							</div>							
						</div>
					</div>

					{/* CTA */}
					<h2 className="outfit text-[4vh] text-[#C54390] text-center w-[70vw] md:w-[60vw] leading-[7.5vh] my-[2vh] drop-shadow-sm">
						Ready? Come enjoy the sunshine!
					</h2>
					<a
						href="/apply"
						className="hover:scale-105 transition-all cursor-pointer w-fit mx-auto mb-[5vh]"
					>
						<img
							src="/imgs/sign-up2.webp"
							className="w-[40vw] md:w-[20vw] mx-auto"
							alt="apply!"
						/>
					</a>
				</div>
			</div>

			{/* Schedule */}
			<div className="relative w-full overflow-hidden">
				<img
					src="/imgs/sandNoFade.webp"
					className="w-full object-cover absolute top-0 z-0"
					alt=""
				/>
				<img
					src="/imgs/sandNoFade.webp"
					className="w-full absolute top-[100vh] object-cover  z-0"
					alt=""
				/>

				<div className="relative mt-8 w-[80%] items-center justify-self-center flex flex-col py-[9vh] z-5 overflow-hidden bg-[url('/imgs/planks2.webp')] bg-[1000px_auto] bg-repeat outline-1 outline-blue-dark/65 shadow-xl shadow-blue-dark/10">
					{/* <img
						src="/imgs/boardwalk2.webp"
						className="absolute inset-0 z-0 w-full h-full object-cover"
						alt=""
					/> */}
					<div className="relative z-5 flex flex-col items-center w-[88vw] md:w-[52.5vw]">
						<h1 className="galindo text-[5.5vh] md:text-[9vh] text-center text-[#72BFDA] blue-outlined-text mb-[0.25vh]">
							Schedule
						</h1>
						<p className="outfit text-[#0E387A] text-[1.7vh] md:text-[2.5vh] text-center mb-[3vh]">
							Here is what your Sunbeam might look like!
						</p>

						<div className="w-full bg-[#FBF6E7] border-[0.25vh] border-[#2E599C] rounded-[2vh] p-[1.8vh] md:p-[2.5vh]">
							{schedule.map((item, index) => (
								<div
									key={index}
									className={`flex flex-col md:flex-row md:items-center gap-[0.4vh] justify-between md:gap-[2.5vw] py-[1.2vh] ${
										index !== schedule.length - 1
											? "border-b-[0.15vh] border-[#2E599C33]"
											: ""
									}`}
								>
									<p className="outfit text-[#0E387A] text-[2.25vh] leading-snug min-w-0">
										{item.event}
									</p>
									<p className="galindo text-[#C54390] text-[2.5vh] shrink-0 whitespace-nowrap">
										{item.time}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* FAQ */}
			<div className="bg-[url('/imgs/sandNoFade.webp')] relative min-h-[120vh] items-center justify-center w-full flex flex-col pt-[5vh] pb-[17.5vh] z-3 overflow-hidden">
				{/* <img
					src="/imgs/sandNoFade.webp"
					className="w-full absolute top-[-10vh] z-0"
					alt=""
				/> */}
				<img
					src="/imgs/sunbeam-photo.webp"
					className="absolute top-0 h-full w-[80vw] left-[10vw] object-cover z-5"
					alt=""
				/>

				<div className="w-[60vw] my-[8vh] flex flex-col items-center relative z-10">
					<h2 className="galindo text-[7vh] text-[#bdd3f7] blue-outlined-text drop-shadow-md drop-shadow-neutral-200 text-center leading-[6.5vh] mb-[3vh]">
						FAQ
					</h2>
					<div className="w-full bg-[#FBF6E7] border-[0.25vh] border-[#2E599C] rounded-[2vh] p-[2vh] md:p-[2.5vh]">
						{participantFaqs.map((faq, index) => {
							const isOpen = openFaq === index;
							return (
								<div
									key={faq.question}
									className={`py-[1.5vh] ${
										index !== participantFaqs.length - 1
											? "border-b-[0.15vh] border-[#2E599C33]"
											: ""
									}`}
								>
									<button
										type="button"
										onClick={() => setOpenFaq(isOpen ? null : index)}
										aria-expanded={isOpen}
										className="w-full flex items-center justify-between gap-[2vw] text-left cursor-pointer"
									>
										<h3 className="galindo text-[#C54390] text-[3vh] leading-[3.5vh]">
											{faq.question}
										</h3>
										<span
											className={`galindo text-[#C54390] text-[3vh] leading-[3.5vh] shrink-0 transition-transform duration-300 ${
												isOpen ? "rotate-180" : ""
											}`}
										>
											▾
										</span>
									</button>
									<div
										className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
											isOpen
												? "grid-rows-[1fr] opacity-100 mt-[1vh]"
												: "grid-rows-[0fr] opacity-0"
										}`}
									>
										<p className="outfit text-[#0E387A] text-[2.25vh] leading-[3vh] overflow-hidden">
											{faq.answer}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Sand spacer before footer */}
			<div className="w-full h-[12.5vh] bg-[url('/imgs/sandNoFade.webp')] z-3" />

			{/* ── SPONSOR ── */}
			{/* <div className="relative min-h-screen w-full pt-[10vh] pb-[8vh] flex flex-col items-center z-3">
				<img
					src="/imgs/sand.webp"
					className="w-full absolute top-[-10vh] z-0"
					alt=""
				/>

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
				/> */}

			{/* <div className="flex flex-col relative z-5 items-center justify-center">
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
				</div> */}
			{/* </div> */}

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
				<img
					src="/imgs/ray2.webp"
					className="hidden md:absolute bottom-[2vh] right-0 z-5 w-[20vw]"
					alt=""
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
