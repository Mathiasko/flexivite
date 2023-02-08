import * as React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { SelectCustomer } from "./SelectCustomer";
import { SelectBicycle } from "./SelectBicycle";
import { useStore } from "../../Store.js";

export default function Repair() {
	const [activeStep, setActiveStep] = React.useState(0);

	const steps = ["Customer", "Bicycle", "Tasks & Parts", "Extras", "Summary"];

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setNextDisabled(true)
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const selectedBicycle = useStore((state) => state.selectedBicycle);
	const selectedCustomer = useStore((state) => state.selectedCustomer);

  const [nextDisabled, setNextDisabled] = React.useState(true)

	const stepContents = [<SelectCustomer setNextDisabled={setNextDisabled} />, <SelectBicycle setNextDisabled={setNextDisabled} />];

	return (
		<Box>
			<Typography variant="h4" marginBottom={4}>
				New Repair
			</Typography>
			<Box sx={{ width: "100%" }}>
				<Stepper activeStep={activeStep}>
					{steps.map((label) => {
						const stepProps: { completed?: boolean } = {};
						const labelProps: {
							optional?: React.ReactNode;
						} = {};
						return (
							<Step key={label} {...stepProps}>
								<StepLabel {...labelProps}>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
				{activeStep === steps.length ? (
					<React.Fragment>
						<Typography sx={{ mt: 2, mb: 1 }}>
							All steps completed - you&apos;re finished
						</Typography>
					</React.Fragment>
				) : (
					<React.Fragment>
						<Typography sx={{ mt: 2, mb: 1 }}>{stepContents[activeStep]}</Typography>
						<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
							<Button
								color="inherit"
								disabled={activeStep === 0}
								onClick={handleBack}
								sx={{ mr: 1 }}>
								Back
							</Button>
							<Box sx={{ flex: "1 1 auto" }} />
							<Button onClick={handleNext} disabled={nextDisabled}>
								{activeStep === steps.length - 1 ? "Finish" : "Next"}
							</Button>
						</Box>
					</React.Fragment>
				)}
			</Box>
		</Box>
	);
}
