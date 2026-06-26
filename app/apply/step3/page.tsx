"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Field({
	label,
	required,
	optional,
	hint,
	type = "text",
	name,
	value,
	onChange,
}: {
	label: string;
	required?: boolean;
	optional?: boolean;
	hint?: string;
	type?: string;
	name: string;
	value: string;
	onChange: (name: string, val: string) => void;
}) {
	return (
		<div className="flex flex-col gap-[4px]">
			<label className="galindo text-[#2E599C] text-[1.68vw] leading-none">
				{label}
				{required && <span className="outfit text-[#359BBF] text-[1.32vw] ml-1">*</span>}
				{optional && <span className="outfit text-[#359BBF] text-[1.14vw] ml-2">(optional)</span>}
			</label>
			{hint && <p className="outfit text-[#359BBF] text-[1.02vw] leading-snug">{hint}</p>}
			<input
				type={type}
				name={name}
				value={value}
				required={required}
				onChange={(e) => onChange(name, e.target.value)}
				className="outfit bg-white w-full px-3 py-[6px] text-[1.2vw] text-[#2E599C] border-[3px] border-[#0e387a] rounded-2xl outline-none focus:border-[#0e387a] transition-colors placeholder:text-[#b0c4de]"
			/>
		</div>
	);
}

export default function Step3() {
	const router = useRouter();
	const [form, setForm] = useState({
		email: "", first_name: "", last_name: "", preferred_name: "", phone_number: "",
		pronouns: "",
		address_line_1: "", address_line_2: "", city: "", state_province: "",
		postal_code: "", country: "", slack_id: "", date_of_birth: "",
		certified: false,
	});

	function set(name: string, val: string) {
		setForm((f) => ({ ...f, [name]: val }));
	}

	function handleNext() {
		const saved = JSON.parse(localStorage.getItem("sunbeam_app") || "{}");
		localStorage.setItem("sunbeam_app", JSON.stringify({ ...saved, ...form }));
		router.push("/apply/step4");
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
				<div className="relative z-10 w-[82%] mx-auto pt-[5vh] pb-[6vh]">
					<h1 className="galindo pink-outlined-text text-center text-[3.36vw] mb-[4vh] whitespace-nowrap">
						Sign-up to organize a Sunbeam Social now!
					</h1>

					<form className="flex flex-col gap-[2.5vh]" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
						<Field label="Email" required type="email" name="email" value={form.email} onChange={set} />
						<div className="grid grid-cols-2 gap-[8%]">
							<Field label="First Name" required name="first_name" value={form.first_name} onChange={set} />
							<Field label="Last Name" required name="last_name" value={form.last_name} onChange={set} />
						</div>
						<div className="grid grid-cols-2 gap-[8%]">
							<Field label="Preferred Name" optional name="preferred_name" value={form.preferred_name} onChange={set} />
							<Field label="Phone Number" required name="phone_number" value={form.phone_number} onChange={set} />
						</div>
						<Field label="Pronouns" hint="You must be a girl or girl identifying to organize a Sunbeam!" name="pronouns" value={form.pronouns} onChange={set} />
						<Field label="Your Address" required name="address_line_1" value={form.address_line_1} onChange={set} />
						<Field label="Address #2" optional name="address_line_2" value={form.address_line_2} onChange={set} />
						<div className="grid grid-cols-2 gap-[8%]">
							<Field label="City" required name="city" value={form.city} onChange={set} />
							<Field label="State / Province" required name="state_province" value={form.state_province} onChange={set} />
						</div>
						<div className="grid grid-cols-2 gap-[8%]">
							<Field label="ZIP / Postal Code" required name="postal_code" value={form.postal_code} onChange={set} />
							<Field label="Country" required name="country" value={form.country} onChange={set} />
						</div>
						<div className="grid grid-cols-2 gap-[8%]">
							<Field label="Slack ID" required hint="* get this from #what-is-my-slack-id" name="slack_id" value={form.slack_id} onChange={set} />
							<Field label="Date of Birth" required type="date" name="date_of_birth" value={form.date_of_birth} onChange={set} />
						</div>

						<div className="flex items-center gap-3 mt-[1vh]">
							<input
								type="checkbox"
								checked={form.certified}
								required
								onChange={(e) => setForm((f) => ({ ...f, certified: e.target.checked }))}
								className="w-[1.8vw] h-[1.8vw] flex-shrink-0 cursor-pointer accent-[#F393B4]"
							/>
							<span className="galindo pink-outlined-text-sm text-[1.56vw]">
								I certify that I will be 18 or under on August 29th
							</span>
						</div>

						<div className="flex justify-center mt-[2vh]">
							<button
								type="submit"
								className="hover:scale-105 transition-transform cursor-pointer bg-transparent border-none p-0"
								style={{ width: "22vw" }}
							>
								<Image src="/imgs/surfboard_next2.png" width={516} height={191} alt="next!" className="w-full h-auto" />
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
