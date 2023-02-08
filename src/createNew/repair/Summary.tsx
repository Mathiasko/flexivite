import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { useStore } from "../../Store.js";

export const Summary = () => {
	const taskCart = useStore((state) => state.taskCart);
	const productCart = useStore((state) => state.productCart);
	return (
		<Box>
			<Box display={"flex"}>
				<Box borderRadius={2} boxShadow={4} p={2} m={1}>
					<Typography variant="h5">Customer:</Typography>
					<Typography>Palko Prochazka</Typography>
					<Typography>palko.prochazka@gmail.com</Typography>
				</Box>
				<Box borderRadius={2} boxShadow={4} p={2} m={1}>
					<Typography variant="h5">Bicycle:</Typography>
					<Typography>Popokatepetl</Typography>
					<Typography>Red Dragon</Typography>
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
		</Box>
	);
};
