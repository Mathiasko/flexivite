import { Checkbox, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { productInvoiceLinesInterface as PILI } from "../Interfaces";

export const CheckListProduct = ({ productInvoiceLines }: { productInvoiceLines: PILI[] }) => {
	const [checked, setChecked] = useState([]);

	const handleToggle = (value: string) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];
		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}
		setChecked(newChecked);
	};

	return (
		<List dense sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
			{productInvoiceLines?.map(({ amount, id, price, product }: PILI, index) => {
				return (
					<ListItem key={id} disablePadding>
						<ListItemButton onClick={handleToggle(id)}>
							<ListItemText id={id} primary={index + 1} />
							<ListItemText id={id} secondary={product.name} />
							<ListItemText id={id} secondary={product.productBrand.value} />
							<ListItemText id={id} secondary={product.productCategory.value} />
							<Checkbox edge="end" checked={checked.indexOf(id) !== -1} />
						</ListItemButton>
					</ListItem>
				);
			})}
		</List>
	);
};
