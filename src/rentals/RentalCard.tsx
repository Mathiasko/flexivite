import React from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { formatDate } from "../helper/dateConversion";
import { RentalInterface } from "../Interfaces";
import { RETURN_RENTAL } from "../queries";
import { useMutation } from "@apollo/client";

export const RentalCard = ({ rental }: { rental: RentalInterface }) => {
	const [returnRental] = useMutation(RETURN_RENTAL);
	return (
		<div>
			<Box display={"flex"}>
				<Box borderRadius={2} boxShadow={4} p={2} m={1}>
					<Typography variant="h5">Customer:</Typography>
					<Typography>{rental.customer.fullName}</Typography>
					<Typography>{rental.customer.email}</Typography>
				</Box>
				<Box borderRadius={2} boxShadow={4} p={2} m={1}>
					<Typography variant="h5">Bicycle:</Typography>
					<Typography>{rental.bicycle.brand.value}</Typography>
					<Typography>{rental.bicycle.type}</Typography>
					<Typography>{rental.bicycle.color.value}</Typography>
				</Box>
				<Box borderRadius={2} boxShadow={4} p={2} m={1}>
					<Typography variant="h5">Period:</Typography>
					<Typography>From {formatDate(rental.periodStart)} </Typography>
					<Typography>To {formatDate(rental.periodEnd)} </Typography>
				</Box>
			</Box>
			<Button
				onClick={() => {
					returnRental({ variables: { rentalId: rental.id } });
				}}>
				Return Rentall
			</Button>
		</div>
	);
};
