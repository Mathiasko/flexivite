//@ts-nocheck
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { partInterface } from "../../Interfaces.js";
import { useStore } from "../../Store.js";

export const ProductCart = () => {
	const removeProductFromCart = useStore((state) => state.removeProductFromCart);
	const productCart: partInterface[] = useStore((state) => state.productCart);

	const handleClick = (item: partInterface) => {
		removeProductFromCart(item.product);
	};

	return (
		<Box boxShadow={3} borderRadius={2} height={"200px"} overflow={"auto"} m={1}>
			<Table size="small">
				<TableHead sx={{ position: "sticky", top: 0, backgroundColor: "#FFF" }}>
					<TableRow>
						<TableCell>Brand</TableCell>
						<TableCell>Category</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Type</TableCell>
						<TableCell>Price</TableCell>
						<TableCell>Stock</TableCell>
						<TableCell>Amount</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{productCart.map((product) => (
						<TableRow
							key={product.product.id}
							hover
							sx={{ cursor: "pointer" }}
							onClick={() => handleClick(product)}>
							<TableCell>{product.product.productBrand.value}</TableCell>
							<TableCell>{product.product.productCategory.value}</TableCell>
							<TableCell>{product.product.name}</TableCell>
							<TableCell>{product.product.type}</TableCell>
							<TableCell>{product.product.sellPrice}</TableCell>
							<TableCell>{product.product.stock}</TableCell>
							<TableCell>{product.amount}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	);
};
