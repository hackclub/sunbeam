"use client";

import { useState } from "react";

const participantFaqs = [
	{
		question: "I've never coded before, can I still join?",
		answer:
			"Of course! Sunbeam socials are a relaxed and supportive space for all girls with different skill levels. Workshops will help you learn everything you need.",
	},
	{
		question: "How much does it cost to attend?",
		answer:
			"Nothing. Sunbeam socials are free for participants, and we provide food, drinks, merch, and prizes.",
	},
	{
		question: "What should I bring?",
		answer:
			"Bring a laptop or iPad and anything else you like to code with, such as a charger, mouse, keyboard, or notepad.",
	},
	{
		question: "Who can join?",
		answer:
			"Any girl-identifying individual aged 13-18 (inclusive) can sign up for their local Sunbeam social.",
	},
	{
		question: "What is Hack Club?",
		answer:
			"Hack Club is a US-based charity that operates all around the world to get more young people involved in tech and coding. They've run events on an island, partnered with NASA, and hosted the world's largest all-girls high school hackathon!",
	},
	{
		question: "What is Sunbeam?",
		answer:
			"Sunbeam is a series of social coding events, for girls by girls, running simultaneously in 20+ cities around the world!",
	},
	{
		question: "Do I need to know anyone before I go?",
		answer:
			"No, you'll get to know everyone on the day of, but don't hesitate to chat to other girls in the Slack channels and bring your in-person friends along too!",
	},
	{
		question: "How do I join the Slack channels?",
		answer: (
			<>
				Click{" "}
				<a
					href="https://slack.hackclub.com/"
					style={{ textDecoration: "underline" }}
				>
					HERE
				</a>{" "}
				and join the sunbeam channels.
			</>
		),
	},
	{
		question: "What if I have allergies/dietary restrictions?",
		answer:
			"One you sign up, you'll receive a check-in form where you'll be able to let the organizers know about any health concerns and dietary requirements. We'll make sure to provide food options for everyone.",
	},
	{
		question: "Are we getting prizes?",
		answer:
			"You'll get a custom t-shirt, [company]-recognized certificate, and a bunch of other free merch just for attending! Each social will also have peer-voted winners which will get extra prizes for best project/nicest graphics/funniest ideas too!",
	},
];

export default function FaqAccordion() {
	const [openFaq, setOpenFaq] = useState<number | null>(null);

	return (
		<div className="bg-[url('/imgs/sandNoFade.webp')] relative min-h-[120vh] items-center justify-center w-full flex flex-col pt-[5vh] pb-[17.5vh] z-3 overflow-hidden">
			<img
				src="/imgs/sunbeam-photo.webp"
				className="absolute top-0 h-full w-[80vw] left-[10vw] object-cover z-5"
				alt=""
			/>

			<div className="w-[60vw] my-[8vh] flex flex-col items-center relative z-10">
				<h2 className="galindo text-[7vh] text-[#bdd3f7] blue-outlined-text drop-shadow-md drop-shadow-neutral-200 text-center leading-[6.5vh] mb-[3vh]">
					FAQ
				</h2>
				<div className="w-full bg-[#FBF6E7] border-[0.25vh] border-[#2E599C] rounded-[2vh] p-[2vh] md:p-[2.5vh]">
					{participantFaqs.map((faq, index) => {
						const isOpen = openFaq === index;
						return (
							<div
								key={faq.question}
								className={`py-[1.5vh] ${
									index !== participantFaqs.length - 1
										? "border-b-[0.15vh] border-[#2E599C33]"
										: ""
								}`}
							>
								<button
									type="button"
									onClick={() => setOpenFaq(isOpen ? null : index)}
									aria-expanded={isOpen}
									className="w-full flex items-center justify-between gap-[2vw] text-left cursor-pointer"
								>
									<h3 className="galindo text-[#C54390] text-[3vh] leading-[3.5vh]">
										{faq.question}
									</h3>
									<span
										className={`galindo text-[#C54390] text-[3vh] leading-[3.5vh] shrink-0 transition-transform duration-300 ${
											isOpen ? "rotate-180" : ""
										}`}
									>
										▾
									</span>
								</button>
								<div
									className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
										isOpen
											? "grid-rows-[1fr] opacity-100 mt-[1vh]"
											: "grid-rows-[0fr] opacity-0"
									}`}
								>
									<p className="outfit text-[#0E387A] text-[2.25vh] leading-[3vh] overflow-hidden">
										{faq.answer}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
