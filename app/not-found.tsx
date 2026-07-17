import Link from "next/link";

export default function NotFound() {
	return (
		<div className="min-h-screen bg-[#082249] flex flex-col items-center justify-center gap-8 text-center px-6">
			<h1 className="galindo text-[#72BFDA] text-6xl md:text-8xl">404</h1>
			<p className="outfit font-bold text-white text-2xl md:text-4xl">
				looks like this page washed away!
			</p>
			<img
				src="/imgs/sonbeam.png"
				alt="Sonbeam"
				width={1063}
				height={1063}
				className="w-[40vw] md:w-[20vw] h-auto"
			/>
			<Link
				href="/"
				className="bg-[#72BFDA] text-[#082249] galindo px-8 py-3 rounded-full text-lg hover:opacity-90 transition-opacity"
			>
				Back to shore
			</Link>
		</div>
	);
}
