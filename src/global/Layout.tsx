import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { RouteList } from "./RouteList";
import { ThemeOptions } from "@mui/material";
import { ToolBar } from "./ToolBar";
import { NavBar } from "./NavBar";
import ModalEl from "./ModalEl";


const mdTheme: ThemeOptions = createTheme({
	palette: {
		primary: {
			main: "#AB4447",
			dark: "#961C19",
			light: "#FFA5A5",
		},
		secondary: {
			main: "#ffffff",
			light: "#888822",
			dark: "#2266ee",
		},
	},
});

function LayoutContent() {
	return (
		<ThemeProvider theme={mdTheme}>
			<CssBaseline />
			<Box sx={{ display: "flex" }}>
				<NavBar />
				<Box
					component="main"
					height={'100vh'}
					width={'100vw'}
					sx={{
						backgroundColor: (theme) => theme.palette.grey[100],
					}}>
					<Box>
						<ToolBar />
					</Box>
					<Box>
						<RouteList />
					</Box>
				</Box>
				<ModalEl />
			</Box>
		</ThemeProvider>
	);
}

export default function Layout() {
	return <LayoutContent />;
}
