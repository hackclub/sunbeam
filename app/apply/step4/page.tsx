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
			style={{
				backgroundImage: "url('/imgs/sand.webp')",
				backgroundRepeat: "repeat-y",
				backgroundSize: "100% auto",
			}}
		>
			<a
				href="/apply/step3"
				className="fixed z-10 backdrop-blur-sm top-0 left-0 bg-white/70 border-[0.2vh] border-white py-[1vh] px-[2vw] rounded-br-[3vh]"
			>
				<span className="text-[2vh] outfit">{"<-"} Back</span>
			</a>
			<div className="relative mx-[2.5%] mt-[4vh] mb-[2vh]">
				<Image
					src="/imgs/boardwalk.webp"
					fill
					alt=""
					priority
					className="pointer-events-none rounded-sm object-fill"
					sizes="95vw"
				/>

				<div className="relative z-10 w-[86%] mx-auto pt-[3vh] pb-[4vh]">
					<h1 className="galindo pink-outlined-text text-[3vw] leading-snug mb-[3vh]">
						Thanks! Now tell us a little bit more about your event.
					</h1>

					<form
						className="flex flex-col gap-[3vh]"
						onSubmit={(e) => {
							e.preventDefault();
							handleNext();
						}}
					>
						<div className="flex flex-col gap-[6px]">
							<label className="galindo text-[#2E599C] text-[1.3vw] leading-tight">
								What city or region are you planning to host your Sunbeam Social
								in?
								<span className="outfit text-[#359BBF] text-[1vw] ml-1">*</span>
							</label>
							<input
								type="text"
								required
								value={form.host_city}
								onChange={(e) =>
									setForm((f) => ({ ...f, host_city: e.target.value }))
								}
								className="outfit bg-white w-[45%] px-3 py-[4px] text-[1vw] text-[#2E599C] border-[3px] border-[#0e387a] rounded-2xl outline-none focus:border-[#0e387a] transition-colors"
							/>
						</div>

						<div className="flex flex-col gap-[6px]">
							<label className="galindo text-[#2E599C] text-[1.3vw] leading-tight">
								How many attendees are you planning on hosting?
								<span className="outfit text-[#359BBF] text-[1vw] ml-1">*</span>
							</label>
							<p className="outfit text-[#359BBF] text-[1vw] -mt-1">
								(be realistic!)
							</p>
							<input
								type="number"
								min="1"
								required
								value={form.expected_attendee_count}
								onChange={(e) =>
									setForm((f) => ({
										...f,
										expected_attendee_count: e.target.value,
									}))
								}
								className="outfit bg-white w-[45%] px-3 py-[4px] text-[1vw] text-[#2E599C] border-[3px] border-[#0e387a] rounded-2xl outline-none focus:border-[#0e387a] transition-colors"
							/>
						</div>

						<div className="flex items-start gap-[1.5vw]">
							<div
								onClick={() =>
									setForm((f) => ({
										...f,
										different_to_home_address: !f.different_to_home_address,
									}))
								}
								className={`flex-shrink-0 w-[1.4vw] h-[1.4vw] border-[3px] border-[#0e387a] rounded-md cursor-pointer mt-[0.3vw] transition-colors ${
									form.different_to_home_address ? "bg-[#F393B4]" : "bg-white"
								}`}
							/>
							<span className="galindo text-[#2E599C] text-[1.3vw] leading-snug">
								Is the city/region you&apos;re hosting your Sunbeam Social in
								different to your home city?
							</span>
						</div>

						<div className="flex justify-center mt-[3vh]">
							<button
								type="submit"
								className="hover:scale-105 transition-transform cursor-pointer bg-transparent border-none p-0"
								style={{ width: "18vw" }}
							>
								<Image
									src="/imgs/surfboard_next3.webp"
									width={865}
									height={320}
									alt="next!"
									className="w-full h-auto"
								/>
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
