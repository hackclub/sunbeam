"use client";

import "../globals.css";
import { useState } from "react";
import NextButton from "../../components/NextButton";
import { UltimateOrganizerGuideOnboarding } from "../docs/page";
import Link from "next/link";
type StepProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  step: number;
};

export default function ApplicationForm() {
  const [step, setStep] = useState(0);

  return (
    <div>
      {/* so you want to org a sunbeam */}
      {step === 0 && <Page1 setStep={setStep} step={step} />}
      {step === 1 && <ReadGuide setStep={setStep} step={step} />}
      {step === 2 && (
        <UltimateOrganizerGuideOnboarding setStep={setStep} step={step} />
      )}
      {step >= 3 && <Form setStep={setStep} step={step} />}
    </div>
  );
}

export function Page1({ setStep }: StepProps) {
  return (
    <div
      className="overflow-hidden"
      style={{
        backgroundImage: 'url("/imgs/sand.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      {/* water + foam */}
      <div className="">
        <div className="absolute inset-0 h-[33vh] overflow-hidden">
          <img
            src="/imgs/water.png"
            className="w-full h-full object-cover object-bottom animate-[2s_infinite_alternate_ease-in-out_waveShift]"
            alt=""
          />
        </div>

        <img
          src="/imgs/foam.png"
          className="absolute bottom-[62vh] lg:bottom-[50vh] left-0 z-5 w-screen animate-[2s_infinite_alternate_ease-in-out_waveShift]"
          alt=""
        />
      </div>

      {/* everything else */}
      <div className="absolute top-[35vh] md:top-[40vh] lg:top-[50vh] left-[50vw] transform -translate-x-1/2 translate-y-8 w-full">
        <h2 className="text-[35px] lg:text-[50px] text-center galindo text-orange-dark">
          So you want to organize a Sunbeam Social in your city...
        </h2>
        <NextButton
          onclick={() => setStep(1)}
          surfboard="/imgs/next.png"
          alt="Next Button"
        />
      </div>

      {/* ray */}
      <img
        src="/imgs/ray1.png"
        alt=""
        className="absolute bottom-[-1vh] right-[12.5%] md:right-[25%] lg:bottom-[8vh] lg:right-[10vh] transform scale-50 md:scale-100 lg:scale-140"
      ></img>
    </div>
  );
}

export function ReadGuide({ setStep }: StepProps) {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-12 ">
        <h2 className="galindo text-[35px] lg:text-[50px] text-center text-pink-bright">
          Read the ultimate organizer guide!
        </h2>
        <NextButton
          onclick={() => setStep(2)}
          surfboard="/imgs/ok.png"
          alt="OK button"
        />
      </div>
    </div>
  );
}

export function Form({ setStep, step }: StepProps) {
  return (
    <div
      style={{
        backgroundImage: 'url("/imgs/sand.png")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
      className="flex items-start"
    >
      <div
        className="flex flex-col align-center w-1/2 items-center mx-auto mt-20 p-8 min-h-150"
        style={{
          backgroundImage: 'url("/imgs/planks-pink-h.png")',
          backgroundSize: "repeat",
          backgroundPosition: "center",
        }}
      >
        <div>
          {step === 3 && <PersonalInfo />}
          {step === 4 && <EventDetails />}
          {step === 5 && <TechnicalExperience />}
          {step === 6 && <HackathonExperience />}
          {step === 7 && <Commitment setStep={setStep} step={step} />}
          {step === 8 && <ThankYou />}
        </div>
        {/* button */}
        <div className="w-50" style={{ display: step < 7 ? "flex" : "none" }}>
          <NextButton
            onclick={() => {
              if (step < 7) setStep(step + 1);
            }}
            surfboard={["/imgs/next.png", "/imgs/next-blue.png"][step % 2]}
            alt="Next Button"
          />
        </div>
      </div>
    </div>
  );
}

export function PersonalInfo() {
  return (
    <div>
      <h2>Personal Information</h2>
    </div>
  );
}

export function EventDetails() {
  return (
    <div>
      <h2>Event Details</h2>
    </div>
  );
}

export function TechnicalExperience() {
  return (
    <div>
      <h2>Technical Experience</h2>
    </div>
  );
}

export function HackathonExperience() {
  return (
    <div>
      <h2>Hackathon Experience</h2>
    </div>
  );
}

export function Commitment({ setStep, step }: StepProps) {
  return (
    <div>
      <h2>are you committed?</h2>
      <button
        onClick={() => {
          setStep(step + 1);
        }}
        className="flex mx-auto w-50 transform duration-200 hover:scale-105 hover:rotate-2 active:scale-95 active:-rotate-5"
      >
        <img src="/imgs/submit.png" alt="click to submit form" />
      </button>
    </div>
  );
}

export function ThankYou() {
  return (
    <div>
      <h2>Thank You</h2>
      <Link href="/" className="flex mx-auto w-50 transform duration-200 hover:scale-105 hover:rotate-2 active:scale-95 active:-rotate-5">
      <img src="/imgs/home-btn.png" alt="Home" className="w-50" />
      </Link>
    </div>
  );
}
