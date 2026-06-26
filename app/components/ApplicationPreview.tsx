"use client";

import { useEffect, useState } from "react";

export default function ApplicationPreview() {
	const [data, setData] = useState<Record<string, any>>({});

	useEffect(() => {
		const saved = JSON.parse(localStorage.getItem("sunbeam_app") || "{}");
		setData(saved);
	}, []);

	const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
		<div className="border-b border-[#98c9d9] pb-[1.4vh]">
			<p className="galindo text-[#2E599C] text-[1.5vw]">{label}</p>
			<p className="outfit text-[#359BBF] text-[1.2vw] whitespace-pre-wrap break-words mt-[0.4vh]">
				{value || <span className="italic">Not provided</span>}
			</p>
		</div>
	);

	return (
		<div className="mt-[6vh] bg-white/70 border-[3px] border-[#0e387a] rounded-[1.2vw] p-[2vw]">
			<h2 className="galindo pink-outlined-text text-[3vw] mb-[3vh]">
				Application Preview
			</h2>

			<div className="grid grid-cols-2 gap-[2.5vh]">
				<Row label="Host City / Region" value={data.host_city} />

				<Row
					label="Expected Attendee Count"
					value={data.expected_attendee_count}
				/>

				<Row
					label="Different From Home City"
					value={
						data.different_to_home_address === undefined
							? ""
							: data.different_to_home_address
							? "Yes"
							: "No"
					}
				/>

				<Row label="GitHub Repository" value={data.github_repo} />

				<Row label="Playable Link" value={data.playable_link} />

				<Row label="Project Information" value={data.project_information} />

				<Row label="GitHub Username" value={data.github_user} />

				<Row
					label="Previously Attended or Organized a Hackathon"
					value={
						data.attended_or_organized_hackathon === undefined
							? ""
							: data.attended_or_organized_hackathon
							? "Yes"
							: "No"
					}
				/>

				<Row label="Hackathons" value={data.which_hackathons} />
			</div>
		</div>
	);
}
