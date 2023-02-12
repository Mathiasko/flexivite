import { Grid } from "@mui/material";
import { nextInterface } from "../../Interfaces";
import { SelectBicycle } from "./SelectBicycle";
import { SelectCustomer } from "../common/SelectCustomer";

export const SelectCustomerBike = ({ setNextDisabled }: nextInterface) => {
	return (
		<Grid container columns={2}>
			<Grid minWidth={"max-conent"} item xs={1}>
				<SelectCustomer />
			</Grid>
			<Grid minWidth={"max-conent"} item xs={1}>
				<SelectBicycle setNextDisabled={setNextDisabled} />
			</Grid>
		</Grid>
	);
};
