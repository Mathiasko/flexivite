import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { cumulativeValue } from "../../helper/rentalPrice";
import { DatePicker } from "@mantine/dates";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
export const SelectPeriod = ({ endDate, setEndDate, price, setPrice }) => {
	useEffect(() => {
		// Calculate the difference in milliseconds
		let difference = endDate.getTime() - new Date().getTime();

		// Convert the difference to days
		const numberOfDays = Math.round(difference / (1000 * 3600 * 24) + 1);
		setPrice(cumulativeValue(numberOfDays));
	}, [endDate]);

	return (
		<Box display="flex" margin={5}>
			<Box margin={"auto"} borderRadius={2} padding={2} boxShadow={5}>
				<Typography variant="h5" paddingBottom={2}>
					Select return date
				</Typography>
				<DatePicker
					icon={<CalendarMonthIcon />}
					placeholder="Pick date"
					label="Return date"
					onChange={setEndDate}
				/>
				<Typography variant="h6">Price: {price}</Typography>
			</Box>
		</Box>
	);
};
