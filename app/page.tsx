export default function Home() {
	return (
		<div className="relative">
			{/* ── HERO ── */}
			<div className="relative min-h-screen md:min-h-[110vh] w-full">
				<div className="absolute inset-0 h-full md:h-[110vh] overflow-hidden">
					<img
						src="/imgs/water.png"
						className="w-full h-full object-cover object-bottom"
						alt=""
					/>
				</div>

				{/* Shark */}
				<img
					src="/imgs/shark1.png"
					className="absolute top-[-2vh] left-[2.5vw] z-10 w-[30vw] md:w-[17.5vw]"
					alt=""
				/>

				{/* Foam wave */}
				<img
					src="/imgs/foam.png"
					className="hidden md:block md:absolute bottom-[-20vh] left-0 z-5 w-full"
					alt=""
				/>

				<div className="flex flex-col relative z-5">
					{/* Logo + video */}
					<div className="relative w-full px-4 md:w-[80vw] md:mx-auto flex flex-col md:flex-row mt-[5vh] mb-[5vh] md:mb-[9vh] gap-4 md:gap-0">
						<img
							src="/imgs/sunbeam.png"
							className="w-[70vw] mx-auto md:w-[49vw] md:mx-0 md:absolute md:bottom-[-6vh] md:left-[5vw]"
							alt="Sunbeam"
						/>
						{/* Video placeholder */}
						<div className="w-full md:w-[45vw] h-[30vh] md:h-[40vh] bg-neutral-200/80 md:ml-auto flex items-center justify-center rounded-sm">
							<span className="galindo text-black text-[4.5vw] md:text-[1.8vw]">
								launch video
							</span>
						</div>
					</div>

					<h2 className="galindo text-[3vh] px-[5vw] md:px-0 md:text-[4.5vh] text-[#2E599C] text-center">
						A social coding event for girls 13-18 around the world
					</h2>
					<h3 className="outfit text-[#0E387A] text-center text-[1.75vh] md:text-[3vh]">
						August 29th, 2026 || 20+ cities worldwide
					</h3>
					<h1 className="galindo text-[6.5vh] leading-[6.5vh] md:leading-[8vh] text-center gradient-text mt-[1.5vh] px-4">
						Organize a Sunbeam Social in your city!
					</h1>
					<a
						href="/apply"
						className="hover:scale-105 transition-all cursor-pointer w-fit mx-auto"
					>
						<img
							src="/imgs/apply.png"
							className="w-[65vw] md:w-[25vw] mx-auto"
							alt="apply!"
						/>
					</a>
				</div>
			</div>

			{/* ── HOW-TO ── */}
			<div className="relative min-h-screen w-full pt-[26vh] flex flex-col items-center">
				{/* sand on a laptop */}
				<img src="/imgs/sand.png" className="w-full absolute top-0 z-0" alt="" />
				<img src="/imgs/sand.png" className="w-full absolute top-[100vh] z-0" alt="" />
				{/* sand on a phone */}
				<img src="/imgs/sand.png" className="w-full absolute md:hidden top-0 z-0" alt="" />
				<img src="/imgs/sand.png" className="w-full absolute md:hidden top-[60vh] z-0" alt="" />
				<img src="/imgs/sand.png" className="w-full absolute md:hidden top-[120vh] z-0" alt="" />
				<img src="/imgs/sand.png" className="w-full absolute md:hidden top-[180vh] z-0" alt="" />
				<img src="/imgs/sand.png" className="w-full absolute md:hidden top-[240vh] z-0" alt="" />
				<img src="/imgs/sand.png" className="w-full absolute md:hidden top-[300vh] z-0" alt="" />
				<img src="/imgs/sand.png" className="w-full absolute md:hidden top-[360vh] z-0" alt="" />
				<img src="/imgs/sand.png" className="w-full absolute md:hidden top-[420vh] z-0" alt="" />
				<img
					src="/imgs/ray1.png"
					className="absolute top-[20vh] right-[6vw] z-5 w-[17.5vw] hidden md:block"
					alt=""
				/>

				{/* What is Sunbeam Social */}
				<div className="flex flex-col relative z-5 items-center justify-center">
					<h2 className="galindo text-[6.5vh] text-[#D88127] text-center w-[80vw] md:w-[50vw] leading-[7.5vh] mb-[1vh]">
						What is a Sunbeam Social?
					</h2>
					<div className="w-[90vw] md:w-[80vw] h-[70vh] relative bg-blue-400 my-[7vh]">
						<div className="flex flex-col z-5 relative px-[20vw] md:px-[18vw] text-center items-center justify-center gap-[1vh] md:gap-[3vh] h-[70vh]">
							<p className="z-5 relative text-[2.15vh] md:text-[3.5vh] outfit text-[#0E387A] font-semibold">
								Sunbeam is a day-long hangout where girls can make projects
								together, chat with other girls, learn to code from scratch, and
								enjoy delicious food.
							</p>
							<p className="z-5 relative text-[2.15vh] md:text-[3.5vh] outfit text-[#0E387A] font-semibold">
								We want every Sunbeam social to have a friendly, chill, and
								supportive environment that helps even complete beginners make
								something they&apos;re proud of.
							</p>
							<p className="z-5 relative text-[2.15vh] md:text-[3.5vh] outfit text-[#0E387A] font-semibold">
								This event is more of a SOCIAL coding get together than a
								hackathon!!!
							</p>
						</div>
						<img
							src="/imgs/what-is-sunbeam.png"
							className="w-[90vw] md:w-[80vw] h-[70vh] absolute top-0 left-0 z-1"
							alt=""
						/>
					</div>
				</div>

				<div className="flex flex-col relative z-5 items-center justify-center">
					<h2 className="galindo text-[6.5vh] text-[#D88127] text-center w-[80vw] md:w-[50vw] leading-[7.5vh] mb-[1vh]">
						How do you organize a Sunbeam Social?
					</h2>

					{/* Three cards */}
					<div className="w-[90vw] md:w-[77.5vw] flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-[3vw] my-[4vh]">
						<div className="w-full h-auto md:h-[65vh] rounded-[3.5vh] border border-neutral-400 drop-shadow-sm bg-neutral-50 p-2 md:p-[0.75vw]">
							<div className="border-[1vh] border-[#C54390] w-full h-full rounded-[3vh] flex flex-col items-center justify-start p-4 md:p-[1vw]">
								<img src="/imgs/img1.png" className="pb-[2vh] max-h-[25vh] w-auto object-contain" alt="" />
								<h2 className="galindo text-center text-[6vw] md:text-[4vh] text-[#C54390]">
									APPLY!
								</h2>
								<p className="outfit text-sm md:text-[2.25vh] text-center text-[#C54390]">
									Apply to <span className="underline">organize</span> a Sunbeam
									using our form. Experience helps but isn&apos;t necessary!
								</p>
							</div>
						</div>
						<div className="w-full h-auto md:h-[72.5vh] rounded-[3.5vh] border border-neutral-400 drop-shadow-sm bg-neutral-50 p-2 md:p-[0.75vw]">
							<div className="border-[1vh] border-[#2E599C] w-full h-full rounded-[3vh] flex flex-col items-center justify-start p-4 md:p-[1vw]">
								<img src="/imgs/img2.png" className="pb-[2vh] max-h-[25vh] w-auto object-contain" alt="" />
								<h2 className="galindo text-center text-[6vw] md:text-[4vh] text-[#2E599C]">
									PLAN!
								</h2>
								<p className="outfit text-sm md:text-[2.25vh] text-center text-[#2E599C]">
									Plan your event: secure a{" "}
									<span className="underline">venue</span>, plan your{" "}
									<span className="underline">budget</span>, advertise, and{" "}
									<span className="underline">get participants</span> to sign
									up! Shop for food, drinks, &amp; prizes for your participants.
								</p>
							</div>
						</div>
						<div className="w-full h-auto md:h-[65vh] rounded-[3.5vh] border border-neutral-400 drop-shadow-sm bg-neutral-50 p-2 md:p-[0.75vw]">
							<div className="border-[1vh] border-[#C79713] w-full h-full rounded-[3vh] flex flex-col items-center justify-start p-4 md:p-[1vw]">
								<img src="/imgs/img3.png" className="pb-[2vh] max-h-[25vh] w-auto object-contain" alt="" />
								<h2 className="galindo text-center text-[6vw] md:text-[4vh] text-[#C79713]">
									EVENT!
								</h2>
								<p className="outfit text-sm md:text-[2.25vh] text-center text-[#C79713]">
									August 29!! Have fun during your event and make friends with
									fellow organizers &amp; participants.
								</p>
							</div>
						</div>
					</div>

					{/* Organizers portal surfboard */}
					<a
						href="/organizers"
						className="hover:scale-105 transition-all cursor-pointer w-fit mx-auto"
					>
						<img
							src="/imgs/org-portal.png"
							className="w-[80vw] md:w-[35vw] mx-auto"
							alt="Visit the organizer portal for more resources"
						/>
					</a>

					{/* CTA */}
					<h2 className="outfit text-[6vw] md:text-[6vh] text-[#C54390] text-center w-[90vw] md:w-[60vw] leading-tight md:leading-[7.5vh] my-[4vh] drop-shadow-sm">
						Ready? Let the sun beam in your city!
					</h2>
					<a
						href="/apply"
						className="hover:scale-105 transition-all cursor-pointer w-fit mx-auto"
					>
						<img
							src="/imgs/apply.png"
							className="w-[50vw] md:w-[25vw] mx-auto"
							alt="apply!"
						/>
					</a>
				</div>
			</div>

			{/* ── FOOTER ── */}
			<div className="relative min-h-[80vh] w-full flex flex-col pt-[15vh] md:pt-[23vh]">
				<div className="absolute inset-0 h-[80vh] overflow-hidden">
					<img
						src="/imgs/water.png"
						className="w-full h-full object-cover object-bottom rotate-180"
						alt=""
					/>
				</div>
				<img
					src="/imgs/foam2.png"
					className="hidden md:block md:absolute top-[-15vh] left-0 z-5 w-full"
					alt=""
				/>
				<img
					src="/imgs/ray2.png"
					className="absolute bottom-[2vh] right-0 z-5 w-[20vw] hidden md:block"
					alt=""
				/>

				<div className="relative z-5 flex flex-col">
					{/* Footer headline */}
					<h3 className="outfit text-[#FBF6E7]/90 font-semibold text-[5.5vw] md:text-[5.5vh] text-center px-4">
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
					<div className="flex flex-col md:flex-row gap-6 md:gap-[8vw] mt-[6vh] px-6 md:px-[5.3%]">
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
									className="galindo text-black/50 md:text-[#D5F0E8] text-[5vw] md:text-[1.8vw] hover:underline leading-tight"
								>
									{label}
								</a>
							))}
						</div>

						{/* Right description */}
						<p className="outfit text-black/60 md:text-[#FAF0D3] text-sm md:text-[1.5vw] leading-relaxed max-w-[80vw] md:max-w-[60vw]">
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
					<p className="outfit text-[#FCF7E8] text-xs md:text-[0.75vw] mt-[4vh] text-center pb-4">
						© 2026 Hack Club. 501(c)(3) nonprofit (EIN: 81-2908499)
					</p>
				</div>
			</div>
		</div>
	);
}
