import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useStore } from "../../Store.js";
import { Box } from "@mui/system";
import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCTS_BY_CATEGORY } from "../../queries.js";
interface taskInterface {
	id: string;
	name: string;
	category: { id: string; name: string };
	fkProductCategoryId: string;
	duration: number;
}

export function Tasks({ setNextDisabled }) {
	const [searchProduct] = useLazyQuery(GET_PRODUCTS_BY_CATEGORY);
	const addTaskToCart = useStore((state) => state.addTaskToCart);
	const storeProducts = useStore((state) => state.storeProducts);

	const handleClick = (item: taskInterface) => {
		setNextDisabled(false);
		addTaskToCart(item);
		searchProduct({ variables: { categoryId: item.fkProductCategoryId } })
			.then(({ data }) => {
				console.log("result.productsByCategory", data.productsByCategory);
				storeProducts(data.productsByCategory);
			})
			.catch((err) => {
				console.error(err);
			});
	};
	const tasks = useStore((state) => state.tasks);
	return (
		<Box boxShadow={3} borderRadius={2} height={"200px"} overflow={"auto"} m={1}>
			<Table size="small">
				<TableHead sx={{ position: "sticky", top: 0, backgroundColor: "#FFF" }}>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Category</TableCell>
						<TableCell>Duration</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{tasks.length > 0
						? tasks.map((task) => (
								<TableRow
									key={task.id}
									hover
									sx={{ cursor: "pointer" }}
									onClick={() => handleClick(task)}>
									<TableCell>{task.name}</TableCell>
									<TableCell>{task.taskCategory.name}</TableCell>
									<TableCell>{task.duration}</TableCell>
								</TableRow>
						  ))
						: ""}
				</TableBody>
			</Table>
		</Box>
	);
}
