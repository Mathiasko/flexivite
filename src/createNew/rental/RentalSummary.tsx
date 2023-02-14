import React from "react";
import { useMutation } from "@apollo/client";
import { Box, Button, Typography } from "@mui/material";
import { EDIT_BICYCLE, POST_NEW_RENTAL } from "../../queries";
import { useStore } from "../../Store";

export const RentalSummary = ({ endDate, price }) => {
	const [postRental] = useMutation(POST_NEW_RENTAL);
	const [editBicycle] = useMutation(EDIT_BICYCLE);
	const salesPerson = useStore((state) => state.signedIn);
	const selectedCustomer = useStore((state) => state.selectedCustomer);
	const selectedBicycle = useStore((state) => state.selectedBicycle);
	const toggleModal = useStore((state) => state.toggleModal);

	function handleRental() {
		postRental({
			variables: {
				fkSalesPersonId: salesPerson.id,
				fkCustomerId: selectedCustomer.id,
				fkBicycleId: selectedBicycle.id,
				periodStart: new Date(),
				periodEnd: endDate,
			},
		}).then(({ data }) => {
			editBicycle({
				variables: {
					id: data.createRental.bicycle.id,
					status: "c90f571b-0cb2-4d93-99ed-8ae748ef834e", //rented out
					holder: data.createRental.customer.id,
				},
			});
		}).then(()=>{toggleModal()})
	}
	return (
		<Box>
			<Box display={"flex"}>
				<Box borderRadius={2} boxShadow={4} p={2} m={1}>
					<Typography variant="h5">Customer:</Typography>
					<Typography>{selectedCustomer.fullName}</Typography>
					<Typography>{selectedCustomer.email}</Typography>
				</Box>
				<Box borderRadius={2} boxShadow={4} p={2} m={1}>
					<Typography variant="h5">Bicycle:</Typography>
					<Typography>{selectedBicycle.brand.value}</Typography>
					<Typography>{selectedBicycle.type}</Typography>
					<Typography>{selectedBicycle.color.value}</Typography>
				</Box>
				<Box borderRadius={2} boxShadow={4} p={2} m={1}>
					<Typography variant="h5">Price:</Typography>
					<Typography >{price}dkk</Typography>
				</Box>
			</Box>

			<Button variant="outlined" color="primary" sx={{margin: '10px'}} onClick={() => handleRental()}>
				Send it
			</Button>
		</Box>
	);
};
