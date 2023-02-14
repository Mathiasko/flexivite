//@ts-nocheck
import { useMutation, useQuery } from "@apollo/client";
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { partInterface } from "../../Interfaces.js";
import { DELETE_PRODUCT_INVOICE_LINE, GET_PRODUCT_INVOICE_LINES } from "../../queries.js";
import { useStore } from "../../Store.js";

export const ProductCart = ({ repairId }) => {
	const removeProductFromCart = useStore((state) => state.removeProductFromCart);
	const productCart: partInterface[] = useStore((state) => state.productCart);
	const { data } = useQuery(GET_PRODUCT_INVOICE_LINES, { variables: { repairId } });

	const [deleteProductInvoiceLine] = useMutation(DELETE_PRODUCT_INVOICE_LINE, {
		refetchQueries: [{ query: GET_PRODUCT_INVOICE_LINES, variables: { repairId } }],
	});

	const handleClick = (item: partInterface) => {
		removeProductFromCart(item.product);
	};

	const productInvoiceLines = data ? data.productInvoiceLines : false;

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
					{productInvoiceLines
						? productInvoiceLines.map((invoiceLine) => {
								return (
									<TableRow
										key={invoiceLine.product.id}
										hover
										sx={{ cursor: "pointer" }}
										onClick={() => {
											deleteProductInvoiceLine({
												variables: {
													id: invoiceLine.id,
												},
											});
										}}>
										<TableCell>{invoiceLine.product.productBrand.value}</TableCell>
										<TableCell>{invoiceLine.product.productCategory.value}</TableCell>
										<TableCell>{invoiceLine.product.name}</TableCell>
										<TableCell>{invoiceLine.product.type}</TableCell>
										<TableCell>{invoiceLine.product.sellPrice}</TableCell>
										<TableCell>{invoiceLine.product.stock}</TableCell>
										<TableCell>{invoiceLine.amount}</TableCell>
									</TableRow>
								);
						  })
						: ""}
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
