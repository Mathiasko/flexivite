import { Box, Divider, List, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { useStore } from "../../Store.js";
export const SelectBicycle = ({setNextDisabled}) => {
	const [selectedIndex, setSelectedIndex] = useState(0);

	const handleListItemClick = (index: number) => {
		setSelectedIndex(index);
		selectBicycle(index);
    setNextDisabled(false)
	};
	const list = ["abc", "def", "ghi"];

	const selectBicycle = useStore((state) => state.selectBicycle);

	return (
		<Box sx={{ width: "100%" }}>
			<List component="nav" aria-label="main mailbox folders">
				{list.map((item, index) => (
					<>
						<ListItemButton
							selected={selectedIndex === index}
							onClick={() => handleListItemClick(index)}>
							<ListItemText primary={item} />
						</ListItemButton>
						<Divider />
					</>
				))}
			</List>
		</Box>
	);
};
