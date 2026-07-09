import SunriseStepPage from "../_components/SunriseStepPage";
import { getSunriseStep } from "../_lib/steps";

export default function SunriseStep4Page() {
	const step = getSunriseStep("step4");

	if (!step) {
		throw new Error("Sunrise step4 configuration is missing.");
	}

	return <SunriseStepPage step={step} />;
}
