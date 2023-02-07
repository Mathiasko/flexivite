import { Box, Stack } from "@mui/material";
import React from "react";
import { RepairCard } from "./RepairCard";

export const InProgress = () => {
	return (
		<Stack spacing={2}>
			<RepairCard color/>
			<RepairCard color/>
			<RepairCard color/>
			<RepairCard color/>
			<RepairCard color/>
		</Stack>
	);
};
