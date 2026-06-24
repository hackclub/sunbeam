"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Step5() {
	const router = useRouter();
	const [form, setForm] = useState({
		github_repo: "", playable_link: "", project_information: "", github_user: "",
	});

	function set(name: string, val: string) {
		setForm((f) => ({ ...f, [name]: val }));
	}

	function handleNext() {
		const saved = JSON.parse(localStorage.getItem("sunbeam_app") || "{}");
		localStorage.setItem("sunbeam_app", JSON.stringify({ ...saved, ...form }));
		router.push("/apply/step6");
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
					<h1 className="galindo text-[#D88127] text-[3.2vw] leading-snug mb-[5vh]">
						Tell us more about your technical experience!
					</h1>

					<div className="flex flex-col gap-[3.5vh]">
						<div className="flex flex-col gap-[2vh]">
							<p className="galindo text-[#2E599C] text-[1.5vw] leading-tight">
								Link a project that you&apos;ve built that you&apos;re proud of!
							</p>
							<div className="flex flex-col gap-[6px]">
								<label className="outfit text-[#359BBF] text-[1vw]">Github Repo *</label>
								<input type="text" value={form.github_repo} onChange={(e) => set("github_repo", e.target.value)}
									className="outfit bg-white w-full px-3 py-[7px] text-[1vw] text-[#2E599C] border border-[#c8d8f0] rounded-sm outline-none focus:border-[#2E599C] transition-colors" />
							</div>
							<div className="flex flex-col gap-[6px]">
								<label className="outfit text-[#359BBF] text-[1vw]">Playable Link *</label>
								<input type="text" value={form.playable_link} onChange={(e) => set("playable_link", e.target.value)}
									className="outfit bg-white w-full px-3 py-[7px] text-[1vw] text-[#2E599C] border border-[#c8d8f0] rounded-sm outline-none focus:border-[#2E599C] transition-colors" />
							</div>
						</div>

						<div className="flex flex-col gap-[8px]">
							<p className="galindo text-[#2E599C] text-[1.5vw] leading-tight">
								Tell us more about your project and how you built it! Feel free to include links
							</p>
							<textarea
								maxLength={500}
								rows={6}
								value={form.project_information}
								onChange={(e) => set("project_information", e.target.value)}
								className="outfit bg-white w-full px-4 py-3 text-[1vw] text-[#2E599C] border border-[#c8d8f0] rounded-sm outline-none focus:border-[#2E599C] transition-colors resize-none"
							/>
							<p className="outfit text-[#359BBF] text-[0.9vw]">*max 500 characters</p>
						</div>

						<div className="flex flex-col gap-[8px]">
							<label className="galindo text-[#2E599C] text-[1.5vw] leading-tight">
								Github Username<span className="outfit text-[#359BBF] text-[1.1vw] ml-1">*</span>
							</label>
							<input type="text" value={form.github_user} onChange={(e) => set("github_user", e.target.value)}
								className="outfit bg-white w-[45%] px-3 py-[7px] text-[1vw] text-[#2E599C] border border-[#c8d8f0] rounded-sm outline-none focus:border-[#2E599C] transition-colors" />
						</div>
					</div>

					<div className="flex justify-center mt-[6vh]">
						<button
							type="button"
							onClick={handleNext}
							className="hover:scale-105 transition-transform cursor-pointer bg-transparent border-none p-0"
							style={{ width: "22vw" }}
						>
							<img src="/imgs/surfboard_next5.png" className="w-full" alt="next!" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
