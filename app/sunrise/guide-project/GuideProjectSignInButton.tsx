"use client";
import Image from "next/image";
import Link from "next/link";

export default function GuideProjectSignInButton({
	authUrl,
}: {
	authUrl: string;
}) {
	return (
		<div
			className="relative w-full min-h-screen"
			style={{
				backgroundImage: "url('/imgs/sand.webp')",
				backgroundRepeat: "repeat-y",
				backgroundSize: "100% auto",
			}}
		>
			<Link
				href="/sunrise"
				className="fixed z-20 top-0 left-0 bg-white/70 border-[0.2vh] border-white py-[0.8vh] px-[2vw] rounded-br-[2.5vh]"
			>
				<span className="text-[1.8vh] outfit">{"<-"} Back</span>
			</Link>

			<div className="relative mx-[2.5%] mt-[7vh] mb-[4vh]">
				<Image
					src="/imgs/boardwalk.webp"
					fill
					alt=""
					priority
					className="pointer-events-none rounded-sm object-fill"
					sizes="95vw"
				/>
				<div className="relative z-10 w-[82%] mx-auto pt-[5vh] pb-[6vh] flex flex-col items-center gap-[3vh]">
					<h1 className="galindo pink-outlined-text text-center text-[3.36vw] mb-[2vh]">
						Sign in with Hack Club to submit your guide project!
					</h1>

					<a
						href={authUrl}
						className="hover:scale-105 transition-transform mt-[2vh]"
						style={{ width: "28vw", display: "block" }}
					>
						<Image
							src="/imgs/surfboard_next2.webp"
							width={516}
							height={191}
							alt="Sign in with Hack Club"
							className="w-full h-auto"
						/>
					</a>

					<p className="galindo text-[#C54390] text-[1.4vw] -mt-[1vh]">
						Sign in with Hack Club Auth
					</p>
				</div>
			</div>
		</div>
	);
}
