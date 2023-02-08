import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import { useStore } from "../../Store.js";
import { Box } from "@mui/system";

// Generate Order Data
function createData(
	id: string,
	productSupplier: { id: string; value: string; minOrder: number | null },
	productBrand: { id: string; value: string },
	productCategory: { id: string; value: string },
	productGroup: { id: string; value: string },
	name: string,
	type: string,
	ean: string,
	stock: number,
	minStock: number,
	buyPrice: number,
	sellPrice: number,
	expectedDurability: number
) {
	return {
		id,
		productSupplier,
		productBrand,
		productCategory,
		productGroup,
		name,
		type,
		ean,
		stock,
		minStock,
		buyPrice,
		sellPrice,
		expectedDurability,
	};
}
interface productInterface {
	id: string;
	productSupplier: { id: string; value: string; minOrder: number | null };
	productBrand: { id: string; value: string };
	productCategory: { id: string; value: string };
	productGroup: { id: string; value: string };
	name: string;
	type: string;
	ean: string;
	stock: number;
	minStock: number;
	buyPrice: number;
	sellPrice: number;
	expectedDurability: number;
}
const products = [
	createData(
		"3cbc6824-145d-42a6-8638-08006fa0e5dc",
		{ id: "0cdbac3c-ca9d-4190-8e2c-c3c8af377688", value: "BikePartner", minOrder: null },
		{ id: "3639b200-8ca3-4a8d-b240-0d2ac9a3f60a", value: "Adidas" },
		{ id: "1841c55d-fd09-48a8-b33f-e910e25b236e", value: "Tire" },
		{ id: "133c4bf5-58d7-47cc-bc92-c289fda669e5", value: "Part" },
		"12 speed",
		"type speed",
		"PK045786",
		10,
		1,
		10,
		20,
		20
	),
	createData(
		"6c2d81d1-3926-4684-b52e-b155e914881a",
		{ id: "52b736ce-64ca-40c6-9d9b-bc2f55c18908", value: "Cycle Service Nordic", minOrder: null },
		{ id: "4ef0b68f-5e11-4419-9e14-3bdcfb30e0a9", value: "Nike" },
		{ id: "1841c55d-fd09-48a8-b33f-e910e25b236e", value: "Tire" },
		{ id: "133c4bf5-58d7-47cc-bc92-c289fda669e5", value: "Part" },
		"10-51T",
		"type 51T",
		"PK045786",
		2,
		1,
		10,
		20,
		20
	),
	createData(
		"e9ad7e31-6dda-480c-9568-852e852ebf60",
		{ id: "52b736ce-64ca-40c6-9d9b-bc2f55c18908", value: "Cycle Service Nordic", minOrder: null },
		{ id: "3639b200-8ca3-4a8d-b240-0d2ac9a3f60a", value: "Adidas" },
		{ id: "1841c55d-fd09-48a8-b33f-e910e25b236e", value: "Tire" },
		{ id: "133c4bf5-58d7-47cc-bc92-c289fda669e5", value: "Part" },
		"PowerStop",
		"type erStop",
		"PK045786",
		10,
		1,
		10,
		20,
		20
	),
	createData(
		"f4a20427-0818-460a-a517-64a0b8400388",
		{ id: "0cdbac3c-ca9d-4190-8e2c-c3c8af377688", value: "BikePartner", minOrder: null },
		{ id: "4ef0b68f-5e11-4419-9e14-3bdcfb30e0a9", value: "Nike" },
		{ id: "859b6693-0d2b-4f48-a355-61d94181faa7", value: "Chain" },
		{ id: "133c4bf5-58d7-47cc-bc92-c289fda669e5", value: "Part" },
		"Stylo",
		"type lo, center",
		"PK045786",
		10,
		1,
		10,
		20,
		20
	),
	createData(
		"fe03366d-3e5a-4389-a0bf-1afaa2e0ee1f",
		{ id: "0cdbac3c-ca9d-4190-8e2c-c3c8af377688", value: "BikePartner", minOrder: null },
		{ id: "4ef0b68f-5e11-4419-9e14-3bdcfb30e0a9", value: "Nike" },
		{ id: "859b6693-0d2b-4f48-a355-61d94181faa7", value: "Chain" },
		{ id: "133c4bf5-58d7-47cc-bc92-c289fda669e5", value: "Part" },
		"6-8 speed",
		"type speed",
		"PK045786",
		10,
		1,
		10,
		20,
		20
	),
];

export function Products({ setNextDisabled }) {
	const handleClick = (item: productInterface) => {
		setNextDisabled(false);
		addProductToCart(item);
	};
	const addProductToCart = useStore((state) => state.addProductToCart);
	return (
		<Box>
			<Typography variant="h5">Product</Typography>
			<Box height={"200px"} overflow={"auto"} m={1}>
				<Table size="small">
					<TableHead sx={{ position: "sticky", top: 0, backgroundColor: "#FFF" }}>
						<TableRow>
							<TableCell>Brand</TableCell>
							<TableCell>Category</TableCell>
							<TableCell>Name</TableCell>
							<TableCell>Type</TableCell>
							<TableCell>Price</TableCell>
							<TableCell>Stock</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{products.map((product) => (
							<TableRow
								key={product.id}
								hover
								sx={{ cursor: "pointer" }}
								onClick={() => handleClick(product)}>
								<TableCell>{product.productBrand.value}</TableCell>
								<TableCell>{product.productCategory.value}</TableCell>
								<TableCell>{product.name}</TableCell>
								<TableCell>{product.type}</TableCell>
								<TableCell>{product.sellPrice}</TableCell>
								<TableCell>{product.stock}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Box>
		</Box>
	);
}
