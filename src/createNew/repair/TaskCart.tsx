//@ts-nocheck
import { useMutation, useQuery } from "@apollo/client";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { taskInterface } from "../../Interfaces.js";
import { DELETE_TASK_INVOICE_LINE, GET_TASK_INVOICE_LINES } from "../../queries.js";
import { useStore } from "../../Store.js";

export const TaskCart = ({ repairId }) => {
	const removeTaskFromCart = useStore((state) => state.removeTaskFromCart);
	const taskCart: taskInterface[] = useStore((state) => state.taskCart);
	const { data } = useQuery(GET_TASK_INVOICE_LINES, { variables: { repairId } });

	const [deleteTaskInvoiceLine] = useMutation(DELETE_TASK_INVOICE_LINE, {
		refetchQueries: [{ query: GET_TASK_INVOICE_LINES, variables: { repairId } }],
	});

	const handleClick = (item: taskInterface) => {
		removeTaskFromCart(item);
	};

	const taskInvoiceLines = data ? data.taskInvoiceLines : false;

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
					{taskInvoiceLines
						? taskInvoiceLines.map((invoiceLine) => {
								return (
									<TableRow
										key={invoiceLine.task.id}
										hover
										sx={{ cursor: "pointer" }}
										onClick={() => {
											deleteTaskInvoiceLine({
												variables: {
													id: invoiceLine.id,
												},
											});
										}}>
										<TableCell>{invoiceLine.task.name}</TableCell>
										<TableCell>{invoiceLine.task.taskCategory.name}</TableCell>
										<TableCell>{invoiceLine.task.duration}</TableCell>
									</TableRow>
								);
						  })
						: ""}
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
