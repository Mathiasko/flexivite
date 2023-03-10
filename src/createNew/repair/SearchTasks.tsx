//@ts-nocheck
import React, { useState } from "react";
import { useStore } from "../../Store.js";
import { useLazyQuery } from "@apollo/client";
import { TextField } from "@mui/material";
import { GET_TASKS_BY_NAME } from "../../queries";

export const SearchTasks = () => {
	const [searchTask] = useLazyQuery(GET_TASKS_BY_NAME);
	const storeTasks = useStore((state) => state.storeTasks);
	const [taskName, setTaskName] = useState("");

	function handleChange({ value }: HTMLInputElement) {
		setTaskName(value);
		searchTask({ variables: { name: taskName } })
			.then(({ data }) => {
				storeTasks(data.taskByName);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	return (
		<TextField
			sx={{ padding: "0 10px" }}
			autoFocus
			variant={"outlined"}
			placeholder="Search for Task"
			onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
				handleChange(e.target);
			}}
		/>
	);
};
