import Image from "next/image";

export default async function SuccessPage({
	params,
}: {
	params: Promise<{ city: string }>;
}) {
	const { city } = await params;
	const cityDisplay = city.replace(/-/g, " ");

	return (
		<div
			className="relative w-full min-h-screen flex flex-col items-center justify-center"
			style={{
				backgroundImage: "url('/imgs/sand.webp')",
				backgroundRepeat: "repeat-y",
				backgroundSize: "100% auto",
			}}
		>
			<Image
				src="/imgs/shark1.webp"
				width={400}
				height={300}
				alt=""
				className="w-[20vw] mb-[4vh]"
			/>
			<h1 className="galindo pink-outlined-text text-center text-[4vw] mb-[2vh]">
				You&apos;re signed up!
			</h1>
			<p className="outfit text-[#2E599C] text-center text-[1.5vw] w-[50vw]">
				See you at Sunbeam Social in {cityDisplay} on August 29th, 2026!
				Keep an eye on your inbox for more details.
			</p>
			<a
				href={`/${city}`}
				className="hover:scale-105 transition-transform mt-[4vh]"
				style={{ width: "18vw", display: "block" }}
			>
				<Image
					src="/imgs/surfboard_next2.webp"
					width={516}
					height={191}
					alt="back to home"
					className="w-full h-auto"
				/>
			</a>
		</div>
	);
}
