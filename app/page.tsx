import Image from "next/image";

export default function Home() {
	return (
		<div className="relative">
			<div className="relative min-h-[110vh] w-full">
				<div className="absolute inset-0 h-[110vh] overflow-hidden">
					<img
						src="/imgs/water.png"
						className="w-full h-full object-cover object-bottom"
						alt=""
					/>
				</div>
				<img
					src="/imgs/shark1.png"
					className="absolute top-[-2vh] left-[2.5vw] z-5 w-[17.5vw]"
					alt=""
				/>
				<img
					src="/imgs/foam.png"
					className="absolute bottom-[-20vh] left-[0vw] z-5 w-[100vw]"
					alt=""
				/>
				<div className="flex flex-col relative z-5">
					<div className=" z-5 bg-red-200/0 relative w-[80vw] mx-auto flex mt-[5vh] mb-[9vh]">
						<img
							src="/imgs/sunbeam.png"
							className="w-[49vw] absolute bottom-[-6vh] left-[5vw]"
							alt=""
						/>
						<div className="w-[45vw] h-[40vh] bg-neutral-50 ml-auto"></div>
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
					<a href="/application_form"><img src="/imgs/apply.png" className="w-[25vw] mx-auto" alt="" /></a>
				</div>
			</div>
			<div className="relative min-h-screen w-full pt-[26vh] flex flex-col items-center">
				<img
					src="/imgs/sand.png"
					className="w-full absolute top-0 z-0"
					alt=""
				/>
				<img
					src="/imgs/ray1.png"
					className="absolute top-[20vh] right-[6vw] z-5 w-[17.5vw]"
					alt=""
				/>
				<div className="flex flex-col relative z-5 items-center justify-center">
					<h2 className="galindo text-[6.5vh] text-[#D88127] text-center w-[50vw] leading-[7.5vh] mb-[1vh]">
						How do you organize a Sunbeam Social?
					</h2>

					<div className="w-[77.5vw] flex items-center justify-center gap-[3vw] my-[4vh]">
						<div className="w-full h-[65vh] rounded-[3.5vh] border border-neutral-400 drop-shadow-sm drop-shadow-neutral-800/50 bg-neutral-50 p-[0.75vw]">
							<div className="border-[1vh] border-[#C54390] w-full h-full rounded-[3vh] flex flex-col items-center justify-start p-[1vw]">
								<img src="/imgs/img1.png" className="pb-[2vh]" alt="" />
								<h2 className="galindo text-center text-[4vh] text-[#C54390]">
									Apply!
								</h2>
								<p className="outfit text-[2.25vh] text-center text-[#C54390]">
									Apply to organize a Sunbeam using our form. Experience helps
									but isn't necessary!
								</p>
							</div>
						</div>
						<div className="w-full h-[72.5vh] rounded-[3.5vh] border border-neutral-400 drop-shadow-sm drop-shadow-neutral-800/50 bg-neutral-50 p-[0.75vw]">
							<div className="border-[1vh] border-[#2E599C] w-full h-full rounded-[3vh] flex flex-col items-center justify-start p-[1vw]">
								<img src="/imgs/img2.png" className="pb-[2vh]" alt="" />
								<h2 className="galindo text-center text-[4vh] text-[#2E599C]">
									Plan!
								</h2>
								<p className="outfit text-[2.25vh] text-center text-[#2E599C]">
									Apply to organize a Sunbeam using our form. Experience helps
									but isn't necessary!
								</p>
							</div>
						</div>
						<div className="w-full h-[65vh] rounded-[3.5vh] border border-neutral-400 drop-shadow-sm drop-shadow-neutral-800/50 bg-neutral-50 p-[0.75vw]">
							<div className="border-[1vh] border-[#C79713] w-full h-full rounded-[3vh] flex flex-col items-center justify-start p-[1vw]">
								<img src="/imgs/img3.png" className="pb-[2vh]" alt="" />
								<h2 className="galindo text-center text-[4vh] text-[#C79713]">
									Event!
								</h2>
								<p className="outfit text-[2.25vh] text-center">
									Apply to organize a Sunbeam using our form. Experience helps
									but isn't necessary!
								</p>
							</div>
						</div>
					</div>

					<img src="/imgs/read.png" className="w-[35vw] mx-auto" alt="" />
				</div>
			</div>
		</div>
	);
}
