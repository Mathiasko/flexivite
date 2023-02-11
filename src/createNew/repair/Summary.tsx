//@ts-nocheck
import { useMutation } from "@apollo/client";
import {
	Box,
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import {
	bicycleInterface,
	CustomerInterface,
	productInterface,
	taskInterface,
} from "../../Interfaces.js";
import { ADD_PRODUCT_INVOICE_LINE, ADD_TASK_INVOICE_LINE, POST_NEW_REPAIR } from "../../queries.js";
import { useStore } from "../../Store.js";

export const Summary = () => {
	const emptyStore: Function = useStore((state) => state.emptyStore);
	const taskCart: taskInterface[] = useStore((state) => state.taskCart);
	const productCart: { product: productInterface; amount: number }[] = useStore(
		(state) => state.productCart
	);
	const signedIn = useStore((state) => state.signedIn);
	const selectedCustomer: CustomerInterface = useStore((state) => state.selectedCustomer);
	const selectedBicycle: bicycleInterface = useStore((state) => state.selectedBicycle);
	const [createRepair] = useMutation(POST_NEW_REPAIR);
	const [createTaskInvoiceLine] = useMutation(ADD_TASK_INVOICE_LINE);
	const [createProductInvoiceLine] = useMutation(ADD_PRODUCT_INVOICE_LINE);

	function postRepair() {
		createRepair({
			variables: {
				fkBicycleId: selectedBicycle.id,
				fkCustomerId: selectedCustomer.id,
				fkTakenBy: signedIn.id,
				comment: "comment",
				status: "be9e0fb7-1277-45c9-8fd1-3f5b8071f0d3",
			},
		})
			.then(({ data }) => {
				console.log("createRepair", data);
				taskCart?.map((task) => {
					createTaskInvoiceLine({
						variables: {
							fkRepairId: data.createRepair.id,
							fkTask: task.id,
							amount: 1,
							time: task.duration,
							price: 123,
						},
					}).then(({ data }) => {
						console.log("createTaskInvoiceLine", data);
					});
				});
				productCart?.map((item) => {
					createProductInvoiceLine({
						variables: {
							fkRepairId: data.createRepair.id,
							fkProductId: item.product.id,
							amount: item.amount,
							price: 1,
						},
					}).then(({ data }) => {
						console.log("createProductInvoiceLine", data);
					});
				});
			})
			.then(() => {
				emptyStore();
			})
			.catch((err) => {
				console.error(err);
			});
	}

	return (
		<Box>
			<Box display={"flex"}>
				<Box borderRadius={2} boxShadow={4} p={2} m={1}>
					<Typography variant="h5">Customer:</Typography>
					<Typography>{selectedCustomer.fullName}</Typography>
					<Typography>{selectedCustomer.email}</Typography>
				</Box>
				<Box borderRadius={2} boxShadow={4} p={2} m={1}>
					<Typography variant="h5">Bicycle:</Typography>
					<Typography>{selectedBicycle.brand.value}</Typography>
					<Typography>{selectedBicycle.type}</Typography>
					<Typography>{selectedBicycle.color.value}</Typography>
				</Box>
			</Box>
			<Box display={"flex"}>
				<Box borderRadius={2} boxShadow={4} p={2} m={1}>
					<Typography variant="h5">Tasks:</Typography>
					<Box maxHeight={"200px"} overflow={"auto"} m={1}>
						<Table size="small">
							<TableHead sx={{ position: "sticky", top: 0, backgroundColor: "#FFF" }}>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>Category</TableCell>
									<TableCell>Duration</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{taskCart.map((task) => (
									<TableRow key={task.id}>
										<TableCell>{task.name}</TableCell>
										<TableCell>{task.taskCategory.name}</TableCell>
										<TableCell>{task.duration}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</Box>
				</Box>

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
			<Button variant="outlined" color="primary" onClick={() => postRepair()}>
				Send it
			</Button>
		</Box>
	);
};
