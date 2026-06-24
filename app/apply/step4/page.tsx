"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Step4() {
	const router = useRouter();
	const [form, setForm] = useState({
		host_city: "",
		expected_attendee_count: "",
		different_to_home_address: false,
	});

	function handleNext() {
		const saved = JSON.parse(localStorage.getItem("sunbeam_app") || "{}");
		localStorage.setItem("sunbeam_app", JSON.stringify({ ...saved, ...form }));
		router.push("/apply/step5");
	}

	return (
		<div
			className="relative w-full min-h-screen"
			style={{
				background:
					"linear-gradient(to bottom, rgb(234,242,233) 0%, rgb(251,246,231) 3%, rgb(250,239,211) 100%)",
			}}
		>
			<div className="relative mx-[2.5%] mt-[7vh] mb-[4vh]">
				<img
					src="/imgs/planks.png"
					className="absolute inset-0 w-full h-full object-fill pointer-events-none rounded-sm"
					alt=""
				/>

				<div className="relative z-10 w-[86%] mx-auto pt-[5vh] pb-[8vh]">
					<h1 className="galindo text-[#D88127] text-[3.5vw] leading-snug mb-[6vh]">
						Thanks! Now tell us a little bit more about your event.
					</h1>

					<div className="flex flex-col gap-[5vh]">
						<div className="flex flex-col gap-[6px]">
							<label className="galindo text-[#2E599C] text-[1.5vw] leading-tight">
								What city or region are you planning to host your Sunbeam Social in?
								<span className="outfit text-[#359BBF] text-[1.1vw] ml-1">*</span>
							</label>
							<input
								type="text"
								value={form.host_city}
								onChange={(e) => setForm((f) => ({ ...f, host_city: e.target.value }))}
								className="outfit bg-white w-[45%] px-3 py-[6px] text-[1vw] text-[#2E599C] border border-[#c8d8f0] rounded-sm outline-none focus:border-[#2E599C] transition-colors"
							/>
						</div>

						<div className="flex flex-col gap-[6px]">
							<label className="galindo text-[#2E599C] text-[1.5vw] leading-tight">
								How many attendees are you planning on hosting?
								<span className="outfit text-[#359BBF] text-[1.1vw] ml-1">*</span>
							</label>
							<p className="outfit text-[#359BBF] text-[1vw] -mt-1">(be realistic!)</p>
							<input
								type="number"
								min="1"
								value={form.expected_attendee_count}
								onChange={(e) => setForm((f) => ({ ...f, expected_attendee_count: e.target.value }))}
								className="outfit bg-white w-[45%] px-3 py-[6px] text-[1vw] text-[#2E599C] border border-[#c8d8f0] rounded-sm outline-none focus:border-[#2E599C] transition-colors"
							/>
						</div>

						<div className="flex items-start gap-4">
							<input
								type="checkbox"
								checked={form.different_to_home_address}
								onChange={(e) => setForm((f) => ({ ...f, different_to_home_address: e.target.checked }))}
								className="mt-1 w-[1.8vw] h-[1.8vw] flex-shrink-0 cursor-pointer accent-[#D88127]"
							/>
							<span className="galindo text-[#F9A636] text-[1.5vw] leading-snug">
								Is the city/region you&apos;re hosting your Sunbeam Social in different to your home city?
							</span>
						</div>
					</div>

					<div className="flex justify-center mt-[6vh]">
						<button
							type="button"
							onClick={handleNext}
							className="hover:scale-105 transition-transform cursor-pointer bg-transparent border-none p-0"
							style={{ width: "22vw" }}
						>
							<img src="/imgs/surfboard_next3.png" className="w-full" alt="next!" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
