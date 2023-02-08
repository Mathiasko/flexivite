import { Grid } from "@mui/material";
import { SelectBicycle } from "./SelectBicycle";
import { SelectCustomer } from "./SelectCustomer";

interface SelectCustomerBikeInterface {
	setNextDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SelectCustomerBike = ({ setNextDisabled }: SelectCustomerBikeInterface) => {
	return (
		<Grid container columns={2}>
			<Grid minWidth={"max-conent"} item xs={1}>
				<SelectCustomer />,
			</Grid>
			<Grid minWidth={"max-conent"} item xs={1}>
				<SelectBicycle setNextDisabled={setNextDisabled} />,
			</Grid>
		</Grid>
	);
};
