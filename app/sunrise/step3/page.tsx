import SunriseStepPage from "../_components/SunriseStepPage";
import { getSunriseStep } from "../_lib/steps";

export default function SunriseStep3Page() {
	const step = getSunriseStep("step3");

	if (!step) {
		throw new Error("Sunrise step3 configuration is missing.");
	}

	return <SunriseStepPage step={step} />;
}
