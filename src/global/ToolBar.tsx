import React from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useStore } from "../Store.js";
import Repair from "../createNew/repair/Repair.js";
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { SearchBar } from "./SearchBar";
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

export const ToolBar = () => {
	const toggleModal = useStore((state) => state.toggleModal);
	const setModalContent = useStore((state) => state.setModalContent);

	return (
		<Box
			display={"flex"}
			marginX={2}
			marginY={1}
			alignItems={"center"}
			justifyContent={"space-between"}>
			<Typography variant="h3" margin={1}>
				To-Do
			</Typography>
			<SearchBar />
			<Box>
				<Button
					onClick={() => {
						toggleModal();
						setModalContent(<Repair />);
					}}
					variant="contained"
					sx={{ padding: "15px 20px" }}>
					<AddCircleRoundedIcon /> <Typography marginLeft={1}>ADD NEW</Typography>
				</Button>
			</Box>
		</Box>
	);
};
