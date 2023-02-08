import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Waiting } from "./Waiting";
import { InProgress } from "./InProgress";
import { Grid } from "@mui/material";
import { RepairCardDetails } from "./RepairCardDetails";

export const ToDo = () => {
	const [value, setValue] = React.useState("1");

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

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
							<Tab label="Repairs In Progress" value="2" />
						</TabList>
					</Box>
					<TabPanel value="1">
						<Waiting />
					</TabPanel>
					<TabPanel value="2">
						<InProgress />
					</TabPanel>
				</TabContext>
			</Grid>
			<Grid item paddingTop={2} paddingX={3} xs={2}>
				<RepairCardDetails />
			</Grid>
		</Grid>
	);
};
