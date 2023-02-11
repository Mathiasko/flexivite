//@ts-nocheck
import { useLazyQuery } from "@apollo/client";
import {
	Box,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Tooltip,
	Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { nextInterface } from "../../Interfaces.js";
import { GET_BICYCLES } from "../../queries.js";
import { useStore } from "../../Store.js";
import { bicycleInterface } from "../../Interfaces.js";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { NewBicycleModal } from "../bicycle/NewBicycleModal.js";

export const SelectBicycle = ({ setNextDisabled }: nextInterface) => {
	const selectedCustomer = useStore((state) => state.selectedCustomer);
	const selectedBicycle = useStore((state) => state.selectedBicycle);
	const selectBicycle = useStore((state) => state.selectBicycle);
	const [modal, setModal] = useState(false);

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
		selectBicycle(index);
		setNextDisabled(false);
	};

	return (
		<Box>
			<Box display={"flex"} alignItems="center">
				<Typography variant="h5" my={2}>
					Select Bicycle
				</Typography>
					<IconButton
						disabled={!selectedCustomer}
						sx={{ marginLeft: 1 }}
						onClick={() => {
							setModal(true);
						}}>
						<AddCircleOutlineRoundedIcon
							color={selectedCustomer ? "primary" : "disabled"}
							fontSize="large"
						/>
					</IconButton>
				{modal ? <NewBicycleModal setModal={setModal} /> : ""}
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
							? data.bicyclesByCustomerId.map((bicycle) => (
									<TableRow
										key={bicycle.id}
										hover
										selected={selectedBicycle?.id === bicycle.id}
										sx={{ cursor: "pointer" }}
										onClick={() => handleListItemClick(bicycle)}>
										<TableCell>{bicycle.brand.value}</TableCell>
										<TableCell>{bicycle.type}</TableCell>
										<TableCell>{bicycle.color.value}</TableCell>
									</TableRow>
							  ))
							: ""}
					</TableBody>
				</Table>
			</Box>
		</Box>
	);
};
