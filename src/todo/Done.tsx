import React from "react";
import { Stack } from "@mui/system";
import { RepairCard } from "./RepairCard";
import { repairInterface } from "../Interfaces";

export const Done = ({ done }: { done?: repairInterface[] }) => {
	return (
		<Stack spacing={2}>
			{done?.map((repair) => {
				return <RepairCard color={"#7377ba"} repair={repair} />;
			})}
		</Stack>
	);
};
