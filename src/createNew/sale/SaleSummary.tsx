//ts-nocheck
import { useMutation } from "@apollo/client";
import {
	Autocomplete,
	Box,
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { bicycleInterface, CustomerInterface, productInterface } from "../../Interfaces.js";
import {
	ADD_BICYCLE_INVOICE_LINE,
	ADD_PRODUCT_INVOICE_LINE,
	POST_NEW_SALE,
} from "../../queries.js";
import { useStore } from "../../Store.js";

const Pay = ({ paymentMethod }: { paymentMethod: number }) => {
	const [createProductInvoiceLine] = useMutation(ADD_PRODUCT_INVOICE_LINE);
	const [createBicycleInvoiceLines] = useMutation(ADD_BICYCLE_INVOICE_LINE);
	const [createSale] = useMutation(POST_NEW_SALE);
	const emptyStore: Function = useStore((state) => state.emptyStore);
	const bicycleCart: { bicycle: bicycleInterface; price: number }[] = useStore(
		(state) => state.bicycleCart
	);
	const signedIn = useStore((state) => state.signedIn);
	const productCart: { product: productInterface; amount: number }[] = useStore(
		(state) => state.productCart
	);
	const selectedCustomer: CustomerInterface = useStore((state) => state.selectedCustomer);

	function postSale() {
		createSale({
			variables: {
				fkPaymentMethod: paymentMethod,
				fkCustomerId: selectedCustomer ? selectedCustomer.id : "",
				fkSalespersonId: signedIn.id,
			},
		})
			.then(({ data }) => {
				productCart?.map(({ amount, product }) => {
					createProductInvoiceLine({
						variables: {
							fkSaleId: data.createSale.id,
							fkProductId: product.id,
							price: product.sellPrice,
							amount,
						},
					}).then((e) => {
						console.log(e);
					});
				});
				if (bicycleCart.length) {
					bicycleCart.map(({ bicycle, price }) => {
						createBicycleInvoiceLines({
							variables: {
								fkSaleId: data.createSale.id,
								fkBicycleId: bicycle.id,
								price: price,
							},
						}).then(() => {
							emptyStore();
						});
					});
				}
			})
			.catch((err) => {
				console.log("error ", err);
			});
	}
	return (
		<Button
			size="large"
			sx={{ alignSelf: "center", marginLeft: 2 }}
			variant="contained"
			onClick={() => postSale()}>
			Pay now
		</Button>
	);
};

export const SaleSummary = () => {
	const selectedCustomer: CustomerInterface = useStore((state) => state.selectedCustomer);
	const productCart: { product: productInterface; amount: number }[] = useStore(
		(state) => state.productCart
	);

	const bicycleCart: { bicycle: bicycleInterface; price: number }[] = useStore(
		(state) => state.bicycleCart
	);
	const [paymentMethod, setPaymentMethod] = useState(0);

	return (
		<Box>
			<Box display={"flex"}>
				<Box borderRadius={2} boxShadow={4} p={2} m={1}>
					<Typography variant="h5">Customer:</Typography>
					<Typography>{selectedCustomer.fullName}</Typography>
					<Typography>{selectedCustomer.email}</Typography>
				</Box>
				{bicycleCart.length ? (
					<Box borderRadius={2} boxShadow={4} p={2} m={1}>
						<Typography variant="h5">Bicycle:</Typography>
						{bicycleCart.map(({ bicycle, price }) => (
							<>
								<Typography>{bicycle.brand.value}</Typography>
								<Typography>{bicycle.type}</Typography>
								<Typography>{bicycle.color.value}</Typography>
								<Typography>{price}</Typography>
							</>
						))}
					</Box>
				) : (
					""
				)}
			</Box>
			{productCart.length ? (
				<Box display={"flex"}>
					<Box borderRadius={2} boxShadow={4} p={2} m={1}>
						<Typography variant="h5">Products:</Typography>
						<Box maxHeight={"200px"} overflow={"auto"} m={1}>
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
										<TableRow key={product.product.id}>
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
					</Box>
				</Box>
			) : (
				""
			)}
			<Box display={"flex"}>
				<Autocomplete
					disablePortal
					options={[
						{ label: "Bank Transfer", id: 4 },
						{ label: "Cash", id: 1 },
						{ label: "Card", id: 3 },
						{ label: "MobilePay", id: 2 },
					]}
					renderOption={(props, option) => {
						return (
							<Box bgcolor={"#eee"} borderRadius={2} p={1} m={1} {...props}>
								{option.label}
							</Box>
						);
					}}
					sx={{ width: 300, mb: 2 }}
					onChange={(event: any, value: { id: number; label: string }) => {
						setPaymentMethod(value.id);
					}}
					renderInput={(props) => (
						<TextField variant={"outlined"} {...props} label="Payment Method" />
					)}
				/>
				{paymentMethod > 0 ? <Pay paymentMethod={paymentMethod} /> : ""}
			</Box>
		</Box>
	);
};
