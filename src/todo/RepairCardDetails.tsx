import React, { useState } from "react";
import { Autocomplete, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { CheckListProduct } from "./CheckListProduct";
import { formatDate } from "../helper/dateConversion";
import { useStore } from "../Store.js";
import { repairInterface } from "../Interfaces";
import { CheckListTask } from "./CheckListTask";
import { useMutation } from "@apollo/client";
import { TAKE_REPAIR } from "../queries";

const Pay = ({ id }: { id: string }) => {
	const [returnRepair] = useMutation(TAKE_REPAIR);

	return (
		<Button
			size="large"
			sx={{ alignSelf: "center", marginLeft: 2 }}
			variant="contained"
			onClick={() =>
				returnRepair({
					variables: {
						id: id,
						status: "e8f93e09-851a-4c24-adda-07867725ca81",
						dateReturned: new Date(),
						fkPaymentMethod: 1,
					},
				})
			}>
			Pay now
		</Button>
	);
};

export const RepairCardDetails = () => {
	const {
		number,
		bicycle,
		comment,
		id,
		customer,
		status,
		takenBy,
		technician,
		createdAt,
		productInvoiceLines,
		taskInvoiceLines,
	}: repairInterface = useStore((state) => state?.selectedRepair);

	const repairDone = status.id === "0c3abf0e-a548-445b-8323-e3f580d54a84" ? true : false;
	const [paymentMethod, setPaymentMethod] = useState(0);

	return (
		<Container className="box-shadow" sx={{ backgroundColor: "#F5F5F5", borderRadius: "10px" }}>
			<Box maxHeight={"80vh"} overflow={"auto"}>
				<Typography variant="h5" paddingY={2}>
					Repair No.: <strong>{number}</strong>
				</Typography>
				<Grid container columns={6} columnSpacing={5} rowSpacing={6} paddingBottom={3}>
					<Grid item xs={2}>
						<Typography>
							Date: <strong>{formatDate(createdAt)}</strong>
						</Typography>
						<Typography>
							Taken by: <strong>{technician?.name}</strong>
						</Typography>
						<Typography>
							Status: <strong>{status?.value}</strong>
						</Typography>
						<Typography variant="h5" marginTop={2}>
							Customer
						</Typography>
						<Typography variant="h6">
							<strong>{customer.fullName}</strong>
						</Typography>
						<Typography>{customer.email}</Typography>
					</Grid>
					<Grid item xs={2}>
						<Typography variant="h5">Bicycle</Typography>
						<Typography>
							Brand: <strong>{`${bicycle.brand.value}`}</strong>
							<br />
							Type: <strong>{`${bicycle.type}`}</strong>
							<br />
							Color: <strong>{`${bicycle.color.value}`}</strong>
						</Typography>
					</Grid>
					<Grid item xs={2}>
						<TextField
							id="outlined-basic"
							label="Comment"
							disabled={repairDone}
							placeholder="Ved uz nieco napis"
							variant="outlined"
							rows={4}
							fullWidth={true}
							margin={"dense"}
							multiline
						/>
					</Grid>
					<Grid item xs={3} sx={{ maxWidth: "100px" }}>
						<Box
							className={"box-shadow_sm"}
							sx={{ backgroundColor: "white" }}
							padding={2}
							borderRadius={2}>
							<Typography marginBottom={2}>Tasks:</Typography>
							<CheckListTask taskInvoiceLines={taskInvoiceLines} />
						</Box>
					</Grid>
					<Grid item xs={3}>
						<Box
							className={"box-shadow_sm"}
							sx={{ backgroundColor: "white" }}
							padding={2}
							borderRadius={2}>
							<Typography marginBottom={2}>Parts:</Typography>
							<CheckListProduct productInvoiceLines={productInvoiceLines} />
						</Box>
					</Grid>
				</Grid>
				{repairDone ? (
					<Box display={"flex"}>
						<Autocomplete
							disablePortal
							options={[
								{ label: "Bank Transfer", id: 4 },
								{ label: "Cash", id: 1 },
								{ label: "Card", id: 3 },
								{ label: "MobilePay", id: 2 },
							]}
							renderOption={(props, option) => {
								return (
									<Box bgcolor={"#eee"} borderRadius={2} p={1} m={1} {...props}>
										{option.label}
									</Box>
								);
							}}
							sx={{ width: 300, mb: 2 }}
							onChange={(event: any, value: { id: number; label: string }) => {
								setPaymentMethod(value.id);
							}}
							renderInput={(props) => (
								<TextField variant={"outlined"} {...props} label="Payment Method" />
							)}
						/>
						{paymentMethod > 0 ? <Pay id={id} /> : ""}
					</Box>
				) : (
					""
				)}
			</Box>
		</Container>
	);
};
