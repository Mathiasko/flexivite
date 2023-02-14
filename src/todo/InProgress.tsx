import React from "react";
import { Stack, Typography } from "@mui/material";
import { repairInterface } from "../Interfaces";
import { RepairCard } from "./RepairCard";

export const InProgress = ({ inProgress }: { inProgress?: repairInterface[] }) => {
	return (
		<Stack spacing={2}>
			{inProgress?.map((repair) => {
				return <RepairCard color={"#295959"} repair={repair} />;
			})}
			{inProgress?.length === 0 ? <Typography variant="h4">Nothing here</Typography> : ""}
		</Stack>
	);
};
