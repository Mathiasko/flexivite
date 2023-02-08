import React from "react";
import { Stack } from "@mui/system";
import { RepairCard } from "./RepairCard";

export const Waiting = () => {
	return (
		<Stack spacing={2}>
			<RepairCard />
			<RepairCard />
			<RepairCard />
			<RepairCard />
		</Stack>
	);
};
