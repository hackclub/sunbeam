import type { Metadata } from "next";
import { Geist, Geist_Mono, Galindo, Outfit } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const galindo = Galindo({
	variable: "--font-galindo",
	weight: "400",
	subsets: ["latin"],
});

const outfit = Outfit({
	variable: "--font-outfit",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Sunbeam - Hack Club",
	description: "Sunbeam - 25 events in 25 cities!",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} ${galindo.variable} ${outfit.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
		</html>
	);
}
