import Image from "next/image";

export default function Home() {
	return (
		<div className="relative">

			{/* ── HERO ── */}
			<div className="relative min-h-[110vh] w-full">
				<div className="absolute inset-0 h-[110vh] overflow-hidden">
					<Image
						src="/imgs/water.png"
						fill
						alt=""
						className="object-cover object-bottom"
						priority
						sizes="100vw"
					/>
				</div>

				{/* Shark */}
				<Image
					src="/imgs/shark1.png"
					width={359}
					height={442}
					alt=""
					className="absolute top-[-2vh] left-[2.5vw] z-10 w-[30vw] md:w-[17.5vw] h-auto"
					priority
				/>

				{/* Foam wave */}
				<Image
					src="/imgs/foam.png"
					width={1727}
					height={428}
					alt=""
					className="hidden md:block md:absolute bottom-[-20vh] left-0 z-5 w-full h-auto"
					priority
				/>

				<div className="flex flex-col relative z-5">
					{/* Logo + video */}
					<div className="relative w-[80vw] mx-auto flex flex-col md:flex-row mt-[5vh] mb-[9vh]">
						<Image
							src="/imgs/sunbeam.png"
							width={858}
							height={308}
							alt="Sunbeam"
							className="w-[80vw] md:w-[49vw] absolute bottom-[-10vh] md:bottom-[-6vh] left-0 md:left-[5vw] h-auto"
							priority
						/>
						{/* Video placeholder */}
						<div className="w-[70vw] md:w-[45vw] h-[30vh] md:h-[40vh] bg-neutral-200/80 ml-auto flex items-center justify-center rounded-sm">
							<span className="galindo text-black text-[1.8vw]">
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
					<h1 className="galindo text-[6.5vh] leading-[6.5vh] md:leading-[8vh] text-center gradient-text mt-[1.5vh]">
						Organize a Sunbeam Social in your city!
					</h1>
					<a
						href="/apply"
						className="hover:scale-105 transition-all cursor-pointer w-fit mx-auto"
					>
						<Image
							src="/imgs/apply.png"
							width={523}
							height={210}
							alt="apply!"
							className="w-[65vw] md:w-[25vw] h-auto mx-auto"
							priority
						/>
					</a>
					<p className="outfit text-[#2E599C]/70 text-center text-[1.4vh] md:text-[1.75vh] italic mt-[1.5vh] tracking-wide">
						by reem, lola, jenny, afia, yanella, safia, and kat
					</p>
				</div>
			</div>

			{/* ── HOW-TO ── */}
			<div className="relative min-h-screen w-full pt-[26vh] pb-[20vh] flex flex-col items-center">
				{/* sand background — single element, tiled via CSS */}
				<div
					className="absolute inset-0 z-0 pointer-events-none"
					style={{ backgroundImage: "url('/imgs/sand.png')", backgroundRepeat: "repeat-y", backgroundSize: "100% auto" }}
				/>
				<Image
					src="/imgs/ray1.png"
					width={356}
					height={267}
					alt=""
					className="absolute top-[20vh] right-[6vw] z-5 w-[17.5vw] h-auto hidden md:block"
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
						<Image
							src="/imgs/what-is-sunbeam.png"
							fill
							alt=""
							className="object-fill absolute top-0 left-0 z-1"
							sizes="(max-width: 768px) 90vw, 80vw"
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
								<Image src="/imgs/img1.png" width={389} height={415} alt="" className="pb-[2vh] max-h-[25vh] w-auto object-contain" />
								<h2 className="galindo text-center text-[6vw] md:text-[4vh] text-[#C54390]">
									APPLY!
								</h2>
								<p className="outfit text-[2.25vh] text-center text-[#C54390]">
									Apply to <span className="underline">organize</span> a Sunbeam
									using our form. Experience helps but isn&apos;t necessary!
								</p>
							</div>
						</div>
						<div className="w-full h-auto md:h-[72.5vh] rounded-[3.5vh] border border-neutral-400 drop-shadow-sm bg-neutral-50 p-2 md:p-[0.75vw]">
							<div className="border-[1vh] border-[#2E599C] w-full h-full rounded-[3vh] flex flex-col items-center justify-start p-4 md:p-[1vw]">
								<Image src="/imgs/img2.png" width={389} height={419} alt="" className="pb-[2vh] max-h-[25vh] w-auto object-contain" />
								<h2 className="galindo text-center text-[6vw] md:text-[4vh] text-[#2E599C]">
									PLAN!
								</h2>
								<p className="outfit text-[2.25vh] text-center text-[#2E599C]">
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
								<Image src="/imgs/img3.png" width={399} height={420} alt="" className="pb-[2vh] max-h-[25vh] w-auto object-contain" />
								<h2 className="galindo text-center text-[6vw] md:text-[4vh] text-[#C79713]">
									EVENT!
								</h2>
								<p className="outfit text-[2.25vh] text-center text-[#C79713]">
									August 29!! Have fun during your event and make friends with
									fellow organizers &amp; participants.
								</p>
							</div>
						</div>
					</div>

					{/* Guide surfboard */}
					<a
						href="/"
						className="hover:scale-105 transition-all cursor-pointer w-fit mx-auto"
					>
						<Image
							src="/imgs/read.png"
							width={795}
							height={291}
							alt="Read our ultimate guide to organizing events >>>"
							className="w-[80vw] md:w-[35vw] h-auto mx-auto"
						/>
					</a>

					{/* CTA */}
					<h2 className="outfit text-[6vh] text-[#C54390] text-center w-[70vw] md:w-[60vw] leading-[7.5vh] my-[4vh] drop-shadow-sm">
						Ready? Let the sun beam in your city!
					</h2>
					<a
						href="/apply"
						className="hover:scale-105 transition-all cursor-pointer w-fit mx-auto"
					>
						<Image
							src="/imgs/apply.png"
							width={523}
							height={210}
							alt="apply!"
							className="w-[50vw] md:w-[25vw] h-auto mx-auto"
						/>
					</a>
				</div>
			</div>

			{/* ── FOOTER ── */}
			<div className="relative min-h-[80vh] w-full flex flex-col pt-[23vh]">
				<div className="absolute inset-0 h-[80vh] overflow-hidden">
					<Image
						src="/imgs/water.png"
						fill
						alt=""
						className="object-cover object-bottom rotate-180"
						sizes="100vw"
					/>
				</div>
				<Image
					src="/imgs/foam2.png"
					width={1727}
					height={428}
					alt=""
					className="hidden md:block md:absolute top-[-15vh] left-0 z-5 w-full h-auto"
				/>
				<Image
					src="/imgs/ray2.png"
					width={376}
					height={297}
					alt=""
					className="absolute bottom-[2vh] right-0 z-5 w-[20vw] h-auto hidden md:block"
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
}
