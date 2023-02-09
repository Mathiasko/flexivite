import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useStore } from "../../Store.js";
import { Box } from "@mui/system";
import { nextInterface, productInterface } from "../../Interfaces.js";

export function Products({ setNextDisabled }: nextInterface) {
	const products: productInterface[] = useStore((state) => state.products);

	const handleClick = (item: productInterface) => {
		setNextDisabled(false);
		addProductToCart(item);
	};
	const addProductToCart = useStore((state) => state.addProductToCart);
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
					</TableRow>
				</TableHead>
				<TableBody>
					{products.length > 0
						? products.map((product) => (
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
						  ))
						: ""}
				</TableBody>
			</Table>
		</Box>
	);
}
