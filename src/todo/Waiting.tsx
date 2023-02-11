import React from "react";
import { Stack } from "@mui/system";
import { RepairCard } from "./RepairCard";
import { repairInterface } from "../Interfaces";

export const Waiting = ({ waiting }: { waiting?: repairInterface[] }) => {
	return (
		<Stack spacing={2}>
			{waiting?.map((repair) => {
				return <RepairCard color={"#9f4a4a"} repair={repair} />;
			})}
		</Stack>
	);
};
