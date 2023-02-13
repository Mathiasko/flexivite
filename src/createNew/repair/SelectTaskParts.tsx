import { Button, Grid } from "@mui/material";
import { Products } from "../product/Products";
import { Tasks } from "./Tasks";
import { TaskCart } from "./TaskCart";
import { ProductCart } from "../product/ProductCart";
import { SearchTasks } from "./SearchTasks";
import { SearchProducts } from "../product/SearchProducts";
import { useStore } from "../../Store.js";
import { useMutation } from "@apollo/client";
import {
	ADD_PRODUCT_INVOICE_LINE,
	ADD_TASK_INVOICE_LINE,
	GET_PRODUCT_INVOICE_LINES,
	GET_TASK_INVOICE_LINES,
} from "../../queries";

export const SelectTaskParts = ({ repairId }: { repairId?: string }) => {
	const tasks = useStore((state) => state.taskCart);
	const products = useStore((state) => state.productCart);
	const emptyStore = useStore((state) => state.emptyStore);

	const [createTaskInvoiceLine] = useMutation(ADD_TASK_INVOICE_LINE, {
		refetchQueries: [{ query: GET_TASK_INVOICE_LINES, variables: { repairId } }],
	});
	const [createProductInvoiceLine] = useMutation(ADD_PRODUCT_INVOICE_LINE, {
		refetchQueries: [{ query: GET_PRODUCT_INVOICE_LINES, variables: { repairId } }],
	});

	function handleUpdateRepair() {
		tasks.length
			? tasks.map((task) => {
					createTaskInvoiceLine({
						variables: {
							fkRepairId: repairId,
							fkTask: task.id,
							amount: 1,
							time: task.duration,
							price: 123,
						},
					}).then((res) => {
						console.log(res);
						emptyStore();
					});
			  })
			: null;
		products.length
			? products.map((item) => {
					createProductInvoiceLine({
						variables: {
							fkRepairId: repairId,
							fkProductId: item.product.id,
							amount: item.amount,
							price: item.product.sellPrice,
						},
					}).then((res) => {
						console.log(res);
						emptyStore();
					});
			  })
			: null;
	}

	return (
		<Grid container columns={2}>
			<Grid minWidth={"max-conent"} item xs={1}>
				<SearchTasks />
				<Tasks />
			</Grid>
			<Grid minWidth={"max-conent"} item xs={1}>
				<SearchProducts />
				<Products />
			</Grid>
			<Grid minWidth={"max-conent"} item xs={1}>
				<TaskCart repairId={repairId} />
			</Grid>
			<Grid minWidth={"max-conent"} item xs={1}>
				<ProductCart repairId={repairId} />
			</Grid>
			{repairId ? (
				<Grid item xs={2}>
					<Button
						onClick={() => {
							handleUpdateRepair();
						}}>
						Update Repair
					</Button>
				</Grid>
			) : (
				""
			)}
		</Grid>
	);
};
