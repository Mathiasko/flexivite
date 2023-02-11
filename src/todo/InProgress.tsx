import { Box, Stack } from "@mui/material";
import React from "react";
import { repairInterface } from "../Interfaces";
import { RepairCard } from "./RepairCard";

export const InProgress = ({ inProgress }: { inProgress?: repairInterface[] }) => {
	return (
		<Stack spacing={2}>
			{inProgress?.map((repair) => {
				return <RepairCard color={"#295959"} repair={repair} />;
			})}
		</Stack>
	);
};
