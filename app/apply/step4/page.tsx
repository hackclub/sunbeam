"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
			style={{ backgroundImage: "url('/imgs/sand.png')", backgroundRepeat: "repeat-y", backgroundSize: "100% auto" }}
		>
			<div className="relative mx-[2.5%] mt-[7vh] mb-[4vh]">
				<Image
					src="/imgs/boardwalk.png"
					fill
					alt=""
					className="pointer-events-none rounded-sm object-fill"
					sizes="95vw"
				/>

				<div className="relative z-10 w-[86%] mx-auto pt-[5vh] pb-[8vh]">
					<h1 className="galindo pink-outlined-text text-[4.2vw] leading-snug mb-[6vh]">
						Thanks! Now tell us a little bit more about your event.
					</h1>

					<div className="flex flex-col gap-[5vh]">
						<div className="flex flex-col gap-[6px]">
							<label className="galindo text-[#2E599C] text-[1.8vw] leading-tight">
								What city or region are you planning to host your Sunbeam Social in?
								<span className="outfit text-[#359BBF] text-[1.32vw] ml-1">*</span>
							</label>
							<input
								type="text"
								value={form.host_city}
								onChange={(e) => setForm((f) => ({ ...f, host_city: e.target.value }))}
								className="outfit bg-white w-[45%] px-3 py-[6px] text-[1.2vw] text-[#2E599C] border-[3px] border-[#0e387a] rounded-2xl outline-none focus:border-[#0e387a] transition-colors"
							/>
						</div>

						<div className="flex flex-col gap-[6px]">
							<label className="galindo text-[#2E599C] text-[1.8vw] leading-tight">
								How many attendees are you planning on hosting?
								<span className="outfit text-[#359BBF] text-[1.32vw] ml-1">*</span>
							</label>
							<p className="outfit text-[#359BBF] text-[1.2vw] -mt-1">(be realistic!)</p>
							<input
								type="number"
								min="1"
								value={form.expected_attendee_count}
								onChange={(e) => setForm((f) => ({ ...f, expected_attendee_count: e.target.value }))}
								className="outfit bg-white w-[45%] px-3 py-[6px] text-[1.2vw] text-[#2E599C] border-[3px] border-[#0e387a] rounded-2xl outline-none focus:border-[#0e387a] transition-colors"
							/>
						</div>

						<div className="flex items-start gap-4">
							<input
								type="checkbox"
								checked={form.different_to_home_address}
								onChange={(e) => setForm((f) => ({ ...f, different_to_home_address: e.target.checked }))}
								className="mt-1 w-[1.8vw] h-[1.8vw] flex-shrink-0 cursor-pointer accent-[#F393B4]"
							/>
							<span className="galindo pink-outlined-text-sm text-[1.8vw] leading-snug">
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
							<Image src="/imgs/surfboard_next3.png" width={865} height={320} alt="next!" className="w-full h-auto" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
