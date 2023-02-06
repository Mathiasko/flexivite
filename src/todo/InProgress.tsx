import { Box, Stack } from "@mui/material";
import React from "react";

export const InProgress = () => {
	return (
		<div>
			<Stack spacing={2}>
				<Box
					sx={{
						width: 300,
						height: 300,
						backgroundColor: "secondary.dark",
						"&:hover": {
							backgroundColor: "primary.main",
							opacity: [0.9, 0.8, 0.7],
						},
					}}
				/>
				<Box
					sx={{
						width: 300,
						height: 300,
						backgroundColor: "secondary.dark",
						"&:hover": {
							backgroundColor: "primary.main",
							opacity: [0.9, 0.8, 0.7],
						},
					}}
				/>
				<Box
					sx={{
						width: 300,
						height: 300,
						backgroundColor: "secondary.dark",
						"&:hover": {
							backgroundColor: "primary.main",
							opacity: [0.9, 0.8, 0.7],
						},
					}}
				/>
				<Box
					sx={{
						width: 300,
						height: 300,
						backgroundColor: "secondary.dark",
						"&:hover": {
							backgroundColor: "primary.main",
							opacity: [0.9, 0.8, 0.7],
						},
					}}
				/>
			</Stack>
		</div>
	);
};
