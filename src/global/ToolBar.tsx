import React from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { SearchBar } from "./SearchBar";

export const ToolBar = () => {
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
				<Button variant="contained" sx={{ padding: "15px 20px" }}>
					<AddCircleRoundedIcon /> <Typography marginLeft={1}>ADD NEW</Typography>
				</Button>
			</Box>
		</Box>
	);
};
