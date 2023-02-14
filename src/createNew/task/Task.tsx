import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { SearchTasks } from "../repair/SearchTasks";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useStore } from "../../Store.js";
import { useLazyQuery, useQuery } from "@apollo/client";
import { TASKS_BY_CATEGORY, TASK_CATEGORY } from "../../queries";
import { NewTaskCategoryModal } from "./NewTaskCategoryModal";
import { NewTaskModal } from "./NewTaskModal";

export const Task = () => {
	const tasks = useStore((state) => state.tasks);
	const storeTasks = useStore((state) => state.storeTasks);
	const { data: taskCategories } = useQuery(TASK_CATEGORY);
	const [taskCategory, setTaskCategory] = useState("");
	const [searchTasks] = useLazyQuery(TASKS_BY_CATEGORY, {
		variables: { categoryId: taskCategory },
	});
	const [categoryModal, setCategoryModal] = useState(false);
	const [taskModal, setTaskModal] = useState(false);


	useEffect(() => {
		searchTasks().then(({ data }) => {
			storeTasks(data.taskByCategory);
		});
	}, [taskCategory]);

	return (
		<Box display={"flex"}>
			{categoryModal ? (
				<NewTaskCategoryModal
					setCategoryModal={setCategoryModal}
					setTaskCategory={setTaskCategory}
				/>
			) : (
				""
			)}
			<Box>
				<Typography>Category</Typography>
				<Button
					onClick={() => {
						setCategoryModal(true);
					}}>
					Create New
				</Button>
				<SearchTasks />
				<Box boxShadow={3} borderRadius={2} height={"200px"} overflow={"auto"} m={1}>
					<Table size="small">
						<TableHead sx={{ position: "sticky", top: 0, backgroundColor: "#FFF" }}>
							<TableRow>
								<TableCell>Name</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{taskCategories?.taskCategory
								? taskCategories.taskCategory.map((category) => (
										<TableRow
											key={category.id}
											hover
											selected={category.id === taskCategory}
											sx={{ cursor: "pointer" }}
											onClick={() => setTaskCategory(category.id)}>
											<TableCell>{category.name}</TableCell>
										</TableRow>
								  ))
								: ""}
						</TableBody>
					</Table>
				</Box>
			</Box>
			<Box>
      {taskModal ? (
				<NewTaskModal
					setTaskModal={setTaskModal}
          taskCategoryId={taskCategory}
				/>
			) : (
				""
			)}
				<Box>
					<Typography>Category</Typography>

					<Button
						onClick={() => {
							setTaskModal(true);
						}}>
						Create New
					</Button>
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
								{tasks.length > 0
									? tasks.map((task) => (
											<TableRow
												key={task.id}
												hover
												sx={{ cursor: "pointer" }}
												onClick={() => handleClick(task)}>
												<TableCell>{task.name}</TableCell>
												<TableCell>{task.taskCategory.name}</TableCell>
												<TableCell>{task.duration}</TableCell>
											</TableRow>
									  ))
									: ""}
							</TableBody>
						</Table>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
