import Image from "next/image";
import Link from "next/link";
import { sunriseSteps, type SunriseStep } from "../_lib/steps";

const URL_REGEX =
	/(https?:\/\/[^\s]+)|((?:[a-z0-9-]+\.){2,}[a-z]{2,}(?:\/[^\s]*)?)/gi;

function linkifyChecklistItem(text: string) {
	const parts: React.ReactNode[] = [];
	let lastIndex = 0;
	let match: RegExpExecArray | null;

	URL_REGEX.lastIndex = 0;
	while ((match = URL_REGEX.exec(text)) !== null) {
		if (match.index > lastIndex) {
			parts.push(text.slice(lastIndex, match.index));
		}
		const url = match[0];
		const href = url.startsWith("http") ? url : `https://${url}`;
		parts.push(
			<a
				key={match.index}
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className="underline text-[#0e387a] hover:text-[#d88127]"
			>
				{url}
			</a>,
		);
		lastIndex = match.index + url.length;
	}
	if (lastIndex < text.length) {
		parts.push(text.slice(lastIndex));
	}
	return parts;
}

function ProgressBar({ currentStep }: { currentStep: number }) {
	const totalSteps = sunriseSteps.length;
	const percent = Math.round((currentStep / totalSteps) * 100);

	return (
		<div className="w-[97.5%] mx-auto rounded-[1vh] border-[0.15vh] border-amber-400 bg-[#ffffff] px-4 py-3 shadow-[0_8px_20px_rgba(14,56,122,0.2)]">
			<div className="flex items-center justify-between mb-2">
				<p className="outfit text-[17px] text-[#0e387a] font-semibold">
					Step {currentStep} of {totalSteps}
				</p>
				<p className="outfit text-[17px] text-[#0e387a] font-semibold">
					{percent}%
				</p>
			</div>
			<div className="h-2.5 w-full rounded-full bg-[#c0e5f2] border-[0.15vh] border-[#0e387a] overflow-hidden">
				<div
					className="h-full bg-[#359bbf] transition-all duration-500"
					style={{ width: `${percent}%` }}
				/>
			</div>
		</div>
	);
}

export default function SunriseStepPage({ step }: { step: SunriseStep }) {
	const previousStep = sunriseSteps[step.id - 2];
	const nextStep = sunriseSteps[step.id];

	return (
		<div
			className="relative h-screen overflow-hidden"
			style={{
				backgroundImage: "url('/imgs/sand.webp')",
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<a
				href={previousStep ? `/sunrise/${previousStep.slug}` : "/sunrise"}
				className="fixed z-20 top-0 left-0 bg-white/70 border-[0.2vh] border-white py-[0.8vh] px-[2vw] rounded-br-[2.5vh]"
			>
				<span className="text-[1.8vh] outfit">{"<-"} Back</span>
			</a>

			<Image
				src="/imgs/ray1.webp"
				width={356}
				height={267}
				alt=""
				className="absolute z-0 pointer-events-none top-[9vh] right-[2vw] w-[13vw] h-auto max-w-[130px]"
			/>

			<main className="relative z-10 h-full w-full px-[3vw] pt-[5vh] pb-[2vh]">
				<div className="mx-auto h-full max-w-[80vw] flex flex-col gap-[1.6vh]">
					<ProgressBar currentStep={step.id} />

					<div className="relative flex-1 min-h-0">
						<Image
							src="/imgs/boardwalk.webp"
							fill
							alt=""
							priority
							className="pointer-events-none rounded-md object-fill"
							sizes="95vw"
						/>
						<div className="relative h-full min-h-0 px-[3vw] py-[2.2vh] flex flex-col gap-[1.2vh]">
							<div className="flex items-center justify-between gap-4">
								<h1 className="galindo pink-outlined-text text-[clamp(2rem,3.2vw,3rem)] leading-tight">
									{step.title}
								</h1>
								<p className="outfit text-[clamp(1rem,1.45vw,1.2rem)] text-[#0e387a] bg-white/70 px-3 py-1 rounded-full whitespace-nowrap">
									{step.estimatedTime}
								</p>
							</div>

							<p className="outfit text-[clamp(1.15rem,1.6vw,1.4rem)] text-[#2e599c] leading-tight">
								{step.goal}
							</p>

							{step.congratsMessage && (
								<div
									className="rounded-xl px-4 py-2 border border-[#0e387a2f]"
									style={{
										backgroundImage: "url('/imgs/planks-pink-h.webp')",
										backgroundSize: "cover",
										backgroundPosition: "center",
									}}
								>
									<p className="outfit text-[clamp(1rem,1.35vw,1.15rem)] text-[#2e599c] font-semibold">
										{step.congratsMessage}
									</p>
								</div>
							)}

							<div className="flex gap-[1.2vw] min-h-0">
								<section className="rounded-xl bg-white/65 border border-[#0e387a33] px-4 py-3 w-[30%]">
									<h2 className="galindo text-[clamp(1.2rem,1.7vw,1.6rem)] text-[#d88127] mb-2">
										Quick checklist
									</h2>
									<ul className="space-y-[1vh]">
										{step.checklist.map((item) => (
											<li
												key={item}
												className="outfit text-[2.25vh] text-[#1f2a44] leading-tight"
											>
												• {linkifyChecklistItem(item)}
											</li>
										))}
									</ul>
								</section>

								<section className="rounded-xl bg-[#0e1b35f0] border border-[#f7fbff66] px-4 py-3 min-h-0 flex flex-col w-[70%]">
									{/* 	<h2 className="galindo text-[clamp(1.2rem,1.7vw,1.6rem)] text-[#fee48b] mb-2">
										What it should look like
									</h2> */}
									{step.screenshot ? (
										<div className="relative flex-1 min-h-0 rounded-lg overflow-hidden w-full">
											<img
												src={step.screenshot}
												alt={`Preview of ${step.title}`}
												className="object-contain min-w-[20vw]"
											/>
										</div>
									) : (
										<div className="flex-1 min-h-0 rounded-lg border-2 border-dashed border-[#cbe4ff66] bg-[#0a1730] flex flex-col items-center justify-center gap-2 py-6">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												className="w-[clamp(1.8rem,2.6vw,2.4rem)] h-auto text-[#cbe4ff99]"
											>
												<rect
													x="3"
													y="4"
													width="18"
													height="14"
													rx="2"
													stroke="currentColor"
													strokeWidth="1.5"
												/>
												<circle cx="8.5" cy="9" r="1.5" fill="currentColor" />
												<path
													d="M3 15l5-4 4 3.5L17 9l4 4.5"
													stroke="currentColor"
													strokeWidth="1.5"
												/>
											</svg>
											<p className="outfit text-[clamp(0.85rem,1.05vw,0.98rem)] text-[#cbe4ff99]">
												Screenshot placeholder
											</p>
										</div>
									)}
								</section>
							</div>

							<div className="mt-auto flex items-center justify-center gap-[3vw]">
								{/* 	<Link
									href={
										previousStep ? `/sunrise/${previousStep.slug}` : "/sunrise"
									}
									className="hover:scale-105 transition-transform"
								>
									<Image
										src="/imgs/surfboard_home.webp"
										width={523}
										height={210}
										alt="Back"
										className="w-[13vw] min-w-[130px] h-auto"
									/>
								</Link> */}

								<Link
									href={nextStep ? `/sunrise/${nextStep.slug}` : "/sunrise"}
									className="hover:scale-105 transition-transform"
								>
									<Image
										src="/imgs/surfboard_next.webp"
										width={1031}
										height={382}
										alt={nextStep ? "next!" : "finish"}
										className="w-[16vw] min-w-[150px] h-auto"
									/>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
