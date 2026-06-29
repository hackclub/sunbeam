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
			<div className="relative mx-[1.7%] mt-[7vh] mb-[4vh]">
				<Image
					src="/imgs/boardwalk.webp"
					fill
					alt=""
					priority
					className="pointer-events-none rounded-sm object-fill"
					sizes="96vw"
				/>

				<div className="relative z-10 w-[86%] mx-auto pt-[5vh] pb-[8vh]">
					<h1 className="galindo pink-outlined-text text-[4.8vw] leading-tight">
						Last thing...
					</h1>

					<p className="galindo text-[#2E599C] text-[3.48vw] leading-snug mt-[3vh]">
						Are YOU committed?
					</p>

					<div className="outfit text-[#359BBF] text-[1.92vw] leading-relaxed mt-[2vh]">
						<p className="font-semibold mb-[1vh]">Being committed means:</p>
						<ul className="list-disc list-inside flex flex-col gap-[0.8vh]">
							<li>
								attending all check-in calls (as POC it will be required, as org
								it is highly recommended)
							</li>
							<li>
								checking your email often for question from participants or new
								info from us
							</li>
							<li>
								getting as many girls interested and participating as possible
							</li>
							<li>
								trying your very best to make your event run as best as possible
							</li>
						</ul>
					</div>

					<div className="flex items-start gap-[1.5vw] mt-[4vh]">
						<div
							onClick={() => setCommitted((v) => !v)}
							className="flex-shrink-0 w-[1.8vw] h-[1.8vw] bg-white border-[3px] border-[#0e387a] rounded-md cursor-pointer mt-[0.3vw] flex items-center justify-center"
						>
							{committed && (
								<span className="pink-gradient-text text-[1.44vw] leading-none">
									✓
								</span>
							)}
						</div>
						<span className="galindo pink-outlined-text text-[2.4vw] leading-snug">
							Check this box if you&apos;re committed to running the best
							Sunbeam social ever
						</span>
					</div>

					<div className="mt-[5vh]">
						<div className="flex items-start gap-[1.5vw]">
							<div
								onClick={() => setComfortableWithPoc((v) => !v)}
								className="flex-shrink-0 w-[1.8vw] h-[1.8vw] bg-white border-[3px] border-[#0e387a] rounded-md cursor-pointer mt-[0.3vw] flex items-center justify-center"
							>
								{comfortable_with_poc && (
									<span className="pink-gradient-text text-[1.44vw] leading-none">
										✓
									</span>
								)}
							</div>
							<span className="galindo pink-outlined-text text-[2.4vw] leading-snug">
								Check this box if you are comfortable being the Point of Contact
								for your city.
							</span>
						</div>
						<p className="outfit font-bold text-[#359BBF] text-[1.92vw] leading-relaxed mt-[1.5vh] ml-[5.3vw]">
							This would include being the &ldquo;lead organizer&rdquo; of your
							group, being responsible for completing weekly check-ins, and
							attending pre-event support calls and being the main point of
							contact for your city.
						</p>
					</div>

					<ApplicationPreview />

					<div className="flex justify-center mt-[8vh]">
						<button
							type="button"
							onClick={handleSubmit}
							disabled={submitting}
							className="hover:scale-105 transition-transform cursor-pointer bg-transparent border-none p-0 disabled:opacity-60 disabled:cursor-not-allowed"
							style={{ width: "30vw" }}
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
