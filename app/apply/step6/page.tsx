"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Step6() {
	const router = useRouter();
	const [form, setForm] = useState({
		attended_or_organized_hackathon: false,
		which_hackathons: "",
	});

	function handleNext() {
		const saved = JSON.parse(localStorage.getItem("sunbeam_app") || "{}");
		localStorage.setItem("sunbeam_app", JSON.stringify({ ...saved, ...form }));
		router.push("/apply/step7");
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
					<h1 className="galindo text-[#D88127] text-center text-[4vw] leading-tight">
						{"{first name}"}, tell us more about your previous hackathon experiences!
					</h1>

					<div className="flex items-start gap-[1.5vw] mt-[5vh]">
						<div
							onClick={() => setForm((f) => ({ ...f, attended_or_organized_hackathon: !f.attended_or_organized_hackathon }))}
							className="flex-shrink-0 w-[1.8vw] h-[1.8vw] bg-white border border-[#c8d8f0] rounded-sm cursor-pointer mt-[0.3vw] flex items-center justify-center"
						>
							{form.attended_or_organized_hackathon && (
								<span className="text-[#D88127] text-[1.2vw] leading-none">✓</span>
							)}
						</div>
						<span className="galindo text-[#F9A636] text-[2vw] leading-snug">
							Check this box if you&apos;ve attended or organized a hackathon before!
						</span>
					</div>

					<div className="flex flex-col gap-[1.2vh] mt-[5vh]">
						<label className="galindo text-[#2E599C] text-[2vw] leading-tight">
							Which hackathons did you attend or organize?
						</label>
						<textarea
							maxLength={500}
							value={form.which_hackathons}
							onChange={(e) => setForm((f) => ({ ...f, which_hackathons: e.target.value }))}
							className="outfit bg-white w-full px-4 py-3 text-[1vw] text-[#2E599C] border border-[#c8d8f0] rounded-sm outline-none focus:border-[#2E599C] transition-colors resize-none"
							style={{ height: "16vh" }}
						/>
						<p className="outfit text-[#359BBF] text-[1vw]">*max 500 characters</p>
					</div>

					<div className="flex justify-center mt-[8vh]">
						<button
							type="button"
							onClick={handleNext}
							className="hover:scale-105 transition-transform cursor-pointer bg-transparent border-none p-0"
							style={{ width: "25vw" }}
						>
							<img src="/imgs/surfboard_next4.png" className="w-full" alt="next!" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
