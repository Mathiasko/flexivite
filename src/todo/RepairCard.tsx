import React from "react";
import { Box, Chip, Typography } from "@mui/material";
import { repairInterface } from "../Interfaces";
import { formatDate } from "../helper/dateConversion";
import { useStore } from "../Store.js";
import { ActionButton } from "./ActionButton";

export const RepairCard = ({ repair, color }: { repair: repairInterface; color: string }) => {
	const { number, bicycle, comment, id, customer, status, takenBy, technician, createdAt } = repair;
	const selectRepair = useStore((state) => state.selectRepair);

	return (
		<div onClick={() => selectRepair(repair)}>
			<Box
				padding={2}
				borderRadius={2}
				boxShadow={5}
				sx={{
					backgroundColor: color,
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
						Repair No. <strong>{number}</strong>
					</Typography>
					<Typography>
						Taken by: <strong>{takenBy?.name}</strong>
					</Typography>
					<Typography marginBottom={3}>
						Date: <strong>{formatDate(createdAt)}</strong>
					</Typography>
					<Typography>
						Customer: <strong>{customer?.fullName}</strong>
					</Typography>
					<Typography>
						Brand: <strong>{`${bicycle.brand.value}`}</strong>
						<br />
						Type: <strong>{`${bicycle.type}`}</strong>
						<br />
						Color: <strong>{`${bicycle.color.value}`}</strong>
					</Typography>
				</Box>
				<Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
					<Chip label="Chip Outlined" color="secondary" />
					<ActionButton repair={repair} />
				</Box>
			</Box>
		</div>
	);
};
