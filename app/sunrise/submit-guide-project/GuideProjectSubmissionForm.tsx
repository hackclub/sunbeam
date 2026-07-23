"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { SunriseProfile } from "./page";

interface SubmissionFormProps {
	profile: SunriseProfile;
}

export default function GuideProjectSubmissionForm({
	profile,
}: SubmissionFormProps) {
	const [formData, setFormData] = useState({
		project_name: "",
		project_description: "",
		project_link: "",
		github_repo: "",
		email: profile.email,
		first_name: profile.firstName,
		last_name: profile.lastName,
		address_line1: profile.addressLine1,
		address_line2: profile.addressLine2,
		city: profile.city,
		state_province: profile.stateProvince,
		zip_postal_code: profile.zipPostalCode,
		country: profile.country,
		birthday: profile.birthday,
		override_hours_spent: "",
	});
	const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
	const screenshotInputRef = useRef<HTMLInputElement>(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] ?? null;
		if (file && file.size > 5 * 1024 * 1024) {
			setError("Please choose an image smaller than 5 MB.");
			e.target.value = "";
			setScreenshotFile(null);
			return;
		}
		setError("");
		setScreenshotFile(file);
	};

	const readScreenshot = (file: File) =>
		new Promise<string>((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(String(reader.result).split(",")[1] || "");
			reader.onerror = () =>
				reject(new Error("Could not read the selected image"));
			reader.readAsDataURL(file);
		});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const screenshot = screenshotFile
				? {
						file: await readScreenshot(screenshotFile),
						filename: screenshotFile.name,
						contentType: screenshotFile.type,
					}
				: undefined;

			const res = await fetch("/api/submit-guide-project", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: formData.email,
					project_name: formData.project_name,
					project_description: formData.project_description,
					project_link: formData.project_link,
					github_repo: formData.github_repo,
					first_name: formData.first_name,
					last_name: formData.last_name,
					screenshot,
					address_line1: formData.address_line1,
					address_line2: formData.address_line2,
					city: formData.city,
					state_province: formData.state_province,
					zip_postal_code: formData.zip_postal_code,
					country: formData.country,
					birthday: formData.birthday,
					override_hours_spent: formData.override_hours_spent,
				}),
			});

			if (!res.ok) {
				const errorData = await res.json();
				throw new Error(errorData.error || "Failed to submit project");
			}

			setSuccess(true);
			setFormData({
				project_name: "",
				project_description: "",
				project_link: "",
				github_repo: "",
				email: profile.email,
				first_name: profile.firstName,
				last_name: profile.lastName,
				address_line1: profile.addressLine1,
				address_line2: profile.addressLine2,
				city: profile.city,
				state_province: profile.stateProvince,
				zip_postal_code: profile.zipPostalCode,
				country: profile.country,
				birthday: profile.birthday,
				override_hours_spent: "",
			});
			setScreenshotFile(null);
			if (screenshotInputRef.current) screenshotInputRef.current.value = "";
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className="relative min-h-screen overflow-hidden"
			style={{
				backgroundImage: "url('/imgs/sand4.webp')",
				backgroundRepeat: "repeat-y",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<Link
				href="/sunrise"
				className="fixed z-20 top-0 left-0 bg-white/70 border-[0.2vh] border-white py-[0.8vh] px-[2vw] rounded-br-[2.5vh]"
			>
				<span className="text-[1.8vh] outfit">{"<-"} Back</span>
			</Link>

			<main className="relative z-10 w-full px-[4vw] pt-[5vh]">
				<div className="mx-auto relative max-w-[50vw]">
					<Image
						src="/imgs/boardwalk.webp"
						fill
						alt=""
						priority
						className="pointer-events-none object-fill w-[50vw]"
						sizes="50vw"
					/>
					<div className="relative rounded-md overflow-hidden shadow-lg">
						<Image
							src="/imgs/boardwalk.webp"
							width={700}
							height={900}
							alt=""
							className="absolute inset-0 object-cover w-full h-full"
						/>
						<div className="relative z-10 px-[3vw] py-[3vh]">
							{success ? (
								<div className="flex flex-col items-center justify-center gap-[2vh] py-[4vh]">
									<div className="text-center">
										<h1 className="galindo text-[2.5rem] gradient-text mb-[1vh]">
											Success!
										</h1>
										<p className="outfit text-[1.1rem] text-[#2e599c]">
											Your project has been submitted successfully.
										</p>
									</div>
									<Link
										href="/sunrise"
										className="mt-[2vh] hover:scale-105 transition-transform"
									>
										<Image
											src="/imgs/surfboard_next.webp"
											width={900}
											height={330}
											alt="Back to Guide"
											className="w-[200px] h-auto"
										/>
									</Link>
								</div>
							) : (
								<>
									<h1 className="galindo text-[5vh] gradient-text mb-[1vh]">
										Submit Your Guide Project
									</h1>

									<form
										onSubmit={handleSubmit}
										className="flex flex-col gap-[1.5vh]"
									>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.5vh]">
											<div>
												<label className="outfit text-[0.95rem] text-[#0e387a] font-semibold block mb-[0.5vh]">
													First Name
												</label>
												<input
													type="text"
													name="first_name"
													value={formData.first_name}
													onChange={handleInputChange}
													className="w-full px-[1vh] py-[0.8vh] border border-[#0e387a33] bg-white/60 backdrop-blur-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#359bbf]"
												/>
											</div>
											<div>
												<label className="outfit text-[0.95rem] text-[#0e387a] font-semibold block mb-[0.5vh]">
													Last Name
												</label>
												<input
													type="text"
													name="last_name"
													value={formData.last_name}
													onChange={handleInputChange}
													className="w-full px-[1vh] py-[0.8vh] border border-[#0e387a33] bg-white/60 backdrop-blur-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#359bbf]"
												/>
											</div>
										</div>

										<div>
											<label className="outfit text-[0.95rem] text-[#0e387a] font-semibold block mb-[0.5vh]">
												Email
											</label>
											<input
												type="email"
												name="email"
												value={formData.email}
												onChange={handleInputChange}
												required
												className="w-full px-[1vh] py-[0.8vh] border border-[#0e387a33] bg-white/60 backdrop-blur-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#359bbf]"
											/>
										</div>

										<div>
											<label className="outfit text-[0.95rem] text-[#0e387a] font-semibold block mb-[0.5vh]">
												Project Name
											</label>
											<input
												type="text"
												name="project_name"
												value={formData.project_name}
												onChange={handleInputChange}
												required
												className="w-full px-[1vh] py-[0.8vh] border border-[#0e387a33] bg-white/60 backdrop-blur-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#359bbf]"
												placeholder="My Awesome Website"
											/>
										</div>

										<div>
											<label className="outfit text-[0.95rem] text-[#0e387a] font-semibold block mb-[0.5vh]">
												Project Description
											</label>
											<textarea
												name="project_description"
												value={formData.project_description}
												onChange={handleInputChange}
												required
												rows={4}
												className="w-full px-[1vh] py-[0.8vh] border border-[#0e387a33] bg-white/60 backdrop-blur-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#359bbf] resize-none"
												placeholder="Tell us about your project..."
											/>
										</div>

										<div>
											<label className="outfit text-[0.95rem] text-[#0e387a] font-semibold block mb-[0.5vh]">
												Project Link
											</label>
											<input
												type="url"
												name="project_link"
												value={formData.project_link}
												onChange={handleInputChange}
												required
												className="w-full px-[1vh] py-[0.8vh] border border-[#0e387a33] bg-white/60 backdrop-blur-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#359bbf]"
												placeholder="https://example.com"
											/>
										</div>

										<div>
											<label className="outfit text-[0.95rem] text-[#0e387a] font-semibold block mb-[0.5vh]">
												GitHub Repository
											</label>
											<input
												type="url"
												name="github_repo"
												value={formData.github_repo}
												required
												onChange={handleInputChange}
												className="w-full px-[1vh] py-[0.8vh] border border-[#0e387a33] bg-white/60 backdrop-blur-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#359bbf]"
												placeholder="https://github.com/username/repo"
											/>
										</div>

										<div>
											<label className="outfit text-[0.95rem] text-[#0e387a] font-semibold block mb-[0.5vh]">
												Screenshot
											</label>
											<input
												ref={screenshotInputRef}
												type="file"
												required
												accept="image/png,image/jpeg,image/webp,image/gif"
												onChange={handleScreenshotChange}
												className="w-full px-[1vh] py-[0.8vh] border border-[#0e387a33] bg-white/60 backdrop-blur-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#359bbf]"
											/>
											{screenshotFile && (
												<p className="outfit text-sm text-[#2e599c] mt-[0.5vh]">
													Selected: {screenshotFile.name}
												</p>
											)}
										</div>

										<div>
											<label className="outfit text-[0.95rem] text-[#0e387a] font-semibold block mb-[0.5vh]">
												Address Line 1
											</label>
											<input
												type="text"
												name="address_line1"
												value={formData.address_line1}
												onChange={handleInputChange}
												className="w-full px-[1vh] py-[0.8vh] border border-[#0e387a33] bg-white/60 backdrop-blur-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#359bbf]"
											/>
										</div>

										<div>
											<label className="outfit text-[0.95rem] text-[#0e387a] font-semibold block mb-[0.5vh]">
												Address Line 2 (Optional)
											</label>
											<input
												type="text"
												name="address_line2"
												value={formData.address_line2}
												onChange={handleInputChange}
												className="w-full px-[1vh] py-[0.8vh] border border-[#0e387a33] bg-white/60 backdrop-blur-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#359bbf]"
											/>
										</div>

										<div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.5vh]">
											<div>
												<label className="outfit text-[0.95rem] text-[#0e387a] font-semibold block mb-[0.5vh]">
													City
												</label>
												<input
													type="text"
													name="city"
													value={formData.city}
													onChange={handleInputChange}
													className="w-full px-[1vh] py-[0.8vh] border border-[#0e387a33] bg-white/60 backdrop-blur-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#359bbf]"
												/>
											</div>
											<div>
												<label className="outfit text-[0.95rem] text-[#0e387a] font-semibold block mb-[0.5vh]">
													State / Province
												</label>
												<input
													type="text"
													name="state_province"
													value={formData.state_province}
													onChange={handleInputChange}
													className="w-full px-[1vh] py-[0.8vh] border border-[#0e387a33] bg-white/60 backdrop-blur-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#359bbf]"
												/>
											</div>
											<div>
												<label className="outfit text-[0.95rem] text-[#0e387a] font-semibold block mb-[0.5vh]">
													ZIP / Postal Code
												</label>
												<input
													type="text"
													name="zip_postal_code"
													value={formData.zip_postal_code}
													onChange={handleInputChange}
													className="w-full px-[1vh] py-[0.8vh] border border-[#0e387a33] bg-white/60 backdrop-blur-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#359bbf]"
												/>
											</div>
											<div>
												<label className="outfit text-[0.95rem] text-[#0e387a] font-semibold block mb-[0.5vh]">
													Country
												</label>
												<input
													type="text"
													name="country"
													value={formData.country}
													onChange={handleInputChange}
													className="w-full px-[1vh] py-[0.8vh] border border-[#0e387a33] bg-white/60 backdrop-blur-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#359bbf]"
												/>
											</div>
										</div>

										<div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.5vh]">
											<div>
												<label className="outfit text-[0.95rem] text-[#0e387a] font-semibold block mb-[0.5vh]">
													Birthday
												</label>
												<input
													type="date"
													name="birthday"
													value={formData.birthday}
													onChange={handleInputChange}
													className="w-full px-[1vh] py-[0.8vh] border border-[#0e387a33] bg-white/60 backdrop-blur-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#359bbf]"
												/>
											</div>
											<div>
												<label className="outfit text-[0.95rem] text-[#0e387a] font-semibold block mb-[0.5vh]">
													Hours Spent
												</label>
												<input
													type="number"
													name="override_hours_spent"
													min="0"
													step="0.25"
													required
													value={formData.override_hours_spent}
													onChange={handleInputChange}
													className="w-full px-[1vh] py-[0.8vh] border border-[#0e387a33] bg-white/60 backdrop-blur-sm rounded-md focus:outline-none focus:ring-2 focus:ring-[#359bbf]"
												/>
											</div>
										</div>

										{error && (
											<div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-md text-sm">
												{error}
											</div>
										)}

										<button
											type="submit"
											disabled={loading}
											className="hover:scale-105 transition-transform mb-[2vh] mx-auto w-[50%] block cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
										>
											<Image
												src="/imgs/surfboard_submit.webp"
												width={200}
												height={100}
												alt={loading ? "Submitting..." : "Submit Project"}
												className="w-full h-auto"
											/>
										</button>
									</form>
								</>
							)}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
