"use client";
import { useRouter } from "next/navigation";

export default function SignUpButton({ city }: { city: string }) {
	const router = useRouter();
	return (
		<button
			onClick={() => router.push(`/${city}/signup`)}
			className="hover:scale-105 transition-all cursor-pointer w-fit mx-auto bg-transparent border-none p-0"
		>
			<img
				src="/imgs/sign-up.webp"
				className="w-[65vw] md:w-[25vw] mx-auto"
				alt="sign up!"
			/>
		</button>
	);
}
