import React, { useState } from "react";
import { Box, Button, CircularProgress, Modal, TextField, Typography } from "@mui/material";
import { useMutation } from "@apollo/client";
import { useStore } from "../../Store.js";
import { CREATE_TASK, TASKS_BY_CATEGORY } from "../../queries.js";

export function NewTaskModal({ setTaskModal, taskCategoryId }) {
	const [open, setOpen] = useState(true);
	const [taskForm, setTaskForm] = useState({
		name: '',
		duration: 0,
	});

	const [createTask, { data, loading, error }] = useMutation(CREATE_TASK, {
		refetchQueries: [{ query: TASKS_BY_CATEGORY, variables: { categoryId: taskCategoryId } }],
	});

	const handleClose = () => {
		setTaskModal(false);
	};

	function handleTaskSubmit() {
		createTask({
			variables: {
				name: taskForm.name,
				fkTaskCategory: taskCategoryId,
				duration: taskForm.duration,
			},
		})
			.then(({ data }) => {
				handleClose();
			})
			.catch((err) => {
				console.error(err);
			});
	}

	data && !loading ? setTaskModal(false) : "";

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		bgcolor: "background.paper",
		border: "1px solid #111",
		boxShadow: 24,
		pt: 2,
		px: 4,
		pb: 3,
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<Box sx={{ ...style }}>
				<Typography mb={1} variant="h4">
					Create new task
				</Typography>
				<form className="flex flex-col">
					<TextField
						sx={{ mb: 2 }}
						autoFocus
						variant={"outlined"}
						label="Task Name"
						placeholder="Task Name"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setTaskForm({ name: e.target.value });
						}}
					/>
					<TextField
						sx={{ mb: 2 }}
						autoFocus
						variant={"outlined"}
						type="number"
						label="Duration"
						placeholder="Duration"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setTaskForm({ duration: e.target.value });
						}}
					/>
					<Button
						variant="outlined"
						size="large"
						onClick={() => {
							handleTaskSubmit();
						}}>
						Submit
						{loading && (
							<CircularProgress
								size={24}
								sx={{
									position: "absolute",
									color: "primary",
								}}
							/>
						)}
					</Button>
				</form>
			</Box>
		</Modal>
	);
}
