import { Box, Button, Chip, Typography } from "@mui/material";
import React from "react";

export const RepairCard = () => {
	return (
		<Box
			padding={2}
			borderRadius={2}
			boxShadow={5}
			sx={{
				backgroundColor: "primary.main",
				color: "white",
				"&:hover": {
					opacity: [0.9],
					cursor: "pointer",
				},
				display: "flex",
				justifyContent: "space-between",
			}}>
			<Box>
				<Typography>
					Repair No. <strong>R12222022/2</strong>
				</Typography>
				<Typography>
					Taken by: <strong> Ferko Jagoda</strong>
				</Typography>
				<Typography marginBottom={3}>
					Date: <strong>12/12/2012</strong>
				</Typography>
				<Typography>
					Customer: <strong>Palko Rieka</strong>
				</Typography>
				<Typography>
					Bicycle: <strong>Titan Speed, white</strong>
				</Typography>
			</Box>
			<Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
				<Chip label="Chip Outlined" color="secondary" />
				<Button
					sx={{
						"&hover": {
							backgroundColor: "#0063cc",
						},
					}}
					variant="contained"
					color="secondary">
					Start
				</Button>
			</Box>
		</Box>
	);
};
