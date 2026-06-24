export default function Home() {
	return (
		<div className="relative">
			{/* ── HERO ── */}
			<div className="relative min-h-[110vh] w-full">
				<div className="absolute inset-0 h-[110vh] overflow-hidden">
					<img
						src="/imgs/water.png"
						className="w-full h-full object-cover object-bottom"
						alt=""
					/>
				</div>

				{/* Shark */}
				<img
					src="/imgs/shark1.png"
					className="absolute top-[-2vh] left-[2.5vw] z-5 w-[17.5vw]"
					alt=""
				/>

				{/* Foam wave */}
				<img
					src="/imgs/foam.png"
					className="absolute bottom-[-20vh] left-0 z-5 w-full"
					alt=""
				/>

				<div className="flex flex-col relative z-5">
					{/* Logo + video */}
					<div className="relative w-[80vw] mx-auto flex mt-[5vh] mb-[9vh]">
						<img
							src="/imgs/sunbeam.png"
							className="w-[49vw] absolute bottom-[-6vh] left-[5vw]"
							alt="Sunbeam"
						/>
						{/* Video placeholder */}
						<div className="w-[45vw] h-[40vh] bg-neutral-200/80 ml-auto flex items-center justify-center rounded-sm">
							<span className="galindo text-black text-[1.8vw]">launch video</span>
						</div>
					</div>

					<h2 className="galindo text-[4.5vh] text-[#2E599C] text-center">
						A social coding event for girls 13-18 around the world
					</h2>
					<h3 className="outfit text-[#0E387A] text-center text-[3vh]">
						August 29th, 2026 || 20+ cities worldwide
					</h3>
					<h1 className="galindo text-[6.5vh] text-center gradient-text mt-[1.5vh]">
						Organize a Sunbeam Social in your city!
					</h1>
					<a
						href="/apply"
						className="hover:scale-105 transition-all cursor-pointer w-fit mx-auto"
					>
						<img src="/imgs/apply.png" className="w-[25vw] mx-auto" alt="apply!" />
					</a>
				</div>
			</div>

			{/* ── HOW-TO ── */}
			<div className="relative min-h-screen w-full pt-[26vh] flex flex-col items-center">
				<img src="/imgs/sand.png" className="w-full absolute top-0 z-0" alt="" />
				<img
					src="/imgs/ray1.png"
					className="absolute top-[20vh] right-[6vw] z-5 w-[17.5vw]"
					alt=""
				/>

				<div className="flex flex-col relative z-5 items-center justify-center">
					<h2 className="galindo text-[6.5vh] text-[#D88127] text-center w-[50vw] leading-[7.5vh] mb-[1vh]">
						How do you organize a Sunbeam Social?
					</h2>

					{/* Three cards */}
					<div className="w-[77.5vw] flex items-center justify-center gap-[3vw] my-[4vh]">
						<div className="w-full h-[65vh] rounded-[3.5vh] border border-neutral-400 drop-shadow-sm bg-neutral-50 p-[0.75vw]">
							<div className="border-[1vh] border-[#C54390] w-full h-full rounded-[3vh] flex flex-col items-center justify-start p-[1vw]">
								<img src="/imgs/img1.png" className="pb-[2vh]" alt="" />
								<h2 className="galindo text-center text-[4vh] text-[#C54390]">APPLY!</h2>
								<p className="outfit text-[2.25vh] text-center text-[#C54390]">
									Apply to <span className="underline">organize</span> a Sunbeam using our form. Experience helps but isn&apos;t necessary!
								</p>
							</div>
						</div>
						<div className="w-full h-[72.5vh] rounded-[3.5vh] border border-neutral-400 drop-shadow-sm bg-neutral-50 p-[0.75vw]">
							<div className="border-[1vh] border-[#2E599C] w-full h-full rounded-[3vh] flex flex-col items-center justify-start p-[1vw]">
								<img src="/imgs/img2.png" className="pb-[2vh]" alt="" />
								<h2 className="galindo text-center text-[4vh] text-[#2E599C]">PLAN!</h2>
								<p className="outfit text-[2.25vh] text-center text-[#2E599C]">
									Plan your event: secure a <span className="underline">venue</span>, plan your <span className="underline">budget</span>, advertise, and <span className="underline">get participants</span> to sign up! Shop for food, drinks, &amp; prizes for your participants.
								</p>
							</div>
						</div>
						<div className="w-full h-[65vh] rounded-[3.5vh] border border-neutral-400 drop-shadow-sm bg-neutral-50 p-[0.75vw]">
							<div className="border-[1vh] border-[#C79713] w-full h-full rounded-[3vh] flex flex-col items-center justify-start p-[1vw]">
								<img src="/imgs/img3.png" className="pb-[2vh]" alt="" />
								<h2 className="galindo text-center text-[4vh] text-[#C79713]">EVENT!</h2>
								<p className="outfit text-[2.25vh] text-center text-[#C79713]">
									August 29!! Have fun during your event and make friends with fellow organizers &amp; participants.
								</p>
							</div>
						</div>
					</div>

					{/* Guide surfboard */}
					<a href="/" className="hover:scale-105 transition-all cursor-pointer w-fit mx-auto">
						<img src="/imgs/read.png" className="w-[35vw] mx-auto" alt="Read our ultimate guide to organizing events >>>" />
					</a>

					{/* CTA */}
					<h2 className="outfit text-[6vh] text-[#C54390] text-center w-[60vw] leading-[7.5vh] my-[4vh] drop-shadow-sm">
						Ready? Let the sun beam in your city!
					</h2>
					<a href="/apply" className="hover:scale-105 transition-all cursor-pointer w-fit mx-auto">
						<img src="/imgs/apply.png" className="w-[25vw] mx-auto" alt="apply!" />
					</a>
				</div>
			</div>

			{/* ── FOOTER ── */}
			<div className="relative min-h-[80vh] w-full mt-[17.5vh] flex flex-col pt-[23vh]">
				<div className="absolute inset-0 h-[80vh] overflow-hidden">
					<img
						src="/imgs/water.png"
						className="w-full h-full object-cover object-bottom rotate-180"
						alt=""
					/>
				</div>
				<img
					src="/imgs/foam2.png"
					className="absolute top-[-15vh] left-0 z-5 w-full"
					alt=""
				/>
				<img
					src="/imgs/ray2.png"
					className="absolute bottom-[2vh] right-0 z-5 w-[20vw]"
					alt=""
				/>

				<div className="relative z-5 flex flex-col">
					{/* Footer headline */}
					<h3 className="outfit text-[#FBF6E7]/90 font-semibold text-[5.5vh] text-center">
						made with ♡ by{" "}
						<a href="https://athena.hackclub.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
							Hack Club Athena
						</a>{" "}Team
					</h3>

					{/* Nav + description */}
					<div className="flex gap-[8vw] mt-[6vh] px-[5.3%]">
						{/* Left nav */}
						<div className="flex flex-col gap-[1.2vh] flex-shrink-0">
							{[
								{ label: "Hack Club", href: "https://hackclub.com" },
								{ label: "Slack", href: "https://hackclub.com/slack" },
								{ label: "Athena", href: "https://athena.hackclub.com" },
								{ label: "Clubs", href: "https://hackclub.com/clubs" },
								{ label: "Code of Conduct", href: "https://hackclub.com/conduct" },
							].map(({ label, href }) => (
								<a key={label} href={href} target={href !== "#" ? "_blank" : undefined} rel="noopener noreferrer" className="galindo text-[#D5F0E8] text-[1.8vw] hover:underline leading-tight">
									{label}
								</a>
							))}
						</div>

						{/* Right description */}
						<p className="outfit text-[#FAF0D3] text-[1.5vw] leading-relaxed max-w-[60vw]">
							Hack Club is a 501(c)(3) nonprofit and network of 60k+ technical high schoolers. We believe you learn best by building so we&apos;re creating community and providing grants so you can make awesome projects. In the past few years, we&apos;ve partnered with GitHub to run&nbsp;Summer of Making, hosted the&nbsp;world&apos;s longest hackathon on land, and ran&nbsp;Canada&apos;s largest high school hackathon.
							<br /><br />
							At Hack Club, students are building real projects every single day.
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
