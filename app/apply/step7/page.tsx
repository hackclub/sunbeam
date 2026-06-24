"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Step7() {
	const router = useRouter();
	const [committed, setCommitted] = useState(false);
	const [comfortable_with_poc, setComfortableWithPoc] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	async function handleSubmit() {
		setSubmitting(true);
		const saved = JSON.parse(localStorage.getItem("sunbeam_app") || "{}");
		const payload = { ...saved, comfortable_with_poc };

		const res = await fetch("/api/submit", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});

		if (res.ok) {
			localStorage.removeItem("sunbeam_app");
			router.push("/apply/submitted");
		} else {
			alert("Something went wrong. Please try again.");
			setSubmitting(false);
		}
	}

	return (
		<div
			className="relative w-full min-h-screen"
			style={{
				background:
					"linear-gradient(to bottom, rgb(234,242,233) 0%, rgb(251,246,231) 3%, rgb(250,239,211) 100%)",
			}}
		>
			<div className="relative mx-[1.7%] mt-[7vh] mb-[4vh]">
				<img
					src="/imgs/planks.png"
					className="absolute inset-0 w-full h-full object-fill pointer-events-none rounded-sm"
					alt=""
				/>

				<div className="relative z-10 w-[86%] mx-auto pt-[5vh] pb-[8vh]">
					<h1 className="galindo text-[#D88127] text-[4vw] leading-tight">
						Last thing...
					</h1>

					<p className="galindo text-[#2E599C] text-[2.9vw] leading-snug mt-[3vh]">
						Are YOU committed?
					</p>

					<div className="outfit text-[#359BBF] text-[1.6vw] leading-relaxed mt-[2vh]">
						<p className="font-semibold mb-[1vh]">Being committed means:</p>
						<ul className="list-disc list-inside flex flex-col gap-[0.8vh]">
							<li>attending all check-in calls (as POC it will be required, as org it is highly recommended)</li>
							<li>checking your email often for question from participants or new info from us</li>
							<li>getting as many girls interested and participating as possible</li>
							<li>trying your very best to make your event run as best as possible</li>
						</ul>
					</div>

					<div className="flex items-start gap-[1.5vw] mt-[4vh]">
						<div
							onClick={() => setCommitted((v) => !v)}
							className="flex-shrink-0 w-[1.8vw] h-[1.8vw] bg-white border border-[#c8d8f0] rounded-sm cursor-pointer mt-[0.3vw] flex items-center justify-center"
						>
							{committed && <span className="text-[#D88127] text-[1.2vw] leading-none">✓</span>}
						</div>
						<span className="galindo text-[#F9A636] text-[2vw] leading-snug">
							Check this box if you&apos;re committed to running the best Sunbeam social ever
						</span>
					</div>

					<div className="mt-[5vh]">
						<div className="flex items-start gap-[1.5vw]">
							<div
								onClick={() => setComfortableWithPoc((v) => !v)}
								className="flex-shrink-0 w-[1.8vw] h-[1.8vw] bg-white border border-[#c8d8f0] rounded-sm cursor-pointer mt-[0.3vw] flex items-center justify-center"
							>
								{comfortable_with_poc && <span className="text-[#D88127] text-[1.2vw] leading-none">✓</span>}
							</div>
							<span className="galindo text-[#F9A636] text-[2vw] leading-snug">
								Check this box if you are comfortable being the Point of Contact for your city.
							</span>
						</div>
						<p className="outfit text-[#359BBF] text-[1.6vw] leading-relaxed mt-[1.5vh] ml-[5.3vw]">
							This would include being the &ldquo;lead organizer&rdquo; of your group, being responsible for
							completing weekly check-ins, and attending pre-event support calls and being the main
							point of contact for your city.
						</p>
					</div>

					<div className="flex justify-center mt-[8vh]">
						<button
							type="button"
							onClick={handleSubmit}
							disabled={submitting}
							className="hover:scale-105 transition-transform cursor-pointer bg-transparent border-none p-0 disabled:opacity-60 disabled:cursor-not-allowed"
							style={{ width: "30vw" }}
						>
							<img src="/imgs/surfboard_submit.png" className="w-full" alt="Submit!" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
