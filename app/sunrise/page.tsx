"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SunriseGuideHome() {
	const [showPaths, setShowPaths] = useState(false);

	return (
		<div
			className="relative h-screen overflow-hidden"
			style={{
				backgroundImage: "url('/imgs/sand4.webp')",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<Link
				href="/"
				className="fixed z-20 top-0 left-0 bg-white/70 border-[0.2vh] border-white py-[0.8vh] px-[2vw] rounded-br-[2.5vh]"
			>
				<span className="text-[1.8vh] outfit">{"<-"} Back</span>
			</Link>

			<Image
				src="/imgs/ray1.webp"
				width={356}
				height={267}
				alt=""
				className="absolute z-0 pointer-events-none top-[10vh] right-[6vw] w-[15vw] h-auto max-w-[160px]"
			/>

			<main className="relative z-10 h-full flex items-center justify-center px-[4vw]">
				<div className="relative w-full max-w-[900px] h-[68vh]">
					<Image
						src="/imgs/boardwalk.webp"
						fill
						alt=""
						priority
						className="pointer-events-none rounded-md object-fill"
						sizes="95vw"
					/>
					<div className="relative h-full flex flex-col items-center justify-center text-center px-[8%]">
						{!showPaths ? (
							<>
								<h1 className="galindo text-[clamp(3.5rem,5.5vw,4.8rem)] gradient-text leading-tight">
									Sunrise
								</h1>
								<p className="outfit text-[clamp(1.2rem,1.9vw,1.7rem)] text-[#2e599c] mt-[2vh] max-w-[720px] leading-tight">
									You need to either submit a previous project or complete the
									guide and submit a project made with it, since you'd need
									technical skills to teach at your Sunbeam!
								</p>

								<button
									onClick={() => setShowPaths(true)}
									className="mt-[5vh] hover:scale-105 transition-transform cursor-pointer"
								>
									<Image
										src="/imgs/surfboard_next.webp"
										width={1031}
										height={382}
										alt="start"
										className="w-[22vw] min-w-[220px] h-auto"
									/>
								</button>
							</>
						) : (
							<>
								<h1 className="galindo text-[clamp(2rem,4.2vw,3.5rem)] gradient-text leading-tight mb-[3vh]">
									Choose Your Path
								</h1>
								<p className="outfit text-[clamp(1rem,1.6vw,1.4rem)] text-[#2e599c] mb-[4vh] max-w-[720px]">
									Are you completing the guide or submitting a previous project?
								</p>

								<div className="flex gap-[3vw] items-center justify-center flex-wrap">
									<Link
										href="/sunrise/previous-project"
										className="hover:scale-105 transition-transform"
									>
										<div className="text-center">
											<Image
												src="/imgs/surfboard_next.webp"
												width={900}
												height={330}
												alt="Submit Previous Project"
												className="w-[18vw] min-w-[180px] h-auto"
											/>
											<p className="galindo text-[#d88127] text-[1.2vw] mt-[1vh]">
												Submit Previous Project
											</p>
										</div>
									</Link>

									<Link
										href="/sunrise/step1"
										className="hover:scale-105 transition-transform"
									>
										<div className="text-center">
											<Image
												src="/imgs/surfboard_next.webp"
												width={900}
												height={330}
												alt="Complete Guide & Submit"
												className="w-[18vw] min-w-[180px] h-auto"
											/>
											<p className="galindo text-[#d88127] text-[1.2vw] mt-[1vh]">
												Complete Guide & Submit
											</p>
										</div>
									</Link>
								</div>

								{/* <button
									onClick={() => setShowPaths(false)}
									className="mt-[4vh] outfit text-[#0e387a] underline hover:text-[#d88127] transition-colors"
								>
									Back
								</button> */}
							</>
						)}
					</div>
				</div>
			</main>
		</div>
	);
}
