import { notFound } from "next/navigation";
import SunriseStepPage from "../_components/SunriseStepPage";
import { getSunriseStep } from "../_lib/steps";

export default async function SunriseDynamicStepPage({
	params,
}: {
	params: Promise<{ step: string }>;
}) {
	const { step } = await params;
	const currentStep = getSunriseStep(step);

	if (!currentStep) {
		notFound();
	}

	return <SunriseStepPage step={currentStep} />;
}
