import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Waiting } from "./Waiting";
import { Grid } from "@mui/material";
import { RepairCardDetails } from "./RepairCardDetails";
import { useQuery } from "@apollo/client";
import { GET_TODO } from "../queries";
import { repairInterface } from "../Interfaces";
import { useStore } from "../Store.js";
import { InProgress } from "./InProgress";
import { Done } from "./Done";

export const ToDo = () => {
	const [value, setValue] = React.useState("1");
	const selectedRepair = useStore((state) => state?.selectedRepair);

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	interface todoInterface {
		data:
			| {
					repairsInProgress: repairInterface[];
					repairsDone: repairInterface[];
					repairsToDo: repairInterface[];
			  }
			| undefined;
	}

	const { data }: todoInterface = useQuery(GET_TODO);

	return (
		<Grid container columns={3} height={"90vh"}>
			<Grid item xs={1} height={"100%"} overflow={"auto"}>
				<TabContext value={value}>
					<Box
						sx={{
							borderBottom: 1,
							borderColor: "divider",
							backgroundColor: "#F5F5F5",
							position: "sticky",
							top: "0",
							zIndex: 10,
						}}>
						<TabList onChange={handleChange} aria-label="lab API tabs example">
							<Tab label="Waiting For Repair" value="1" />
							<Tab label="In Progress" value="2" />
							<Tab label="Done" value="3" />
						</TabList>
					</Box>
					<TabPanel value="1">
						<Waiting waiting={data?.repairsToDo} />
					</TabPanel>
					<TabPanel value="2">
						<InProgress inProgress={data?.repairsInProgress} />
					</TabPanel>
					<TabPanel value="3">
						<Done done={data?.repairsDone} />
					</TabPanel>
				</TabContext>
			</Grid>
			<Grid item paddingTop={2} paddingX={3} xs={2}>
				{selectedRepair ? <RepairCardDetails /> : ""}
			</Grid>
		</Grid>
	);
};
