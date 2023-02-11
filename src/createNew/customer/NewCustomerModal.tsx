//@ts-nocheck
import React, { useState } from "react";
import { Box, Button, CircularProgress, Modal, TextField, Typography } from "@mui/material";
import { useMutation } from "@apollo/client";
import { NEW_CUSTOMER } from "../../queries";
import { useStore } from "../../Store.js";

export function NewCustomerModal({ setModal }) {
	const [open, setOpen] = useState(true);
	const [customerForm, setCustomerForm] = useState({ firstName: "", lastName: "", email: "@" });
	const [createCustomer, { data, loading, error }] = useMutation(NEW_CUSTOMER);
  const selectCustomer = useStore((state) => state.selectCustomer);

	const { firstName, lastName, email } = customerForm;

	const handleClose = () => {
		setModal(false);
	};

	function handleCustomerSubmit() {
		createCustomer({ variables: { firstName, lastName, email } })
			.then(({data}) => {
				selectCustomer(data.createEditCustomer)
			})
			.catch((err) => {
				console.error(err);
			});
	}

	data && !loading ? setModal(false) : "";

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		bgcolor: "background.paper",
		border: "1px solid #111",
		boxShadow: 24,
		pt: 2,
		px: 4,
		pb: 3,
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<Box sx={{ ...style }}>
				<Typography mb={1} variant="h4">
					Create new customer
				</Typography>
				<form className="flex flex-col">
					<TextField
						sx={{ mb: 2 }}
						autoFocus
						variant={"outlined"}
						label="First Name"
						placeholder="First Name"
						value={customerForm.firstName}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setCustomerForm({ ...customerForm, firstName: e.target.value });
						}}
					/>
					<TextField
						sx={{ mb: 2 }}
						autoFocus
						variant={"outlined"}
						label="Last Name"
						placeholder="Last Name"
						value={customerForm.lastName}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setCustomerForm({ ...customerForm, lastName: e.target.value });
						}}
					/>
					<TextField
						sx={{ mb: 2 }}
						autoFocus
						variant={"outlined"}
						label="Email"
						placeholder="Email"
						value={customerForm.email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setCustomerForm({ ...customerForm, email: e.target.value });
						}}
					/>
					<Button
						variant="outlined"
						size="large"
						onClick={() => {
							handleCustomerSubmit();
						}}>
						Submit
						{loading && (
							<CircularProgress
								size={24}
								sx={{
									position: "absolute",
									color: "primary",
								}}
							/>
						)}
					</Button>
				</form>
			</Box>
		</Modal>
	);
}
