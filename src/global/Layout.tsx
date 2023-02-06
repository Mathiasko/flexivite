import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems, secondaryListItems } from "./listItems";
import { RouteList } from "./RouteList";
import { Button, ThemeOptions, Typography } from "@mui/material";
import { useState } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const mdTheme: ThemeOptions = createTheme({
	palette: {
		primary: {
			main: "#AB4447",
			dark: "#961C19",
			light: "#FFA5A5",
		},
		secondary: {
			main: "#ffffff",
		},
	},
});

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

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

function LayoutContent() {
	const [open, setOpen] = useState(true);
	const toggleDrawer = () => {
		setOpen(!open);
	};

	return (
		<ThemeProvider theme={mdTheme}>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<Drawer variant="permanent" open={open}>
					<Toolbar
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-end",
							px: [1],
						}}>
						<IconButton onClick={toggleDrawer}>
							<ChevronLeftIcon />
						</IconButton>
					</Toolbar>
					<List component="nav">
						{mainListItems}
						<Divider sx={{ my: 1 }} />
						{secondaryListItems}
					</List>
				</Drawer>
				<Box
					component="main"
					sx={{
						backgroundColor: (theme) => theme.palette.grey[100],
						flexGrow: 1,
						height: "100vh",
						overflow: "auto",
					}}>
					<Box
						display={"flex"}
						marginX={2}
						marginY={1}
						alignItems={"center"}
						justifyContent={"space-between"}>
						<Typography variant="h3" margin={1}>
							To-Do
						</Typography>
						<Box>
							<Button variant="contained" sx={{ padding: "15px 20px" }}>
								<AddCircleRoundedIcon /> <Typography marginLeft={1}>ADD NEW</Typography>
							</Button>
						</Box>
					</Box>
					<RouteList />
				</Box>
			</Box>
		</ThemeProvider>
	);
}

export default function Layout() {
	return <LayoutContent />;
}
