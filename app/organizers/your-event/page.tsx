import Image from "next/image";

export default function YourEvent() {
	return (
		<div className="min-h-screen bg-[#082249] flex flex-col items-center justify-center gap-8 text-center px-6">
			<p className="outfit font-bold text-white text-4xl 2xl:text-6xl">
				we&apos;re working on this! come back soon ;)
			</p>
			<Image
				src="/imgs/sonbeam.png"
				alt="Sonbeam"
				width={1063}
				height={1063}
				className="w-[30vw] h-auto"
			/>
		</div>
	);
}
