import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useStore } from "../../Store.js";

export const TaskCart = () => {
	interface taskInterface {
		id: string;
		name: string;
		category: { id: string; name: string };
		fkProductCategoryId: string;
		duration: number;
	}
	const removeTaskFromCart = useStore((state) => state.removeTaskFromCart);
	const taskCart = useStore((state) => state.taskCart);

	const handleClick = (item: taskInterface) => {
		removeTaskFromCart(item);
	};

	return (
		<Box boxShadow={3} borderRadius={2} height={"200px"} overflow={"auto"} m={1}>
			<Table size="small">
				<TableHead sx={{ position: "sticky", top: 0, backgroundColor: "#FFF" }}>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Category</TableCell>
						<TableCell>Duration</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{taskCart.map((task) => (
						<TableRow
							key={task.id}
							hover
							sx={{ cursor: "pointer" }}
							onClick={() => handleClick(task)}>
							<TableCell>{task.name}</TableCell>
							<TableCell>{task.taskCategory.name}</TableCell>
							<TableCell>{task.duration}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	);
};