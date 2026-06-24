type StepProps = {
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function Docs() {}

export function UltimateOrganizerGuideOnboarding({ setStep }: StepProps) {
  return (
    <>
      <h2>placeholder... look! a super detailed guide!</h2>
      <button onClick={() => {setStep(3);}}>IM DONE READING</button>
    </>
  );
}
