//@ts-nocheck
import React, { useState } from "react";
import { Box, Button, CircularProgress, Modal, TextField, Typography } from "@mui/material";
import { useMutation } from "@apollo/client";
import { useStore } from "../../Store.js";
import { CREATE_TASK_CATEGORY, TASK_CATEGORY } from "../../queries.js";

export function NewTaskCategoryModal({ setCategoryModal, setTaskCategory }) {
	const [open, setOpen] = useState(true);
	const [categoryForm, setCategoryForm] = useState({ name: "" });

	const [createTaskCategory, { data, loading, error }] = useMutation(CREATE_TASK_CATEGORY, {
		refetchQueries: [{ query: TASK_CATEGORY }],
	});

	const handleClose = () => {
		setCategoryModal(false);
	};

	function handleCategorySubmit() {
		createTaskCategory({ variables: { name: categoryForm.name } })
			.then(({ data }) => {
				setTaskCategory(data.createTaskCategory.id);
				handleClose();
			})
			.catch((err) => {
				console.error(err);
			});
	}

	data && !loading ? setCategoryModal(false) : "";

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
					Create new category
				</Typography>
				<form className="flex flex-col">
					<TextField
						sx={{ mb: 2 }}
						autoFocus
						variant={"outlined"}
						label="Category Name"
						placeholder="Category Name"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							setCategoryForm({ name: e.target.value });
						}}
					/>
					<Button
						variant="outlined"
						size="large"
						onClick={() => {
							handleCategorySubmit();
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
