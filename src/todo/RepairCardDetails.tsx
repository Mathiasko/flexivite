import React, { useEffect, useState } from "react";
import { Autocomplete, Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { CheckListProduct } from "./CheckListProduct";
import { formatDate } from "../helper/dateConversion";
import { useStore } from "../Store.js";
import { repairInterface } from "../Interfaces";
import { CheckListTask } from "./CheckListTask";
import { useMutation } from "@apollo/client";
import { EDIT_REPAIR_COMMENT, TAKE_REPAIR } from "../queries";

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
	const repair: repairInterface = useStore((state) => state?.selectedRepair);
	const setModalContent = useStore(({ setModalContent }) => setModalContent);
	const toggleModal = useStore(({ toggleModal }) => toggleModal);
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
	} = repair;
	const repairDone = status.id === "0c3abf0e-a548-445b-8323-e3f580d54a84" ? true : false;
	const [editComment] = useMutation(EDIT_REPAIR_COMMENT);
	const [paymentMethod, setPaymentMethod] = useState(0);
	const [newComment, setNewComment] = useState(comment);
	const [submitComment, setSubmitComment] = useState(true);

	useEffect(() => {
		setNewComment(comment);
	}, [comment]);

	function handleComment() {
		editComment({ variables: { id: id, comment: newComment } }).then(({ data }) => {
			setNewComment(data.editRepairComment.comment);
		});
	}

	const totalPriceTask = taskInvoiceLines.reduce((acc, obj) => {
		return acc + obj.time * 200;
	}, 0);

	const totalPriceProd = productInvoiceLines.reduce((acc, obj) => {
		return acc + obj.price * obj.amount;
	}, 0);


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
							Taken by: <strong>{takenBy?.name}</strong>
						</Typography>
						{technician ? (
							<Typography>Technician: {<strong>{technician?.name}</strong>}</Typography>
						) : (
							""
						)}
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
						<Typography marginTop={2}>Labour: {totalPriceTask} </Typography>
						<Typography>Parts: {totalPriceProd} </Typography>
						<Typography>Total: {totalPriceProd + totalPriceTask}dkk </Typography>
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
							value={newComment}
							onChange={({ target }) => {
								setNewComment(target.value);
								setSubmitComment(false);
							}}
							multiline
						/>
						<div hidden={submitComment}>
							<Button variant="outlined" size="large" onClick={() => handleComment()}>
								Save
							</Button>
						</div>
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
						{paymentMethod > 0 ? (
							<>
								<Pay id={id} />
								<Button
									onClick={() => {
										render();
									}}>
									Invoice
								</Button>
							</>
						) : (
							""
						)}
					</Box>
				) : (
					""
				)}
			</Box>
		</Container>
	);
};
