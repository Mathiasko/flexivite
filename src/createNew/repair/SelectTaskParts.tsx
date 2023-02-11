import { Grid } from "@mui/material";
import { Products } from "../common/Products";
import { Tasks } from "./Tasks";
import { TaskCart } from "./TaskCart";
import { ProductCart } from "../common/ProductCart";
import { SearchTasks } from "./SearchTasks";
import { SearchProducts } from "../common/SearchProducts";

interface selectTaskPartsInterface {
	setNextDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SelectTaskParts = ({ setNextDisabled }: selectTaskPartsInterface) => {
	return (
		<Grid container columns={2}>
			<Grid minWidth={'max-conent'} item xs={1}>
        <SearchTasks/>
				<Tasks setNextDisabled={setNextDisabled} />
			</Grid>
			<Grid minWidth={'max-conent'} item xs={1}>
        <SearchProducts/>
				<Products setNextDisabled={setNextDisabled} />
			</Grid>
			<Grid minWidth={'max-conent'} item xs={1}>
				<TaskCart />
			</Grid>
			<Grid minWidth={'max-conent'} item xs={1}>
				<ProductCart />
			</Grid>
		</Grid>
	);
};
