"use client";
import { useState, useEffect } from "react";
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
		<div className="flex flex-col gap-[3px]">
			<label className="galindo text-[#2E599C] text-[1.2vw] leading-none">
				{label}
				{required && <span className="outfit text-[#359BBF] text-[1vw] ml-1">*</span>}
				{optional && <span className="outfit text-[#359BBF] text-[0.9vw] ml-2">(optional)</span>}
			</label>
			{hint && <p className="outfit text-[#359BBF] text-[0.82vw] leading-snug">{hint}</p>}
			<input
				type={type}
				name={name}
				value={value}
				required={required}
				onChange={(e) => onChange(name, e.target.value)}
				className="outfit bg-white w-full px-3 py-[4px] text-[1vw] text-[#2E599C] border-[3px] border-[#0e387a] rounded-2xl outline-none focus:border-[#0e387a] transition-colors placeholder:text-[#b0c4de]"
			/>
		</div>
	);
}

export default function Step3() {
	const router = useRouter();
	const [form, setForm] = useState({
		email: "", first_name: "", last_name: "", preferred_name: "", phone_number: "",
		pronouns: "",
		hca_identity: "",
		address_line_1: "", address_line_2: "", city: "", state_province: "",
		postal_code: "", country: "", slack_id: "", date_of_birth: "",
		certified: false,
	});

	useEffect(() => {
		fetch("/api/hca-me")
			.then((r) => (r.ok ? r.json() : null))
			.then((user) => {
				if (!user) return;
				const id = user.identity ?? {};
				const addr = id.addresses ? id.addresses[0] : {};
				setForm((f) => ({
					...f,
					email:         id.primary_email   || f.email,
					first_name:    id.first_name       || f.first_name,
					last_name:     id.last_name        || f.last_name,
					slack_id:      id.slack_id         || f.slack_id,
					phone_number:  id.phone_number     || f.phone_number,
					date_of_birth: id.birthday         || id.date_of_birth || f.date_of_birth,
					address_line_1: addr.line_1 || f.address_line_1,
					address_line_2: addr.line_2          || f.address_line_2,
					city:           addr.city        || f.city,
					state_province: addr.state         || f.state_province,
					postal_code:    addr.postal_code    || f.postal_code,
					country:        addr.country        || f.country,
					hca_identity:  id.id,
					preferred_name: f.preferred_name
				}));
			});
	}, []);

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
			style={{ backgroundImage: "url('/imgs/sand.webp')", backgroundRepeat: "repeat-y", backgroundSize: "100% auto" }}
		>
			<div className="relative mx-[2.5%] mt-[4vh] mb-[2vh]">
				<Image
					src="/imgs/boardwalk.webp"
					fill
					alt=""
					priority
					className="pointer-events-none rounded-sm object-fill"
					sizes="95vw"
				/>
				<div className="relative z-10 w-[82%] mx-auto pt-[3vh] pb-[4vh]">
					<h1 className="galindo pink-outlined-text text-center text-[2.4vw] mb-[2vh] whitespace-nowrap">
						Sign-up to organize a Sunbeam Social now!
					</h1>

					<form className="flex flex-col gap-[1.5vh]" onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
						<Field label="Email" required type="email" name="email" value={form.email} onChange={set} />
						<div className="grid grid-cols-2 gap-[8%]">
							<Field label="First Name" required name="first_name" value={form.first_name} onChange={set} />
							<Field label="Last Name" required name="last_name" value={form.last_name} onChange={set} />
						</div>
						<div className="grid grid-cols-2 gap-[8%]">
							<Field label="Preferred Name" optional name="preferred_name" value={form.preferred_name} onChange={set} />
							<Field label="Phone Number" required name="phone_number" value={form.phone_number} onChange={set} />
						</div>
						<Field label="Pronouns" required hint="You must identify as a girl to organize a Sunbeam!" name="pronouns" value={form.pronouns} onChange={set} />
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

						<div className="flex items-center gap-[1.5vw] mt-[1vh]">
							<div
								onClick={() => setForm((f) => ({ ...f, certified: !f.certified }))}
								className={`flex-shrink-0 w-[1.4vw] h-[1.4vw] border-[3px] border-[#0e387a] rounded-md cursor-pointer transition-colors ${form.certified ? "bg-[#F393B4]" : "bg-white"}`}
							/>
							<span className="galindo text-[#2E599C] text-[1.2vw]">
								I certify that I will be 18 or under on August 29th
							</span>
						</div>

						<div className="flex justify-center mt-[1vh]">
							<button
								type="submit"
								className="hover:scale-105 transition-transform cursor-pointer bg-transparent border-none p-0"
								style={{ width: "18vw" }}
							>
								<Image src="/imgs/surfboard_next2.webp" width={516} height={191} alt="next!" className="w-full h-auto" />
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
