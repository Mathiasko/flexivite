import { Box, Divider, List, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { useStore } from "../../Store.js";

export const SelectCustomer = ({setNextDisabled}) => {
	const [selectedIndex, setSelectedIndex] = useState(0);

	const handleListItemClick = (index: number, item:string) => {
		setSelectedIndex(index);
    selectCustomer(item)
    setNextDisabled(false)
	};
	const list = ["Jano", "Fero", "Ondro"];
	const selectCustomer = useStore((state) => state.selectCustomer);

	return (
		<Box sx={{ width: "100%" }}>
			<List component="nav" aria-label="main mailbox folders">
				{list.map((item, index) => (
					<>
						<ListItemButton
							selected={selectedIndex === index}
							onClick={() => handleListItemClick(index, item)}>
							<ListItemText primary={item} />
						</ListItemButton>
						<Divider />
					</>
				))}
			</List>
		</Box>
	);
};
