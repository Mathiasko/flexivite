import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BICYCLES } from "../../queries";
import { useStore } from "../../Store";
import { Box } from "@mui/system";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { bicycleInterface } from "../../Interfaces";

export const BicycleCart = () => {
	const addToCart = useStore((state) => state.addBicycleToCart);
	const removeBicycleFromCart = useStore((state) => state.removeBicycleFromCart);
	const handleRemoveBicycle = (bicycle: bicycleInterface) => {
		removeBicycleFromCart(bicycle);
	};
	return (
		<Box boxShadow={3} borderRadius={2} height={"200px"} overflow={"auto"} m={1}>
			<Table size="small">
				<TableHead sx={{ position: "sticky", top: 0, backgroundColor: "#FFF" }}>
					<TableRow>
						<TableCell>Brand</TableCell>
						<TableCell>Type</TableCell>
						<TableCell>Color</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{addToCart[0]
						? addToCart?.bicyclesByCustomerId.map((bicycle: bicycleInterface) => (
								<TableRow
									key={bicycle.id}
									hover
									sx={{ cursor: "pointer" }}
									onClick={() => handleRemoveBicycle(bicycle)}>
									<TableCell>{bicycle.brand.value}</TableCell>
									<TableCell>{bicycle.type}</TableCell>
									<TableCell>{bicycle.color.value}</TableCell>
								</TableRow>
						  ))
						: ""}
				</TableBody>
			</Table>
		</Box>
	);
};
