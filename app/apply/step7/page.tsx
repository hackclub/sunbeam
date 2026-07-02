"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ApplicationPreview from "@/app/components/ApplicationPreview";

export default function Step7() {
	const router = useRouter();
	const [committed, setCommitted] = useState(false);
	const [comfortable_with_poc, setComfortableWithPoc] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	async function handleSubmit() {
		if (!committed) {
			alert("Please confirm you're committed before submitting.");
			return;
		}
		setSubmitting(true);
		const saved = JSON.parse(localStorage.getItem("sunbeam_app") || "{}");
		const payload = { ...saved, comfortable_with_poc };

		const res = await fetch("/api/submit", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});

		if (res.ok) {
			const name = encodeURIComponent(
				saved.preferred_name || saved.first_name || ""
			);
			localStorage.removeItem("sunbeam_app");
			router.push(`/apply/submitted?name=${name}`);
		} else {
			alert("Something went wrong. Please try again.");
			setSubmitting(false);
		}
	}

	return (
		<div
			className="relative w-full min-h-screen"
			style={{
				backgroundImage: "url('/imgs/sand.webp')",
				backgroundRepeat: "repeat-y",
				backgroundSize: "100% auto",
			}}
		>
			<a
				href="/apply/step6"
				className="fixed z-10 backdrop-blur-sm top-0 left-0 bg-white/70 border-[0.2vh] border-white py-[1vh] px-[2vw] rounded-br-[3vh]"
			>
				<span className="text-[2vh] outfit">{"<-"} Back</span>
			</a>
			<div className="relative mx-[1.7%] mt-[4vh] mb-[2vh]">
				<Image
					src="/imgs/boardwalk.webp"
					fill
					alt=""
					priority
					className="pointer-events-none rounded-sm object-fill"
					sizes="96vw"
				/>

				<div className="relative z-10 w-[86%] mx-auto pt-[3vh] pb-[4vh]">
					<h1 className="galindo pink-outlined-text text-[3.4vw] leading-tight">
						Last thing...
					</h1>

					<p className="galindo text-[#2E599C] text-[2vw] leading-snug mt-[1.5vh]">
						Are YOU committed?
					</p>

					<div className="mt-[1.5vh] rounded-2xl border-[3px] border-[#F393B4] bg-white/50 px-[2vw] py-[1.5vh]">
						<p className="outfit font-bold text-[#2E599C] text-[1.2vw] mb-[1vh]">
							Being committed means:
						</p>
						<div className="flex flex-col gap-[0.8vh]">
							{[
								"attending all check-in calls (as POC it will be required, as org it is highly recommended)",
								"checking your email often for questions from participants or new info from us",
								"getting as many girls interested and participating as possible",
								"trying your very best to make your event run as best as possible",
							].map((item, i) => (
								<div key={i} className="flex items-start gap-[0.6vw]">
									<span className="text-[#F393B4] text-[1.3vw] leading-snug flex-shrink-0">
										★
									</span>
									<p className="outfit font-semibold text-[#2E599C] text-[1.1vw] leading-snug">
										{item}
									</p>
								</div>
							))}
						</div>
					</div>

					<div className="flex items-start gap-[1.5vw] mt-[2.5vh]">
						<div
							onClick={() => setCommitted((v) => !v)}
							className={`flex-shrink-0 w-[1.4vw] h-[1.4vw] border-[3px] border-[#0e387a] rounded-md cursor-pointer mt-[0.3vw] transition-colors ${
								committed ? "bg-[#F393B4]" : "bg-white"
							}`}
						/>
						<span className="outfit text-[#2E599C] font-semibold text-[1.2vw] leading-snug">
							Check this box if you&apos;re committed to running the best
							Sunbeam social ever
						</span>
					</div>

					<div className="mt-[2vh]">
						<div className="flex items-start gap-[1.5vw]">
							<div
								onClick={() => setComfortableWithPoc((v) => !v)}
								className={`flex-shrink-0 w-[1.4vw] h-[1.4vw] border-[3px] border-[#0e387a] rounded-md cursor-pointer mt-[0.3vw] transition-colors ${
									comfortable_with_poc ? "bg-[#F393B4]" : "bg-white"
								}`}
							/>
							<span className="outfit text-[#2E599C] font-semibold text-[1.2vw] leading-snug">
								Check this box if you are comfortable being the Point of Contact
								for your city.
							</span>
						</div>
						<p className="outfit font-bold text-[#359BBF] text-[1.1vw] leading-relaxed mt-[0.8vh] ml-[2.9vw]">
							This would include being the &ldquo;lead organizer&rdquo; of your
							group, being responsible for completing weekly check-ins, and
							attending pre-event support calls and being the main point of
							contact for your city.
						</p>
					</div>

					<ApplicationPreview />

					<div className="flex justify-center mt-[4vh]">
						<button
							type="button"
							onClick={handleSubmit}
							disabled={submitting}
							className="hover:scale-105 transition-transform cursor-pointer bg-transparent border-none p-0 disabled:opacity-60 disabled:cursor-not-allowed"
							style={{ width: "24vw" }}
						>
							<Image
								src="/imgs/surfboard_submit.webp"
								width={1031}
								height={382}
								alt="Submit!"
								className="w-full h-auto"
							/>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
