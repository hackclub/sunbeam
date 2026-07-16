import Link from "next/link";

export default function StarboardPage() {
	return (
		<div className="min-h-screen bg-[#fdf6e3] outfit flex flex-col items-center justify-center gap-8 p-6">
			<h1 className="galindo text-blue-dark text-2xl">starboard</h1>

			<Link
				href="/starboard/event"
				className="bg-blue-dark text-white galindo px-12 py-6 rounded-full text-2xl hover:opacity-90 transition-opacity shadow-md"
			>
				My event
			</Link>

			<Link
				href="/starboard/admin"
				className="text-blue-dark/50 text-xs underline hover:text-blue-dark/80 transition-colors"
			>
				admin
			</Link>
		</div>
	);
}
