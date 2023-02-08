import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import { useStore } from "../../Store.js";
import { Box } from "@mui/system";

// Generate Order Data
function createData(
	id: string,
	name: string,
	category: { id: string; name: string },
	fkProductCategoryId: string,
	duration: number
) {
	return { id, name, category, fkProductCategoryId, duration };
}
interface taskInterface {
	id: string;
	name: string;
	category: { id: string; name: string };
	fkProductCategoryId: string;
	duration: number;
}
const tasks = [
	createData(
		"3886a687-244d-4779-959e-e30d18bcdebe",
		"Flat Tire",
		{ id: "04d677a7-fe92-4705-84ae-2ed9b2fb2b02", name: "Bottom Bracket" },
		"859b6693-0d2b-4f48-a355-61d94181faa7",
		1
	),
	createData(
		"55a84cd1-28c4-40d7-89cb-8501faeea241",
		"Gear Wire and Cable",
		{ id: "47deb9c1-5b11-4bf4-ba59-429c6c6bf765", name: "Rear Wheel" },
		"859b6693-0d2b-4f48-a355-61d94181faa7",
		3
	),
	createData(
		"b276edda-0316-434e-8fff-e7023f870ca7",
		"Spoke Replacement",
		{ id: "49dd7e05-a61c-4e62-b21c-f73f6f9ed11d", name: "Drivetrain" },
		"1841c55d-fd09-48a8-b33f-e910e25b236e",
		4
	),
	createData(
		"be3b9ac1-c01e-43ff-9ac8-7308e1d0ec1f",
		"Chain Replacelement",
		{ id: "5d620453-0605-406e-ace1-0fea8e2d8a83", name: "Front Brake" },
		"1841c55d-fd09-48a8-b33f-e910e25b236e",
		1
	),
	createData(
		"f40058dc-70c9-4f1c-b7b8-2111d52825e5",
		"Maint",
		{ id: "338f7789-98c0-4b8e-aaae-df5e50535ac1", name: "Front Wheel" },
		"859b6693-0d2b-4f48-a355-61d94181faa7",
		2
	),
];

export function Tasks({ setNextDisabled }) {
	const addTaskToCart = useStore((state) => state.addTaskToCart);

	const handleClick = (item: taskInterface) => {
		setNextDisabled(false);
		addTaskToCart(item);
	};
	return (
		<Box>
			<Typography variant="h5">Tasks</Typography>
			<Box height={"200px"} overflow={"auto"} m={1}>
				<Table size="small">
					<TableHead sx={{ position: "sticky", top: 0, backgroundColor: "#FFF" }}>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Category</TableCell>
							<TableCell>Duration</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tasks.map((task) => (
							<TableRow
								key={task.id}
								hover
								sx={{ cursor: "pointer" }}
								onClick={() => handleClick(task)}>
								<TableCell>{task.name}</TableCell>
								<TableCell>{task.category.name}</TableCell>
								<TableCell>{task.duration}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Box>
		</Box>
	);
}
