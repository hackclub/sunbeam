"use client";

import { useState } from "react";
import Link from "next/link";

export default function TshirtMapTeaser() {
	const [shirtFlipped, setShirtFlipped] = useState(false);

	return (
		<div className="p-4">
			<h1 className="galindo text-5xl text-[#72BFDA] text-center justify-self-center">
				AND you can get this free t-shirt!
			</h1>
			<div className="flex flex-row justify-center items-center">
				<div
					className="group w-12/32 -rotate-4 -mr-6 z-10 [perspective:1000px] cursor-pointer hover:scale-105 duration-200 transition-transform"
					onClick={() => setShirtFlipped((f) => !f)}
				>
					<div
						className={`relative w-full transition-transform duration-500 [transform-style:preserve-3d] ${
							shirtFlipped
								? "[transform:rotateY(180deg)]"
								: "group-hover:[transform:rotateY(25deg)]"
						}`}
					>
						<img
							src="/imgs/tshirt_back.png"
							className="w-full [backface-visibility:hidden]"
							alt="t-shirt back"
						/>
						<img
							src="/imgs/tshirt_front.png"
							className="absolute inset-0 w-full [backface-visibility:hidden] [transform:rotateY(180deg)]"
							alt="t-shirt front"
						/>
					</div>
				</div>
				<Link href="/map" className="w-12/32 -ml-2 block">
					<img
						src="/imgs/map.png"
						className="w-full rotate-2 transition-transform duration-200 hover:scale-105 hover:rotate-4 cursor-pointer"
						alt="find a Sunbeam near you!"
					/>
				</Link>
			</div>
		</div>
	);
}
