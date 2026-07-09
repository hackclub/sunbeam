import SunriseStepPage from "../_components/SunriseStepPage";
import { getSunriseStep } from "../_lib/steps";

export default function SunriseStep2Page() {
	const step = getSunriseStep("step2");

	if (!step) {
		throw new Error("Sunrise step2 configuration is missing.");
	}

	return <SunriseStepPage step={step} />;
}
