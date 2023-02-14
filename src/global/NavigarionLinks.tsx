import * as React from "react";
import { ListItemButton, ListItemIcon, ListItemText, Divider, List } from "@mui/material";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BuildIcon from "@mui/icons-material/Build";
import PersonIcon from "@mui/icons-material/Person";
import PedalBikeIcon from "@mui/icons-material/PedalBike";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LoginIcon from "@mui/icons-material/Login";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "react-router-dom";
import { useStore } from "../Store.js";

export const NavigationLinks = () => {
	const signedIn = useStore(({ signedIn }) => signedIn);
	const logOut = useStore(({ logOut }) => logOut);

	return (
		<List component="nav">
			<Link to="/">
				<ListItemButton disabled={!signedIn}>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItemButton>
			</Link>

			<Link to="/todo">
				<ListItemButton disabled={!signedIn}>
					<ListItemIcon>
						<ListAltIcon />
					</ListItemIcon>
					<ListItemText primary="ToDo" />
				</ListItemButton>
			</Link>

			<Link to="/repairs">
				<ListItemButton disabled={!signedIn}>
					<ListItemIcon>
						<BuildIcon />
					</ListItemIcon>
					<ListItemText primary="Repairs" />
				</ListItemButton>
			</Link>

			<Link to="/sales">
				<ListItemButton disabled={!signedIn}>
					<ListItemIcon>
						<ShoppingCartIcon />
					</ListItemIcon>
					<ListItemText primary="Sales" />
				</ListItemButton>
			</Link>

			<Link to="/rentals">
				<ListItemButton disabled={!signedIn}>
					<ListItemIcon>
						<ConnectWithoutContactIcon />
					</ListItemIcon>
					<ListItemText primary="Rentals" />
				</ListItemButton>
			</Link>

			<Divider sx={{ my: 1 }} />
			<Link to="/bicycles">
				<ListItemButton disabled={!signedIn}>
					<ListItemIcon>
						<PedalBikeIcon />
					</ListItemIcon>
					<ListItemText primary="Bicycles" />
				</ListItemButton>
			</Link>

			<Link to="/products">
				<ListItemButton disabled={!signedIn}>
					<ListItemIcon>
						<InventoryIcon />
					</ListItemIcon>
					<ListItemText primary="Products" />
				</ListItemButton>
			</Link>

			<Link to="/tasks">
				<ListItemButton disabled={!signedIn}>
					<ListItemIcon>
						<AssignmentIcon />
					</ListItemIcon>
					<ListItemText primary="Tasks" />
				</ListItemButton>
			</Link>

			<Link to="/customers">
				<ListItemButton disabled={!signedIn}>
					<ListItemIcon>
						<PeopleIcon />
					</ListItemIcon>
					<ListItemText primary="Customers" />
				</ListItemButton>
			</Link>

			<Link to="/employees">
				<ListItemButton disabled={!signedIn}>
					<ListItemIcon>
						<PersonIcon />
					</ListItemIcon>
					<ListItemText primary="Employees" />
				</ListItemButton>
			</Link>
			<Divider sx={{ my: 1 }} />
			<div hidden={signedIn}>
				<Link to="/signin">
					<ListItemButton>
						<ListItemIcon>
							<LoginIcon />
						</ListItemIcon>
						<ListItemText primary="SignIn" />
					</ListItemButton>
				</Link>
			</div>
			<div hidden={!signedIn}>
				<ListItemButton onClick={() => logOut()}>
					<ListItemIcon>
						<LoginIcon />
					</ListItemIcon>
					<ListItemText primary={`LogOut ${signedIn?.name}`} />
				</ListItemButton>
			</div>
		</List>
	);
};
