import Image from "next/image";
import Link from "next/link";
import { sunriseSteps, type SunriseStep } from "../_lib/steps";

function ProgressBar({ currentStep }: { currentStep: number }) {
	const totalSteps = sunriseSteps.length;
	const percent = Math.round((currentStep / totalSteps) * 100);

	return (
		<div className="w-full rounded-2xl border border-[#0e387a33] bg-white/80 px-4 py-3">
			<div className="flex items-center justify-between mb-2">
				<p className="outfit text-[17px] text-[#2e599c]">
					Step {currentStep} of {totalSteps}
				</p>
				<p className="outfit text-[17px] text-[#2e599c]">{percent}%</p>
			</div>
			<div className="h-2.5 w-full rounded-full bg-[#d7e6ff] overflow-hidden">
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
				className="absolute z-0 pointer-events-none top-[9vh] right-[4vw] w-[13vw] h-auto max-w-[130px]"
			/>

			<main className="relative z-10 h-full w-full px-[3vw] pt-[5.5vh] pb-[2vh]">
				<div className="mx-auto h-full max-w-[1120px] flex flex-col gap-[1.6vh]">
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

							<div className="grid grid-cols-2 gap-[1.2vw] min-h-0">
								<section className="rounded-xl bg-white/65 border border-[#0e387a33] px-4 py-3">
									<h2 className="galindo text-[clamp(1.2rem,1.7vw,1.6rem)] text-[#d88127] mb-2">
										Quick checklist
									</h2>
									<ul className="space-y-1">
										{step.checklist.map((item) => (
											<li
												key={item}
												className="outfit text-[clamp(0.95rem,1.2vw,1.08rem)] text-[#1f2a44] leading-tight"
											>
												• {item}
											</li>
										))}
									</ul>
								</section>

								<section className="rounded-xl bg-[#0e1b35f0] border border-[#f7fbff66] px-4 py-3 min-h-0">
									<h2 className="galindo text-[clamp(1.2rem,1.7vw,1.6rem)] text-[#fee48b] mb-2">
										Starter snippet
									</h2>
									{step.codeBlocks[0] ? (
										<>
											<p className="outfit text-[clamp(0.92rem,1.15vw,1.05rem)] text-[#cbe4ff] mb-2">
												{step.codeBlocks[0].filename}
											</p>
											<pre className="outfit text-[clamp(0.78rem,0.98vw,0.95rem)] leading-tight text-[#eef6ff] whitespace-pre-wrap">
												<code>{step.codeBlocks[0].code}</code>
											</pre>
										</>
									) : (
										<p className="outfit text-[clamp(0.98rem,1.2vw,1.08rem)] text-[#eef6ff]">
											No new code here. Do your final checks and publish.
										</p>
									)}
								</section>
							</div>

							<div className="mt-auto flex items-center justify-center gap-[3vw]">
								<Link
									href={previousStep ? `/sunrise/${previousStep.slug}` : "/sunrise"}
									className="hover:scale-105 transition-transform"
								>
									<Image
										src="/imgs/surfboard_home.webp"
										width={523}
										height={210}
										alt="Back"
										className="w-[13vw] min-w-[130px] h-auto"
									/>
								</Link>

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
