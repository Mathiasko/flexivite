import React, { useState } from "react";
import { useStore } from "../../Store";
import { Box } from "@mui/system";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { bicycleInterface } from "../../Interfaces";

export const BicycleCart = () => {
	const removeBicycleFromCart = useStore((state) => state.removeBicycleFromCart);
	const handleRemoveBicycle = (bicycleId: string) => {
		removeBicycleFromCart(bicycleId);
	};
	const bicycleCart = useStore((state) => state.bicycleCart);
	console.log("bicycleCart", bicycleCart);

	return (
		<Box boxShadow={3} borderRadius={2} height={"200px"} overflow={"auto"} m={1}>
			<Table size="small">
				<TableHead sx={{ position: "sticky", top: 0, backgroundColor: "#FFF" }}>
					<TableRow>
						<TableCell>Brand</TableCell>
						<TableCell>Type</TableCell>
						<TableCell>Color</TableCell>
						<TableCell>Price</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{bicycleCart
						? bicycleCart?.map(
								({ bicycle, price }: { bicycle: bicycleInterface; price: number }) => (
									<TableRow
										key={bicycle.id}
										hover
										sx={{ cursor: "pointer" }}
										onClick={() => handleRemoveBicycle(bicycle.id)}>
										<TableCell>{bicycle.brand.value}</TableCell>
										<TableCell>{bicycle.type}</TableCell>
										<TableCell>{bicycle.color.value}</TableCell>
										<TableCell>{price}</TableCell>
									</TableRow>
								)
						  )
						: ""}
				</TableBody>
			</Table>
		</Box>
	);
};
