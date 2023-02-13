import React from "react";
import { Stack } from "@mui/system";
import { RepairCard } from "./RepairCard";
import { repairInterface } from "../Interfaces";
import { Typography } from "@mui/material";

export const Done = ({ done }: { done?: repairInterface[] }) => {
	return (
		<Stack spacing={2}>
			{done?.map((repair) => {
				return <RepairCard color={"#7377ba"} repair={repair} />;
			})}
			{done?.length === 0 ? <Typography variant="h4">Nothing here</Typography> : ""}
		</Stack>
	);
};
