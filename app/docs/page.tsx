type StepProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  step: number;
};

export default function Docs() {}

export function UltimateOrganizerGuideOnboarding({ setStep, step }: StepProps) {
  return (
    <>
      <h2>placeholder... look! a super detailed guide!</h2>
      <button onClick={() => {setStep(3);}}>IM DONE READING</button>
    </>
  );
}
