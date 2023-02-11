//@ts-nocheck
import React, { useState } from "react";
import {
	Autocomplete,
	Box,
	Button,
	CircularProgress,
	Modal,
	TextField,
	Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { GET_BICYCLES, GET_BICYCLE_PROPS, NEW_BICYCLE } from "../../queries";
import { useStore } from "../../Store.js";

export function NewBicycleModal({ setModal }) {
	const [open, setOpen] = useState(true);
	const [bicycleForm, setBicycleForm] = useState({});
	const selectedCustomer = useStore((state: any) => state.selectedCustomer);
	const storeBicycleProps = useStore((state: any) => state.storeBicycleProps);
	const { data: bicycleProps } = useQuery(GET_BICYCLE_PROPS);
	const [createBicycle, { data, loading }] = useMutation(NEW_BICYCLE, {
		refetchQueries: [{ query: GET_BICYCLES, variables: { customerId: selectedCustomer?.id } }],
	});

	const { color, frameNumber, type, brand, gearsystem, status, tires } = bicycleForm;

	bicycleProps?.bicycleProps ? storeBicycleProps(bicycleProps.bicycleProps) : "";

	const handleClose = () => {
		setModal(false);
	};
	const selectBicycle = useStore((state: any) => state.selectBicycle);

	function handleBicycleSubmit() {
		createBicycle({
			variables: {
				color,
				frameNumber,
				type,
				brand,
				gearsystem,
				status,
				tires,
				fkOwnerId: selectedCustomer.id,
				fkHolderId: selectedCustomer.id,
			},
		})
			.then(({ data }) => {
				selectBicycle(data.createBicycle);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	data && !loading ? setModal(false) : "";

	const colorOptions = bicycleProps?.bicycleProps.color.map((color) => ({
		label: color.value,
		id: color.id,
	}));
	const tiresOptions = bicycleProps?.bicycleProps.tires.map((tire) => ({
		label: tire.value,
		id: tire.id,
	}));
	const statusOptions = bicycleProps?.bicycleProps.status.map((status) => ({
		label: status.value,
		id: status.id,
	}));
	const gearsystemOptions = bicycleProps?.bicycleProps.gearsystem.map((gearsystem) => ({
		label: gearsystem.value,
		id: gearsystem.id,
	}));
	const brandOptions = bicycleProps?.bicycleProps.brand.map((brand) => ({
		id: brand.id,
		label: brand.value,
	}));

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
					Create new Bicycle
				</Typography>
				<form className="flex flex-col">
					<Autocomplete
						disablePortal
						options={brandOptions}
						renderOption={(props, option) => {
							return <Box {...props}>{option.label}</Box>;
						}}
						sx={{ width: 300, mb: 2 }}
						onChange={(event: any, value: string | null) => {
							setBicycleForm({ ...bicycleForm, brand: value.id });
						}}
						renderInput={(props) => <TextField variant={"outlined"} {...props} label="Brand" />}
					/>
					<TextField
						sx={{ mb: 2 }}
						variant={"outlined"}
						label="Type"
						placeholder="Type"
						value={bicycleForm.type}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setBicycleForm({ ...bicycleForm, type: e.target.value });
						}}
					/>
					<Autocomplete
						disablePortal
						options={colorOptions}
						renderOption={(props, option) => {
							return <Box {...props}>{option.label}</Box>;
						}}
						sx={{ width: 300, mb: 2 }}
						onChange={(event: any, value: { id: string; label: string } | null) => {
							setBicycleForm({ ...bicycleForm, color: value.id });
						}}
						renderInput={(props) => <TextField variant={"outlined"} {...props} label="Color" />}
					/>
					<Autocomplete
						disablePortal
						options={tiresOptions}
						renderOption={(props, option) => {
							return <Box {...props}>{option.label}</Box>;
						}}
						sx={{ width: 300, mb: 2 }}
						onChange={(event: any, value: string | null) => {
							setBicycleForm({ ...bicycleForm, tires: value.id });
						}}
						renderInput={(props) => <TextField variant={"outlined"} {...props} label="Tires" />}
					/>
					<Autocomplete
						disablePortal
						options={statusOptions}
						renderOption={(props, option) => {
							return <Box {...props}>{option.label}</Box>;
						}}
						sx={{ width: 300, mb: 2 }}
						onChange={(event: any, value: string | null) => {
							setBicycleForm({ ...bicycleForm, status: value.id });
						}}
						renderInput={(props) => <TextField variant={"outlined"} {...props} label="Status" />}
					/>
					<Autocomplete
						disablePortal
						options={gearsystemOptions}
						renderOption={(props, option) => {
							return <Box {...props}>{option.label}</Box>;
						}}
						sx={{ width: 300, mb: 2 }}
						onChange={(event: any, value: string | null) => {
							setBicycleForm({ ...bicycleForm, gearsystem: value.id });
						}}
						renderInput={(props) => (
							<TextField variant={"outlined"} {...props} label="Gearsystem" />
						)}
					/>
					<Button
						variant="outlined"
						color="primary"
						size="large"
						onClick={() => {
							handleBicycleSubmit();
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
