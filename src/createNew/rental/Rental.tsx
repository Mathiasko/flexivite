import { Box, Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useState } from "react";
import { SelectCustomer } from "../customer/SelectCustomer";
import { SelectRentalBicycle } from "./SelectRentalBicycle";
import { SelectPeriod } from "./SelectPeriod";
import { RentalSummary } from "./RentalSummary";

export const Rental = () => {
	const steps = ["Customer", "Bicycle", "Tasks & Parts", "Summary"];
	const [activeStep, setActiveStep] = useState(0);
	const [endDate, setEndDate] = useState(new Date());
	const [price, setPrice] = useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const stepContents = [
		<SelectCustomer />,
		<SelectRentalBicycle />,
		<SelectPeriod endDate={endDate} setEndDate={setEndDate} price={price} setPrice={setPrice} />,
		<RentalSummary endDate={endDate} price={price} />,
	];

	return (
		<Box>
			<Typography variant="h4" marginBottom={4}>
				New Rental
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
};
