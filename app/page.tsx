import Image from "next/image";

export default function Home() {
	return (
		<div className="relative">
			{/* ── HERO ── */}
			<div className="relative min-h-[110vh] w-full">
				<div className="absolute inset-0 h-[110vh] overflow-hidden">
					<Image
						src="/imgs/water.webp"
						fill
						alt=""
						className="object-cover object-bottom"
						priority
						sizes="100vw"
					/>
				</div>
				{/* Shark */}
				<Image
					src="/imgs/shark1.webp"
					width={359}
					height={442}
					alt=""
					className="absolute top-[-2vh] left-[2.5vw] z-10 w-[30vw] md:w-[17.5vw] h-auto"
					sizes="(max-width: 768px) 30vw, 17.5vw"
				/>
				{/* Foam wave */}
				<Image
					src="/imgs/foam-fixed.png"
					width={1727}
					height={428}
					alt=""
					className="hidden md:block md:absolute bottom-[-20vh] left-0 z-5 w-full h-auto"
					sizes="100vw"
				/>
				{/* Foam Mobile */}
				<Image
					src="/imgs/foam-fixed.png"
					width={1727}
					height={428}
					alt="foam"
					className="absolute md:hidden bottom-[0] left-0 z-50 w-full h-auto"
				/>

				<div className="flex flex-col relative z-5">
					{/* Video */}
					<div className="relative w-[80vw] mx-auto flex flex-col md:flex-row mt-[5vh] mb-[9vh]">
						{/* Launch video */}
						<div className="h-[30vh] md:h-[40vh] aspect-video max-w-full bg-neutral-200/80 mx-auto rounded-sm overflow-hidden">
							<iframe
								className="w-full h-full"
								src="https://www.youtube.com/embed/Ufmk9QW-XAs"
								title="Sunbeam launch video"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowFullScreen
							/>
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
							src="/imgs/apply.webp"
							width={523}
							height={210}
							alt="apply!"
							className="w-[65vw] md:w-[25vw] h-auto mx-auto"
							sizes="(max-width: 768px) 65vw, 25vw"
						/>
					</a>
					<p className="outfit text-[#2E599C]/70 text-center text-[1.4vh] md:text-[1.75vh] italic mt-[1.5vh] tracking-wide">
						by reem, lola, jenny, afia, yanella, safia, and kat
					</p>
				</div>
			</div>

			{/* ── HOW-TO ── */}
			<div className="relative min-h-screen w-full pt-[26vh] pb-[18vh] flex flex-col items-center">
				{/* sand background — single element, tiled via CSS */}
				<div
					className="absolute inset-0 z-0 pointer-events-none"
					style={{
						backgroundImage: "url('/imgs/sand.webp')",
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
						backgroundPosition: "center top",
					}}
				/>
				<Image
					src="/imgs/ray1.webp"
					width={356}
					height={267}
					alt=""
					className="absolute top-[115vh] right-[6vw] z-5 w-[17.5vw] h-auto hidden md:block"
				/>

				{/* What is Sunbeam Social */}
				<div className="flex flex-col relative z-5 items-center justify-center w-full">
					<h2 className="galindo text-[5.5vh] md:text-[6.5vh] text-[#D77393] text-center leading-tight mb-0">
						How would you lead a Sunbeam Social?
					</h2>
					<div className="relative w-[95vw] md:w-[62vw] mt-0 mb-[1vh] md:mb-[1.5vh] flex flex-col items-center justify-center">
						<Image
							src="/imgs/sunbeam-photo.webp"
							width={1434}
							height={1172}
							alt=""
							className="w-full h-[60vh] md:h-auto rounded-2xl"
							style={{ transform: "rotate(-1.57deg)" }}
							sizes="(max-width: 768px) 92vw, 82vw"
						/>
						<div
							className="absolute rounded-[32px] backdrop-blur-md bg-white/25 flex items-center justify-center top-[50%] -translate-y-[50%] left-[6vw] w-[82vw] md:w-[50vw] mx-auto"
							style={{
								/* 	top: "18.7%",
								left: "14%",
								right: "13.3%",
								bottom: "12.2%", */
								boxShadow: "0 8px 16px rgba(14, 56, 122, 0.5)",
							}}
						>
							<p className="outfit font-semibold text-[#0E387A] text-center text-[3.5vw] md:text-[1.8vw] leading-snug px-[8%] py-[3%]">
								Sunbeam is a day-long hangout where girls can make projects
								together, chat with other girls, learn to code from scratch, and
								enjoy delicious food.
								<br />
								<br />
								We want every Sunbeam Social to have a friendly, chill, and
								supportive environment that helps even complete beginners make
								something they&apos;re proud of.&nbsp;
								<br />
								<br />
								This event is more of a SOCIAL coding get together than a
								hackathon!!!
							</p>
						</div>
					</div>
				</div>

				<div className="flex flex-col relative z-5 items-center justify-center">
					<h2 className="galindo text-[6.5vh] text-[#D88127] text-center w-[80vw] md:w-[50vw] leading-[7.5vh] mb-[1vh]">
						How to get started:
					</h2>

					{/* Three cards */}
					{/* Three cards */}
					<div className="w-[90vw] md:w-[77.5vw] flex flex-col md:flex-row items-start justify-center gap-6 md:gap-[3vw] my-[4vh]">
						<div className="w-full h-auto rounded-[3.5vh] border border-neutral-400 drop-shadow-sm bg-neutral-50 p-2 md:p-[0.75vw]">
							<div className="border-[1vh] border-[#C54390] w-full h-auto rounded-[3vh] flex flex-col items-center justify-start p-4 md:p-[1vw]">
								<div className="w-full aspect-[1/1] relative mb-[2vh]">
									<Image
										src="/imgs/img1.webp"
										fill
										alt=""
										sizes="(max-width: 768px) 90vw, 23vw"
										className="object-cover rounded-lg"
									/>
								</div>
								<h2 className="galindo text-center text-[6vw] md:text-[4vh] text-[#C54390]">
									APPLY!
								</h2>
								<p className="outfit text-[2.25vh] text-center text-[#C54390]">
									Apply to <span className="underline">organize</span>{" "}a Sunbeam
									using our form. Experience helps but isn&apos;t necessary!
								</p>
							</div>
						</div>
						<div className="w-full h-auto rounded-[3.5vh] border border-neutral-400 drop-shadow-sm bg-neutral-50 p-2 md:p-[0.75vw]">
							<div className="border-[1vh] border-[#2E599C] w-full h-auto rounded-[3vh] flex flex-col items-center justify-start p-4 md:p-[1vw]">
								<div className="w-full aspect-[1/1] relative mb-[2vh]">
									<Image
										src="/imgs/img2.webp"
										fill
										alt=""
										sizes="(max-width: 768px) 90vw, 23vw"
										className="object-cover rounded-lg"
									/>
								</div>
								<h2 className="galindo text-center text-[6vw] md:text-[4vh] text-[#2E599C]">
									PLAN!
								</h2>
								<p className="outfit text-[2.25vh] text-center text-[#2E599C]">
									Plan for <span className="underline">venue</span>, <span className="underline">budget</span> and <span className="underline">get</span> girls to sign up! Stock up on food, drinks, and prizes.
								</p>
							</div>
						</div>
						<div className="w-full h-auto rounded-[3.5vh] border border-neutral-400 drop-shadow-sm bg-neutral-50 p-2 md:p-[0.75vw]">
							<div className="border-[1vh] border-[#C79713] w-full h-auto rounded-[3vh] flex flex-col items-center justify-start p-4 md:p-[1vw]">
								<div className="w-full aspect-[1/1] relative mb-[2vh]">
									<Image
										src="/imgs/img3.webp"
										fill
										alt=""
										sizes="(max-width: 768px) 90vw, 23vw"
										className="object-cover rounded-lg"
									/>
								</div>
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
						href="/ultimateguide"
						className="hover:scale-105 transition-all cursor-pointer w-fit mx-auto"
					>
						<Image
							src="/imgs/ultOrgGuide.png"
							width={795}
							height={291}
							alt="Check out the Ultimate Organizer Guide >>>"
							className="w-[80vw] md:w-[35vw] h-auto mx-auto"
						/>
					</a>

					{/* CTA */}
					<h2 className="outfit text-[6vh] text-[#C54390] text-center w-[70vw] md:w-[60vw] leading-[7.5vh] my-[4vh] drop-shadow-sm">
						Ready? Let the sun beam in your city!
					</h2>
					<p className="outfit text-[#2E599C] text-[4vh] text-center" style={{ fontWeight: 540, lineHeight: 1.4 }}>
						Deadline to apply to be an organizer is July 13th.
					</p>
					<a
						href="/apply"
						className="hover:scale-105 transition-all cursor-pointer w-fit mx-auto"
					>
						<Image
							src="/imgs/apply.webp"
							width={523}
							height={210}
							alt="sign up!"
							className="w-[60vw] md:w-[25vw] h-auto mx-auto"
						/>
					</a>

					<p className="outfit text-[#2E599C]/70 text-center text-[15px] italic mt-[1.5vh] tracking-wide px-6">
						Organizers can get service hours for organizing a Sunbeam social. Read the Ultimate Guide for more information. 
					</p>
				</div>
			</div>

			{/* ── FOOTER ── */}
			<div className="relative min-h-[80vh] w-full flex flex-col pt-[23vh]">
				<div className="absolute inset-0 h-[80vh] overflow-hidden">
					<Image
						src="/imgs/water2.webp"
						fill
						alt=""
						className="object-cover object-top"
						sizes="100vw"
					/>
				</div>
				<Image
					src="/imgs/foam-fixed2.png"
					width={376}
					height={297}
					className="hidden md:block md:absolute top-[-19vh] left-0 z-5 w-full"
					alt=""
				/>
				{/* Foam Mobile */}

				<Image
					src="/imgs/foam-fixed2.png"
					width={376}
					height={297}
					className="black md:hidden absolute top-[-4vh] left-0 z-5 w-full"
					alt=""
				/>

				<Image
					src="/imgs/ray2.webp"
					width={376}
					height={297}
					alt=""
					className="absolute bottom-[2vh] right-0 z-5 w-[20vw] h-auto hidden md:block"
				/>

				<div className="relative z-5 flex flex-col">
					{/* Footer headline */}
					<h3 className="outfit text-[#FBF6E7]/90 font-semibold text-[5.5vh] text-center">
						made with <b className="text-[#eeb3c8]">♡</b> by{" "}
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
							Hack Club is a 501(c)(3) nonprofit and network of 130k+ technical teenagers. We believe you learn best by building, so we&apos;re creating community and providing grants so you can make awesome projects.
							<br />
							Previously, we&apos;ve organized the largest all-girls high school hackathon <a href="https://parthenon.hackclub.com/" target="_blank" rel="noopener noreferrer" className="underline">Parthenon</a>, game-jam simultaneously in 200+ cities called <a href="https://campfire.hackclub.com/" target="_blank" rel="noopener noreferrer" className="underline">Campfire</a>, and many more.
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
