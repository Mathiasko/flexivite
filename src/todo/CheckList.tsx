import {
	Avatar,
	Checkbox,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
} from "@mui/material";
import React, { useState } from "react";

export const CheckList = () => {
	const [checked, setChecked] = useState([1]);

	const handleToggle = (value: number) => () => {
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
			{[0, 1, 2, 3].map((value) => {
				const labelId = `checkbox-list-secondary-label-${value}`;
				return (
					<ListItem key={value} disablePadding>
						<ListItemButton onClick={handleToggle(value)} >
							<ListItemText id={labelId} primary={`Line item ${value + 1}`} />
							<Checkbox
								edge="end"
								onChange={handleToggle(value)}
								checked={checked.indexOf(value) !== -1}
								inputProps={{ "aria-labelledby": labelId }}
							/>
						</ListItemButton>
					</ListItem>
				);
			})}
		</List>
	);
};
