import React, { useState } from "react";
import { Box, Button, CircularProgress, Modal, Typography } from "@mui/material";
import { useMutation } from "@apollo/client";
import { GET_BICYCLES, NEW_BICYCLE } from "../../queries";
import { useStore } from "../../Store.js";
import { useForm } from "@mantine/form";
import { TextInput, Select } from "@mantine/core";
import { BicyclePropInterface } from "../../Interfaces";

export function NewBicycleModal({ setModal }) {
	const [open, setOpen] = useState(true);
	const selectedCustomer = useStore((state: any) => state.selectedCustomer);
	const bicycleProps = useStore((state: any) => state.bicycleProps);
	const [createBicycle, { data, loading }] = useMutation(NEW_BICYCLE, {
		refetchQueries: [{ query: GET_BICYCLES, variables: { customerId: selectedCustomer?.id } }],
	});
	const form = useForm({ initialValues: {} });

	const handleClose = () => {
		setModal(false);
	};
	const selectBicycle = useStore((state: any) => state.selectBicycle);

	function handleBicycleSubmit({
		color,
		frameNumber,
		type,
		brand,
		gearsystem,
		status,
		tires,
	}: BicyclePropInterface) {
		console.log(color, frameNumber, type, brand, gearsystem, status, tires);

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

	const colorOptions = bicycleProps.color.map((color) => ({
		label: color.value,
		value: color.id,
	}));
	const tiresOptions = bicycleProps.tires.map((tire) => ({
		label: tire.value,
		value: tire.id,
	}));
	const statusOptions = bicycleProps.status.map((status) => ({
		label: status.value,
		value: status.id,
	}));
	const gearsystemOptions = bicycleProps.gearsystem.map((gearsystem) => ({
		label: gearsystem.value,
		value: gearsystem.id,
	}));
	const brandOptions = bicycleProps.brand.map((brand) => ({
		label: brand.value,
		value: brand.id,
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
				<form
					className="flex flex-col"
					onSubmit={form.onSubmit((values) => handleBicycleSubmit(values))}>
					<TextInput label="FrameNumber" {...form.getInputProps("frameNumber")} />
					<Select
						label="Brand name"
						placeholder="Pick one"
						size="md"
						searchable
						nothingFound="No options"
						data={brandOptions}
						{...form.getInputProps("brand")}
					/>
					<TextInput label="Type" {...form.getInputProps("type")} />
					<Select
						label="Color"
						placeholder="Pick one"
						size="md"
						searchable
						nothingFound="No options"
						data={colorOptions}
						{...form.getInputProps("color")}
					/>
					<Select
						label="Tire size"
						placeholder="Pick one"
						size="md"
						searchable
						nothingFound="No options"
						data={tiresOptions}
						{...form.getInputProps("tires")}
					/>
					<Select
						label="Gear system"
						placeholder="Pick one"
						size="md"
						searchable
						nothingFound="No options"
						data={gearsystemOptions}
						{...form.getInputProps("gearsystem")}
					/>
					<Select
						label="Status"
						placeholder="Pick one"
						size="md"
						searchable
						nothingFound="No options"
						data={statusOptions}
						{...form.getInputProps("status")}
					/>
					<Button variant="outlined" color="primary" size="large" type="submit">
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
