//@ts-nocheck
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { SelectTaskParts } from "./SelectTaskParts";
import { SelectCustomerBike } from "./SelectCustomerBike";
import { RepairSummary } from "./RepairSummary.js";
import React, { useState } from "react";

export default function Repair() {
	const [activeStep, setActiveStep] = useState(0);

	const steps = ["Customer & Bicycle", "Tasks & Parts", "Summary"];

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const stepContents = [<SelectCustomerBike />, <SelectTaskParts />, <RepairSummary />];

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
					<>
						<Typography sx={{ mt: 2, mb: 1 }}>
							All steps completed - you&apos;re finished
						</Typography>
					</>
				) : (
					<>
						<Box sx={{ mt: 2, mb: 1 }}>{stepContents[activeStep]}</Box>
						<Box sx={{ display: "flex", flexDirection: "row", pt: 2, justifyContent: "center" }}>
							<Button
								color="inherit"
								disabled={activeStep === 0}
								onClick={handleBack}
								sx={{ mr: 1 }}>
								Back
							</Button>
							<Button onClick={handleNext}>
								{activeStep === steps.length - 1 ? "Finish" : "Next"}
							</Button>
						</Box>
					</>
				)}
			</Box>
		</Box>
	);
}
