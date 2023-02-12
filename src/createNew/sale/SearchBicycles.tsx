import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BICYCLES } from "../../queries";
import { useStore } from "../../Store";
import { Box } from "@mui/system";
import {
	Button,
	Modal,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import { bicycleInterface } from "../../Interfaces";

const BicyclePriceModal = ({ bicycle, setModal }: { bicycle: bicycleInterface; setModal: any }) => {
	const addBicycleToCart = useStore((state) => state.addBicycleToCart);
	const [price, setPrice] = useState(0);
	const [open, setOpen] = useState(true);
	const handleClose = () => {
		setModal(false);
	};
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
			<Box sx={style}>
				<div className="flex p-1">
					<Typography variant="h6">{bicycle.brand.value}</Typography>
					<Typography pl={2} variant="h6">
						{bicycle.type}
					</Typography>
				</div>
				<div>
					<TextField
						autoFocus
						variant={"outlined"}
						placeholder="Set price"
						onChange={({ target }) => setPrice(parseInt(target.value))}
					/>
				</div>
				<Button
					size="large"
					variant="outlined"
					sx={{ marginY: 1 }}
					onClick={() => {
						addBicycleToCart(bicycle, price);
						console.log("bicycle, price", bicycle, price);
					}}>
					Add to Cart
				</Button>
			</Box>
		</Modal>
	);
};

export const SearchBicycles = () => {
	const [bicycle, setBicycle] = useState();
	const [modal, setModal] = useState(false);

	function handleBicycleClick(bicycle) {
		setBicycle(bicycle);
		setModal(true);
	}

	const { data } = useQuery(GET_BICYCLES, {
		variables: { customerId: "c6389cef-b019-4b77-b0f7-44f68aebf155" },
	});

	return (
		<Box boxShadow={3} borderRadius={2} height={"200px"} overflow={"auto"} m={1}>
			<Table size="small">
				<TableHead sx={{ position: "sticky", top: 0, backgroundColor: "#FFF" }}>
					<TableRow>
						<TableCell>Brand</TableCell>
						<TableCell>Type</TableCell>
						<TableCell>Color</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{data
						? data?.bicyclesByCustomerId.map((bicycle: bicycleInterface) => (
								<TableRow
									key={bicycle.id}
									hover
									sx={{ cursor: "pointer" }}
									onClick={() => handleBicycleClick(bicycle)}>
									<TableCell>{bicycle.brand.value}</TableCell>
									<TableCell>{bicycle.type}</TableCell>
									<TableCell>{bicycle.color.value}</TableCell>
								</TableRow>
						  ))
						: ""}
				</TableBody>
			</Table>
			{modal ? <BicyclePriceModal bicycle={bicycle} setModal={setModal} /> : ""}
		</Box>
	);
};
