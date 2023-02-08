import { useLazyQuery } from "@apollo/client";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { GET_BICYCLES } from "../../queries.js";
import { useStore } from "../../Store.js";

interface selectBicycleInterface {
	setNextDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SelectBicycle = ({ setNextDisabled }: selectBicycleInterface) => {
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const selectedCustomer = useStore((state) => state.selectedCustomer);
	const selectBicycle = useStore((state) => state.selectBicycle);

	const [searchBicycle, { called, loading, data }] = useLazyQuery(GET_BICYCLES, {
		variables: { customerId: selectedCustomer?.id },
	});

	useEffect(() => {
		searchBicycle(selectedCustomer);
	}, [selectedCustomer]);

	const handleListItemClick = (index: number) => {
		setSelectedIndex(index);
		selectBicycle(index);
		setNextDisabled(false);
	};

	return (
		<Box>
			<Typography variant="h5" m={2}>Select Bicycle</Typography>
			<Box height={"200px"} overflow={"auto"} m={0}>
				<Table size="small">
					<TableHead sx={{ position: "sticky", top: 0, backgroundColor: "#FFF" }}>
						<TableRow>
							<TableCell>Brand</TableCell>
							<TableCell>Type</TableCell>
							<TableCell>Color</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data
							? data.bicyclesByCustomerId.map((c, index) => (
									<TableRow
										key={index}
										hover
										selected={selectedIndex === index}
										sx={{ cursor: "pointer" }}
										onClick={() => handleListItemClick(index, c)}>
										<TableCell>{c.brand.value}</TableCell>
										<TableCell>{c.type}</TableCell>
										<TableCell>{c.color.value}</TableCell>
									</TableRow>
							  ))
							: ""}
					</TableBody>
				</Table>
			</Box>
		</Box>
	);
};
