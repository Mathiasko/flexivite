// @ts-nocheck
import React, { useState } from "react";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import styled from "@emotion/styled";
import { mainListItems, secondaryListItems } from "./listItems";
import { Box, ThemeOptions, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open }) => ({
		"& .MuiDrawer-paper": {
			position: "relative",
			whiteSpace: "nowrap",
			width: drawerWidth,
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
			boxSizing: "border-box",
			...(!open && {
				overflowX: "hidden",
				transition: theme.transitions.create("width", {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.leavingScreen,
				}),
				width: theme.spacing(7),
				[theme.breakpoints.up("sm")]: {
					width: theme.spacing(9),
				},
			}),
		},
	})
);

export const NavBar = () => {
	const [open, setOpen] = useState(true);
	const toggleDrawer = () => {
		setOpen(!open);
	};
	const theme = useTheme();
	return (
		<Drawer theme={theme} variant="permanent" open={open}>
			<Toolbar
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					px: [1],
				}}>
				<Typography
					variant="h6"
					noWrap
					component="div"
					sx={{ display: { sm: 'none', md: 'block' } }}
				>
					FlexiFix
				</Typography>
				<IconButton onClick={toggleDrawer}>
					<ChevronLeftIcon />
				</IconButton>
			</Toolbar>
			<List component="nav">
				{mainListItems}
				<Divider sx={{ my: 1 }} />

			</List>
		</Drawer>
	);
};
