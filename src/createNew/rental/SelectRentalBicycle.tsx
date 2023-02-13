import React from "react";
import { useQuery } from "@apollo/client";
import {
	Box,
	CircularProgress,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@mui/material";
import { useStore } from "../../Store";
import { GET_RENTAL_BICYCLES } from "../../queries";

export const SelectRentalBicycle = () => {
	const { data: bicycles, loading } = useQuery(GET_RENTAL_BICYCLES);
	const selectBicycle = useStore(({ selectBicycle }) => selectBicycle);
	const selectedBicycle = useStore(({ selectedBicycle }) => selectedBicycle);

	return (
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
					{bicycles && !loading ? (
						bicycles.rentalBicycles.map((bicycle) => (
							<TableRow
								key={bicycle.id}
								hover
								selected={selectedBicycle?.id === bicycle.id}
								sx={{ cursor: "pointer" }}
								onClick={() => selectBicycle(bicycle)}>
								<TableCell>{bicycle.brand.value}</TableCell>
								<TableCell>{bicycle.type}</TableCell>
								<TableCell>{bicycle.color.value}</TableCell>
							</TableRow>
						))
					) : (
						<Box sx={{ display: "flex", margin: "50px" }}>
							<CircularProgress />
						</Box>
					)}
				</TableBody>
			</Table>
		</Box>
	);
};
