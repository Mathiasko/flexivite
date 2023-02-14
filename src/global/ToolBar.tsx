import React, { useState } from "react";
import { Button, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { SearchBar } from "./SearchBar";
import { useLocation } from "react-router-dom";
import Repair from "../createNew/repair/Repair";
import { Rental } from "../createNew/rental/Rental";
import { Sale } from "../createNew/sale/Sale";
import { useStore } from "../Store.js";

const CreateOptopns = ({ handleClose, hidden }: any) => {
	const toggleModal = useStore((state) => state.toggleModal);
	const setModalContent = useStore((state) => state.setModalContent);

	const options = [
		{ label: "Repair", element: <Repair /> },
		{ label: "Rental", element: <Rental /> },
		{ label: "Sale", element: <Sale /> },
	];

	return (
		<div hidden={!hidden}>
			<Box display={"flex"}>
				{options.map((option, index) => (
					<ListItemButton
						sx={{
							backgroundColor: "#e1e1e1",
							margin: "5px",
							padding: "10px 18px",
							borderRadius: "3px",
						}}
						onClick={() => {
							toggleModal();
							setModalContent(option.element);
							handleClose();
						}}
						key={index}>
						<ListItemText primary={option.label} />
					</ListItemButton>
				))}
			</Box>
		</div>
	);
};

export const ToolBar = () => {
	const location = useLocation();
	const title = location.pathname;
	const signedIn = useStore(({ signedIn }) => signedIn);

	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Box
			display={"flex"}
			marginX={2}
			marginY={1}
			alignItems={"center"}
			justifyContent={"space-between"}>
			<Typography variant="h3" margin={1}>
				{title.slice(1).toUpperCase()}
			</Typography>
			<SearchBar />

			<div hidden={open}>
				<Button
					variant="contained"
					disabled={!signedIn}
					sx={{ padding: "15px 20px" }}
					onClick={handleClickOpen}>
					<AddCircleRoundedIcon /> <Typography marginLeft={1}>CREATE NEW</Typography>
				</Button>
			</div>
			<CreateOptopns hidden={open} handleClose={handleClose} />
		</Box>
	);
};
