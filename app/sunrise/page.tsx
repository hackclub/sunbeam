import Image from "next/image";
import Link from "next/link";

export default function SunriseGuideHome() {
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
						<h1 className="galindo text-[clamp(2.3rem,4.8vw,4rem)] gradient-text leading-tight">
							Basic Website Creation Guide
						</h1>
						<p className="outfit text-[clamp(1.2rem,1.9vw,1.7rem)] text-[#2e599c] mt-[2vh] max-w-[720px] leading-tight">
							By the end, you will have a complete basic website with real HTML,
							CSS, and JavaScript.
						</p>

						<Link
							href="/sunrise/step1"
							className="mt-[5vh] hover:scale-105 transition-transform"
						>
							<Image
								src="/imgs/surfboard_next.webp"
								width={1031}
								height={382}
								alt="start"
								className="w-[22vw] min-w-[220px] h-auto"
							/>
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
}
