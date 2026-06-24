import Image from "next/image";

export default function Home() {
	return (
		<div className="relative">
			<div className="relative min-h-[100vh] md:min-h-[110vh] w-full">
				<div className="absolute inset-0 h-[100vh] md:h-[110vh] overflow-hidden">
					<img
						src="/imgs/water.png"
						className="w-full h-full object-cover object-bottom"
						alt=""
					/>
				</div>
				<img
					src="/imgs/shark1.png"
					className="absolute top-[1vh] left-[3vw] z-5 w-[28vw] md:top-[-2vh] md:left-[2.5vw] md:w-[17.5vw]"
					alt=""
				/>
				<img
					src="/imgs/foam.png"
					className="absolute bottom-[-10vh] left-[0vw] z-5 w-[100vw] md:bottom-[-20vh]"
					alt=""
				/>
				<div className="flex flex-col relative z-5">
					<div className="z-5 bg-red-200/0 relative w-[90vw] md:w-[80vw] mx-auto flex mt-[3vh] mb-[5vh] md:mt-[5vh] md:mb-[9vh]">
						<img
							src="/imgs/sunbeam.png"
							className="w-[70vw] absolute bottom-[-4vh] left-[10vw] md:w-[49vw] md:bottom-[-6vh] md:left-[5vw]"
							alt=""
						/>
						<div className="w-[70vw] h-[22vh] md:w-[45vw] md:h-[40vh] bg-neutral-50 ml-auto"></div>
					</div>
					<h2 className="galindo text-[3.2vh] px-[4vw] md:text-[4.5vh] md:px-0 text-[#2E599C] text-center">
						A social coding event for girls 13-18 around the world
					</h2>
					<h3 className="outfit text-[#0E387A] text-center text-[2vh] px-[4vw] md:text-[3vh] md:px-0">
						August 29th, 2026 || 20+ cities worldwide
					</h3>
					<h1 className="galindo text-[4.2vh] leading-tight px-[4vw] md:px-0 text-center gradient-text mt-[1.5vh] md:text-[6.5vh]">
						Organize a Sunbeam Social in your city!
					</h1>
					<a
						href="/"
						className="hover:scale-105 transition-all cursor-pointer w-fit mx-auto"
					>
						<img
							src="/imgs/apply.png"
							className="w-[55vw] md:w-[25vw] mx-auto"
							alt=""
						/>
					</a>
				</div>
			</div>
			<div className="relative min-h-screen w-full pt-[18vh] md:pt-[26vh] flex flex-col items-center">
				<img
					src="/imgs/sand.png"
					className="w-full absolute top-0 z-0"
					alt=""
				/>
				<img
					src="/imgs/ray1.png"
					className="absolute top-[10vh] right-[2vw] z-5 w-[25vw] md:top-[20vh] md:right-[6vw] md:w-[17.5vw]"
					alt=""
				/>
				<div className="hidden md:block absolute top-[75vh] left-0 w-full border-y-2 border-black bg-white pt-[1vh] pb-[0.5vh]">
					<div className="w-full h-[0.5vh] bg-black"></div>
				</div>

				<div className="flex flex-col relative z-5 items-center justify-center">
					<h2 className="galindo text-[4vh] leading-[5vh] w-[85vw] md:text-[6.5vh] md:w-[50vw] md:leading-[7.5vh] text-[#D88127] text-center mb-[1vh]">
						How do you organize a Sunbeam Social?
					</h2>
					<div className="flex flex-col w-[90vw] gap-[4vh] my-[4vh] md:flex-row md:items-center md:justify-center md:gap-[3vw] md:w-[77.5vw]">
						<div className="w-full h-auto md:h-[65vh] rounded-[5vw] md:rounded-[3.5vh] border border-neutral-400 drop-shadow-sm drop-shadow-neutral-800/50 bg-neutral-50 p-[3vw] md:p-[0.75vw]">
							<div className="border-[0.8vh] md:border-[1vh] border-[#C54390] w-full h-full rounded-[4vw] md:rounded-[3vh] flex flex-col items-center justify-start p-[4vw] md:p-[1vw]">
								<img
									src="/imgs/img1.png"
									className="pb-[2vh] w-[35vw] md:w-auto"
									alt=""
								/>
								<h2 className="galindo text-center text-[3.2vh] md:text-[4vh] text-[#C54390]">
									Apply!
								</h2>
								<p className="outfit text-[2vh] md:text-[2.25vh] text-center text-[#C54390]">
									Apply to <span className="underline">organize</span> a Sunbeam
									using our form. Experience helps but isn't necessary!
								</p>
							</div>
						</div>
						<div className="w-full h-auto md:h-[72.5vh] rounded-[5vw] md:rounded-[3.5vh] border border-neutral-400 drop-shadow-sm drop-shadow-neutral-800/50 bg-neutral-50 p-[3vw] md:p-[0.75vw]">
							<div className="border-[0.8vh] md:border-[1vh] border-[#2E599C] w-full h-full rounded-[4vw] md:rounded-[3vh] flex flex-col items-center justify-start p-[4vw] md:p-[1vw]">
								<img
									src="/imgs/img2.png"
									className="pb-[2vh] w-[35vw] md:w-auto"
									alt=""
								/>
								<h2 className="galindo text-center text-[3.2vh] md:text-[4vh] text-[#2E599C]">
									Plan!
								</h2>
								<p className="outfit text-[2vh] md:text-[2.25vh] text-center text-[#2E599C]">
									Plan your event: secure a{" "}
									<span className="underline">venue</span>, plan your{" "}
									<span className="underline">budget</span>, advertise, and{" "}
									<span className="underline">get participants</span> to sign
									up! Shop for food, drinks, & prizes for your participants.
								</p>
							</div>
						</div>
						<div className="w-full h-auto md:h-[65vh] rounded-[5vw] md:rounded-[3.5vh] border border-neutral-400 drop-shadow-sm drop-shadow-neutral-800/50 bg-neutral-50 p-[3vw] md:p-[0.75vw]">
							<div className="border-[0.8vh] md:border-[1vh] border-[#C79713] w-full h-full rounded-[4vw] md:rounded-[3vh] flex flex-col items-center justify-start p-[4vw] md:p-[1vw]">
								<img
									src="/imgs/img3.png"
									className="pb-[2vh] w-[35vw] md:w-auto"
									alt=""
								/>
								<h2 className="galindo text-center text-[3.2vh] md:text-[4vh] text-[#C79713]">
									Event!
								</h2>
								<p className="outfit text-[2vh] md:text-[2.25vh] text-center text-[#C79713]">
									August 29!! Have fun during your event and make friends with
									fellow organizers & participants.
								</p>
							</div>
						</div>
					</div>
					<a
						href="/"
						className="hover:scale-105 transition-all cursor-pointer w-fit mx-auto"
					>
						<img
							src="/imgs/read.png"
							className="w-[55vw] md:w-[35vw] mx-auto"
							alt=""
						/>
					</a>
					<h2 className="outfit text-[3.5vh] leading-[4.5vh] w-[85vw] my-[3vh] md:text-[6vh] md:w-[60vw] md:leading-[7.5vh] md:my-[4vh] text-[#C54390] text-center drop-shadow-sm">
						Ready? Let the sun beam in your city!
					</h2>
					<a
						href="/"
						className="hover:scale-105 transition-all cursor-pointer w-fit mx-auto"
					>
						<img
							src="/imgs/apply.png"
							className="w-[55vw] md:w-[25vw] mx-auto"
							alt=""
						/>
					</a>{" "}
				</div>
			</div>
			<div className="relative min-h-[85vh] w-full mt-[10vh] md:mt-[15vh] flex flex-col pt-[15vh] md:pt-[23vh]">
				<div className="absolute inset-0 h-[85vh] overflow-hidden">
					<img
						src="/imgs/water2.png"
						className="w-full h-full object-fill object-top"
						alt=""
					/>
				</div>
				<img
					src="/imgs/ray2.png"
					className="absolute bottom-[1vh] right-[0vw] z-5 w-[35vw] md:bottom-[2vh] md:w-[20vw]"
					alt=""
				/>
				<img
					src="/imgs/foam2.png"
					className="absolute top-[-8vh] left-[0vw] z-5 w-[100vw] md:top-[-15vh]"
					alt=""
				/>
				<div className="relative z-5">
					<h3 className="relative z-5 outfit text-white/90 font-semibold text-[3.2vh] px-[4vw] md:text-[5.5vh] md:px-0 text-center">
						Made with ♡ by Hack Club Athena Team
					</h3>
					<h2 className="galindo text-[3.5vh] md:text-[5vh] text-center gradient-text mt-[1.5vh]">
						By Girls, for Girls
					</h2>
					<div className="flex flex-col w-[90vw] md:w-[80vw] mx-auto mt-[3vh] md:mt-[5vh] gap-[3vh] md:gap-[5vw] md:flex-row">
						<div className="w-fit min-w-fit items-start md:items-end flex flex-col gap-[1vh] md:gap-[0.5vh]">
							<a
								href="https://hackclub.com/"
								className="galindo text-[#D5F0F9] text-[2.5vh] md:text-[3.75vh]"
							>
								Hack Club
							</a>
							<a
								href="https://hackclub.enterprise.slack.com/archives/C75M7C0SY"
								className="galindo text-[#D5F0F9] text-[2.5vh] md:text-[3.75vh]"
							>
								Slack
							</a>
							<a
								href="https://athena.hackclub.com/"
								className="galindo text-[#D5F0F9] text-[2.5vh] md:text-[3.75vh]"
							>
								Athena
							</a>
							<a
								href="https://hackclub.com/conduct"
								className="galindo text-[#D5F0F9] text-[2.5vh] md:text-[3.75vh]"
							>
								Code of Conduct
							</a>
						</div>
						<div className="w-full">
							<div className="text-white outfit text-[1.8vh] md:text-[2.5vh]">
								Hack Club is a 501(c)(3) nonprofit and network of 60k+ technical
								high schoolers. We believe you learn best by building so we're
								creating community and providing grants so you can make awesome
								projects. In the past few years, we've partnered with GitHub to
								run{" "}
								<a href="https://summer.hackclub.com/" className="underline">
									Summer of Making
								</a>
								, hosted{" "}
								<a
									href="https://github.com/hackclub/the-hacker-zephyr"
									className="underline"
								>
									the world's longest hackathon on land{" "}
								</a>
								, and ran{" "}
								<a
									href="https://www.youtube.com/watch?v=QvCoISXfcE8"
									className="underline"
								>
									Canada's largest high school hackathon.
								</a>
							</div>
							<p className="text-white outfit text-[1.8vh] md:text-[2.5vh] mt-[2vh] md:mt-[3vh]">
								At Hack Club, students are building real projects every single
								day.
							</p>
						</div>
					</div>
				</div>
				<p className="absolute bottom-[2vh] left-[2vw] right-[2vw] md:right-auto outfit text-neutral-50/80 text-[1.2vh] md:text-[1.5vh]">
					© 2026 Hack Club. 501(c)(3) nonprofit (EIN: 81-2908499)
				</p>
			</div>
		</div>
	);
}
