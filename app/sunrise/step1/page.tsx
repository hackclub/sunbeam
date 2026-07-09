import SunriseStepPage from "../_components/SunriseStepPage";
import { getSunriseStep } from "../_lib/steps";

export default function SunriseStep1Page() {
	const step = getSunriseStep("step1");

	if (!step) {
		throw new Error("Sunrise step1 configuration is missing.");
	}

	return <SunriseStepPage step={step} />;
}
