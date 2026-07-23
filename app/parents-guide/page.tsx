import Link from "next/link";
import type { ReactNode } from "react";

function Section({
	title,
	children,
}: {
	title: string;
	children: ReactNode;
}) {
	return (
		<div style={{ padding: "0 7.2%", marginBottom: "4vh" }}>
			<h2
				className="galindo"
				style={{ fontSize: "2vw", color: "#359BBF", marginBottom: "1.5vh" }}
			>
				{title}
			</h2>
			<div
				className="outfit"
				style={{ fontSize: "1.15vw", color: "#0E387A", lineHeight: 1.7 }}
			>
				{children}
			</div>
		</div>
	);
}

export default function ParentsGuide() {
	return (
		<div
			className="outfit w-full min-h-screen"
			style={{
				backgroundColor: "rgb(250,240,212)",
				backgroundImage: "url('/imgs/sandNoFade.webp')",
				backgroundSize: "100% auto",
				backgroundRepeat: "repeat-y",
			}}
		>
			{/* back btn */}
			<div style={{ position: "relative" }}>
				<p
					className="galindo"
					style={{
						position: "absolute",
						top: 10,
						left: 20,
						fontSize: "2.5vw",
						color: "#D88127",
						lineHeight: 1.2,
					}}
				>
					<Link href="/">Back</Link>
				</p>
				<Link href="/" style={{ position: "absolute", top: 10, right: 20 }}>
					<img
						src="/imgs/sunbeam.webp"
						alt="Sunbeam"
						style={{ width: "12vw", maxWidth: "160px" }}
					/>
				</Link>
			</div>

			{/* title */}
			<div className="text-center pt-[6vh] pb-[10vh]">
				<p
					className="galindo"
					style={{ fontSize: "2.91vw", color: "#359BBF", lineHeight: 1.2 }}
				>
					Parents Guide
				</p>
			</div>

			<Section title="What is Hack Club?">
				<p style={{ marginBottom: "1.5vh" }}>
					Hack Club (
					<a
						href="https://hackclub.com"
						target="_blank"
						rel="noopener noreferrer"
						className="underline font-semibold"
					>
						hackclub.com
					</a>
					) is a 501(c)(3) non-profit organization, founded in 2014, with a
					mission to foster a wholesome generation of technologists, builders,
					founders, and engineers. At Hack Club, young people build the
					agency, network, and technical talent to think big and do big
					things in the world.
				</p>
				<p style={{ marginBottom: "1.5vh" }}>
					<span className="font-semibold">
						Hack Club programs are free and accessible to all students
					</span>{" "}
					thanks to the support of numerous donors. Hack Club is supported by
					many notable figures in the tech industry, including AMD CEO Dr.
					Lisa Su, Dell Founder &amp; CEO Michael Dell, as well as executives
					at Apple, Facebook, Microsoft, and GitHub.
				</p>
				<p style={{ marginBottom: "1.5vh" }}>
					Some prior Hack Club programs, made by and for teenagers, include:
				</p>
				<ul style={{ listStyleType: "disc", paddingLeft: "1.5em" }}>
					<li style={{ marginBottom: "1vh" }}>
						<a
							href="https://www.youtube.com/watch?v=7K_E7tG-O68&t=21s"
							target="_blank"
							rel="noopener noreferrer"
							className="font-semibold underline"
						>
							Parthenon
						</a>{" "}
						— Largest all girls high school hackathon in Nov 2025 in New York
						City.
					</li>
					<li style={{ marginBottom: "1vh" }}>
						<a
							href="https://www.youtube.com/watch?v=FIyDH5dm5eo"
							target="_blank"
							rel="noopener noreferrer"
							className="font-semibold underline"
						>
							Sleepover
						</a>{" "}
						— All girls 3 day hackathon in April 2026 in Chicago.
					</li>
					<li style={{ marginBottom: "1vh" }}>
						<a
							href="https://www.youtube.com/watch?v=0aMAHuLxg3s"
							target="_blank"
							rel="noopener noreferrer"
							className="font-semibold underline"
						>
							Campfire
						</a>{" "}
						— A game-jam across 200+ cities around the world, followed by a
						flagship hackathon in Los Angeles in Feb 2026.
					</li>
				</ul>
				<p style={{ marginTop: "1.5vh" }}>
					You can see documentaries and videos about our events on{" "}
					<a
						href="https://www.youtube.com/@HackClubHQ"
						target="_blank"
						rel="noopener noreferrer"
						className="underline font-semibold"
					>
						our YouTube channel
					</a>
					.
				</p>
			</Section>

			<Section title="What is Sunbeam?">
				<p style={{ marginBottom: "1.5vh" }}>
					Sunbeam is a string of 20+ girls-only social coding events by Hack
					Club&apos;s Athena. Our mission is to empower more girls with tech
					literacy. In our day-long event, girls will come together to code
					their own project, meet other girls in tech, and have fun. Every
					satellite event will have staff and mentors throughout the event to
					help the attendees.
				</p>
			</Section>

			<Section title="Who can attend?">
				<p>
					Sunbeam Social is open to girls and girl-identifying students aged
					13–18, regardless of experience level. Beginners are welcome and we
					will provide workshops, mentorship, and support to help every
					participant get started.
				</p>
			</Section>

			<Section title="Why should one attend Sunbeam?">
				<p>
					Building something from scratch is life changing. For many teens,
					it is the turning point that sparks a lifelong love of building.
					Sunbeam gives teens the chance to meet like-minded girls, work on
					ambitious projects, and share their learning with other peers. Hack
					Club alumni have gone on to lead venture-backed startups, take on
					engineering roles at companies like Apple, Meta, Google, Netflix,
					and Uber, and build meaningful careers in technology.
				</p>
			</Section>

			<Section title="What are the costs associated?">
				<p>
					Participation in Sunbeam is free for all attendees thanks to the
					support of our sponsors and donors.
				</p>
			</Section>

			<Section title="Date and location">
				<p>
					Hack Club Sunbeam is happening in 20+ cities around the world on
					Aug 29, 2026. Specific details about your city&apos;s Sunbeam
					location will be updated on the website.
				</p>
			</Section>

			<Section title="What to bring">
				<ul style={{ listStyleType: "disc", paddingLeft: "1.5em" }}>
					<li style={{ marginBottom: "1vh" }}>
						A form of identification (School ID, driving license, passport,
						etc)
					</li>
					<li style={{ marginBottom: "1vh" }}>
						Laptop (and charger). We will have an adequate number of power
						strips / outlets.
					</li>
					<li style={{ marginBottom: "1vh" }}>Water bottle</li>
					<li>Medication, if applicable</li>
				</ul>
			</Section>

			<Section title="Safety and Youth Protection">
				<p style={{ marginBottom: "1.5vh" }}>
					Hack Club is committed to creating a safe and comfortable
					environment for everyone at our events. You can always reach us at{" "}
					<a
						href="mailto:sunbeam@hackclub.com"
						className="underline font-semibold"
					>
						sunbeam@hackclub.com
					</a>
					. During the event, a toll-free staff hotline (
					<a href="tel:+18556254225" className="underline font-semibold">
						+1 855-625-HACK
					</a>
					) will be available 24/7 for you to contact us if needed.
				</p>
				<p>
					Access to the venue will be limited to event staff and participants
					with ID checks. Students will not be able to leave the venue
					without consent from a parent or guardian. Security will be present
					24/7 around the venue with staff on site at all times to supervise.
					Hack Club events are safe spaces for all students. More details can
					be found at{" "}
					<a
						href="https://hackclub.com/safeguarding"
						target="_blank"
						rel="noopener noreferrer"
						className="underline font-semibold"
					>
						hackclub.com/safeguarding
					</a>
					.
				</p>
			</Section>

			<Section title="Code of Conduct and Participant Behaviour">
				<p style={{ marginBottom: "1.5vh" }}>
					Just like all of our programs, Hack Club Sunbeam follows our{" "}
					<a
						href="https://hackclub.com/conduct"
						target="_blank"
						rel="noopener noreferrer"
						className="underline font-semibold"
					>
						Code of Conduct
					</a>
					. Kindness is a core Hack Club value, and we expect our participants
					to be kind, lead with empathy, and be proactive with helping others
					around them.
				</p>
				<p style={{ marginBottom: "1.5vh" }}>
					Participants are explicitly prohibited from actions including, but
					not limited to: harassment; assault; battery; sexual misconduct;
					possession or consumption of tobacco, e-cigarettes, alcohol,
					marijuana, or any other controlled substance, regardless of age.
				</p>
				<p style={{ marginBottom: "1vh" }}>
					Consequences of violation of this policy include, but are not
					limited to:
				</p>
				<ul style={{ listStyleType: "disc", paddingLeft: "1.5em" }}>
					<li style={{ marginBottom: "1vh" }}>Removal from event.</li>
					<li style={{ marginBottom: "1vh" }}>
						Ban from future Hack Club events, other Hack Club programs, or
						engagement in Hack Club altogether.
					</li>
					<li>
						Hack Club reserves the right to notify law enforcement in case of
						any conduct violations. Our priority is always to remove the bad
						actor ASAP and protect our participants.
					</li>
				</ul>
			</Section>

			<Section title="Caffeine Policy">
				<p>
					Caffeine may be available at the event, and may be in multiple
					forms including coffee, tea, and energy drinks. Caffeine is
					perfectly healthy when consumed in moderation; however, excessive
					caffeine consumption can be harmful and cause several side effects.
					We expect parents to set boundaries on how much caffeine is okay
					for their child to consume.
				</p>
			</Section>

			<Section title="Youth Protection Plan">
				<p style={{ marginBottom: "1.5vh" }}>
					To ensure the safety and wellbeing of all participants, we have
					developed a comprehensive Youth Protection Plan that outlines the
					procedures and policies in place to protect our youth participants.
					All full time Hack Club staff and volunteers are background checked
					and have safety training.
				</p>
				<p style={{ marginBottom: "1vh" }}>
					Additionally, all staff members are required to complete the Hack
					Club Youth Protection Training program. This training ensures that
					all individuals are knowledgeable about:
				</p>
				<ul style={{ listStyleType: "disc", paddingLeft: "1.5em" }}>
					<li style={{ marginBottom: "1vh" }}>
						Recognizing signs of abuse and neglect.
					</li>
					<li style={{ marginBottom: "1vh" }}>
						Appropriate and inappropriate behavior.
					</li>
					<li style={{ marginBottom: "1vh" }}>
						Procedures for reporting suspected abuse or misconduct.
					</li>
					<li>Strategies for maintaining a safe and inclusive environment.</li>
				</ul>
			</Section>

			<Section title="Participant Registration and Parental Consent">
				<p>
					In order to attend a Sunbeam social coding event,{" "}
					<span className="font-semibold">
						everyone under the age of 18 must have a consent form and
						liability waiver signed by their parent or legal guardian
					</span>
					. We will collect emergency contact information and medical
					information including dietary preferences, allergies, etc through
					the Attend platform.
				</p>
			</Section>

			<Section title="Contact Information">
				<p style={{ marginBottom: "1.5vh" }}>
					If you have any further inquiries, please reach out to{" "}
					<a
						href="mailto:sunbeam@hackclub.com"
						className="underline font-semibold"
					>
						sunbeam@hackclub.com
					</a>
					. Further options for reaching out will be communicated closer to
					the event.
				</p>
				<p>
					During the event, you can call our 24/7 hotline (
					<a href="tel:+18556254225" className="underline font-semibold">
						+1 855-625-HACK
					</a>
					) to speak to a staff member immediately. We look forward to
					welcoming your child to Hack Club Sunbeam Satellite events!
				</p>
			</Section>

			{/* ── FOOTER ── */}
			<div className="relative min-h-[80vh] w-full flex flex-col pt-[23vh] z-10">
				<div className="absolute top-[8vh] left-0 right-0 bottom-0 overflow-hidden">
					<img
						src="/imgs/water2.webp"
						className="w-full h-full object-cover object-top"
						alt=""
					/>
				</div>
				<img
					src="/imgs/foam-fixed2.png"
					alt=""
					className="hidden md:block md:absolute top-[-7vh] left-0 z-10 w-full"
				/>
				<img
					src="/imgs/ray2.webp"
					className="hidden md:absolute bottom-[2vh] right-0 z-5 w-[20vw]"
					alt=""
				/>

				<div className="relative z-5 flex flex-col">
					{/* Footer headline */}
					<h3 className="outfit text-[#FBF6E7]/90 font-semibold text-[5.5vh] text-center">
						made with <b className="text-[#FFC7DA]">♡</b> by{" "}
						<a
							href="https://athena.hackclub.com"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:underline"
						>
							Hack Club Athena
						</a>{" "}
						Team
					</h3>

					{/* Nav + description */}
					<div className="flex flex-col md:flex-row gap-[8vw] mt-[6vh] px-[5.3%]">
						{/* Left nav */}
						<div className="flex flex-row md:flex-col gap-[1.2vh] shrink-0">
							{[
								{ label: "Hack Club", href: "https://hackclub.com" },
								{ label: "Slack", href: "https://hackclub.com/slack" },
								{ label: "Athena", href: "https://athena.hackclub.com" },
								{ label: "Clubs", href: "https://hackclub.com/clubs" },
								{
									label: "Code of Conduct",
									href: "https://hackclub.com/conduct",
								},
							].map(({ label, href }) => (
								<a
									key={label}
									href={href}
									target={href !== "#" ? "_blank" : undefined}
									rel="noopener noreferrer"
									className="galindo text-black/50 md:text-[#D5F0E8] text-[3vw] md:text-[1.8vw] hover:underline leading-tight"
								>
									{label}
								</a>
							))}
						</div>

						{/* Right description */}
						<p className="outfit text-black/60 md:text-[#FAF0D3] text-[2.75vw] md:text-[1.5vw] leading-relaxed max-w-[80vw] md:max-w-[60vw]">
							Hack Club is a 501(c)(3) nonprofit and network of 60k+ technical
							high schoolers. We believe you learn best by building so
							we&apos;re creating community and providing grants so you can make
							awesome projects. In the past few years, we&apos;ve partnered with
							GitHub to run&nbsp;Summer of Making, hosted the&nbsp;world&apos;s
							longest hackathon on land, and ran&nbsp;Canada&apos;s largest high
							school hackathon.
							<br />
							<br />
							At Hack Club, students are building real projects every single
							day.
						</p>
					</div>

					{/* Copyright */}
					<p className="outfit text-[#FCF7E8] text-[0.75vw] mt-[4vh] text-center">
						© 2026 Hack Club. 501(c)(3) nonprofit (EIN: 81-2908499)
					</p>
				</div>
			</div>
		</div>
	);
}
