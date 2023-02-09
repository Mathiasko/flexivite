import { useLazyQuery } from "@apollo/client";
import {
	Box,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { nextInterface } from "../../Interfaces.js";
import { GET_BICYCLES } from "../../queries.js";
import { useStore } from "../../Store.js";
import { bicycleInterface } from "../../Interfaces.js";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

export const SelectBicycle = ({ setNextDisabled }: nextInterface) => {
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const selectedCustomer = useStore((state) => state.selectedCustomer);
	const selectBicycle = useStore((state) => state.selectBicycle);

	interface bicyclesQuery {
		bicyclesByCustomerId: bicycleInterface[];
	}

	const [searchBicycle, { data }] = useLazyQuery<bicyclesQuery>(GET_BICYCLES, {
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
			<Box display={"flex"} alignItems="center">
				<Typography variant="h5" my={2}>
					Select Bicycle
				</Typography>
				<IconButton sx={{ marginLeft: 1 }}>
					<AddCircleOutlineRoundedIcon color="primary" fontSize="large" />
				</IconButton>
			</Box>
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
										onClick={() => handleListItemClick(index)}>
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
