// @ts-nocheck
import React, { useState } from "react";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import styled from "@emotion/styled";
import { mainListItems } from "./listItems";
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

// import * as React from 'react';
// import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import MuiDrawer from '@mui/material/Drawer';
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import { SearchBar } from "./SearchBar";
// import Repair from "../createNew/repair/Repair";
// import { Button } from "@mui/material";
// import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";


// const drawerWidth = 240;

// const openedMixin = (theme: Theme): CSSObject => ({
// 	width: drawerWidth,
// 	transition: theme.transitions.create('width', {
// 		easing: theme.transitions.easing.sharp,
// 		duration: theme.transitions.duration.enteringScreen,
// 	}),
// 	overflowX: 'hidden',
// });

// const closedMixin = (theme: Theme): CSSObject => ({
// 	transition: theme.transitions.create('width', {
// 		easing: theme.transitions.easing.sharp,
// 		duration: theme.transitions.duration.leavingScreen,
// 	}),
// 	overflowX: 'hidden',
// 	width: `calc(${theme.spacing(7)} + 1px)`,
// 	[theme.breakpoints.up('sm')]: {
// 		width: `calc(${theme.spacing(8)} + 1px)`,
// 	},
// });

// const DrawerHeader = styled('div')(({ theme }) => ({
// 	display: 'flex',
// 	alignItems: 'center',
// 	justifyContent: 'flex-end',
// 	padding: theme.spacing(2),
// 	// necessary for content to be below app bar
// 	...theme.mixins.toolbar,
// }));

// interface AppBarProps extends MuiAppBarProps {
// 	open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
// 	shouldForwardProp: (prop) => prop !== 'open',
// })<AppBarProps>(({ theme, open }) => ({
// 	zIndex: theme.zIndex.drawer + 1,
// 	transition: theme.transitions.create(['width', 'margin'], {
// 		easing: theme.transitions.easing.sharp,
// 		duration: theme.transitions.duration.leavingScreen,
// 	}),
// 	...(open && {
// 		marginLeft: drawerWidth,
// 		width: `calc(100% - ${drawerWidth}px)`,
// 		transition: theme.transitions.create(['width', 'margin'], {
// 			easing: theme.transitions.easing.sharp,
// 			duration: theme.transitions.duration.enteringScreen,
// 		}),
// 	}),
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
// 	({ theme, open }) => ({
// 		width: drawerWidth,
// 		flexShrink: 0,
// 		whiteSpace: 'nowrap',
// 		boxSizing: 'border-box',
// 		...(open && {
// 			...openedMixin(theme),
// 			'& .MuiDrawer-paper': openedMixin(theme),
// 		}),
// 		...(!open && {
// 			...closedMixin(theme),
// 			'& .MuiDrawer-paper': closedMixin(theme),
// 		}),
// 	}),
// );

// export const NavBar = () => {
// 	const theme = useTheme();
// 	const [open, setOpen] = React.useState(false);

// 	const handleDrawerOpen = () => {
// 		setOpen(true);
// 	};

// 	const handleDrawerClose = () => {
// 		setOpen(false);
// 	};

// 	return (
// 		<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
// 			<CssBaseline />
// 			<AppBar position="fixed" open={open}>
// 				<Toolbar>
// 					<Box
// 						display={"flex"}
// 						alignItems={"center"}
// 						justifyContent={"space-between"}>
// 						<IconButton
// 							color="inherit"
// 							aria-label="open drawer"
// 							onClick={handleDrawerOpen}
// 							edge="start"
// 							sx={{
// 								marginRight: 5,
// 								...(open && { display: 'none' }),
// 							}}
// 						>
// 							<MenuIcon />
// 						</IconButton>
// 						<Typography variant="h3" margin={1}>
// 							Title
// 						</Typography>
// 						<SearchBar />
// 						<Box>
// 							<Button
// 								onClick={() => {
// 									toggleModal();
// 									setModalContent(<Repair />);
// 								}}
// 								variant="contained"
// 								sx={{ padding: "15px 20px" }}>
// 								<AddCircleRoundedIcon /> <Typography marginLeft={1}>ADD NEW</Typography>
// 							</Button>
// 						</Box>
// 					</Box>
// 				</Toolbar>
// 			</AppBar>
// 			<Drawer variant="permanent" open={open}>
// 				<DrawerHeader>
// 					<IconButton onClick={handleDrawerClose}>
// 						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
// 					</IconButton>
// 				</DrawerHeader>
// 				<Divider />
// 				{mainListItems}
// 			</Drawer>
// 		</Box>
// 	);
// }
