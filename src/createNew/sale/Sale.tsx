import { Box, Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React, { useState } from "react";
import { ProductCart } from "../common/ProductCart";
import { Products } from "../common/Products";
import { SearchProducts } from "../common/SearchProducts";
import { SelectCustomer } from "../common/SelectCustomer";
import { SaleSummary } from "../sale/SaleSummary";
import { BicycleCart } from "./BicycleCart";
import { Bicycles } from "./Bicycles";
import { SearchBicycles } from "./SearchBicycles";

const SaleProducts = ({
	buyBicycle,
	setBuyBicycle,
}: {
	buyBicycle: boolean;
	setBuyBicycle: any;
}) => {
	return (
		<>
			<Button onClick={() => setBuyBicycle(!buyBicycle)} sx={{ display: buyBicycle ? "" : "none" }}>
				Search Products
			</Button>
			<Button onClick={() => setBuyBicycle(!buyBicycle)} sx={{ display: buyBicycle ? "none" : "" }}>
				Search Bicycles
			</Button>
			{buyBicycle ? (
				<>
					<SearchBicycles />
					<BicycleCart />
				</>
			) : (
				<>
					<SearchProducts />
					<Products />
					<ProductCart />
				</>
			)}
		</>
	);
};

export const Sale = () => {
	const [activeStep, setActiveStep] = useState(0);
	const steps = ["Customer", "Products", "Summary"];
	const [buyBicycle, setBuyBicycle] = useState(false);

	const SaleBicycle = () => <></>;

	const stepContents = [
		<SelectCustomer />,
		<SaleProducts buyBicycle={buyBicycle} setBuyBicycle={setBuyBicycle} />,
		<SaleSummary />,
	];

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};
	return (
		<Box>
			<Typography variant="h4" marginBottom={4}>
				New Sale
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
