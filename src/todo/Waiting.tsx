import React from "react";
import { Box, Stack } from "@mui/system";
import { Button, Chip, Typography } from "@mui/material";
import { RepairCard } from "./RepairCard";

export const Waiting = () => {
	return (
		<div>
			<Stack spacing={2}>
				<RepairCard/>
				<RepairCard/>
				<RepairCard/>
				<RepairCard/>
			</Stack>
		</div>
	);
};
