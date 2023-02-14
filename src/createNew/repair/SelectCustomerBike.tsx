import { Grid } from "@mui/material";
import { SelectBicycle } from "../bicycle/SelectBicycle";
import { SelectCustomer } from "../customer/SelectCustomer";

export const SelectCustomerBike = () => {
	return (
		<Grid container columns={2}>
			<Grid minWidth={"max-conent"} item xs={1}>
				<SelectCustomer />
			</Grid>
			<Grid minWidth={"max-conent"} item xs={1}>
				<SelectBicycle />
			</Grid>
		</Grid>
	);
};
