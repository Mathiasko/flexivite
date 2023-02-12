import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BuildIcon from '@mui/icons-material/Build';
import PersonIcon from '@mui/icons-material/Person';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LoginIcon from '@mui/icons-material/Login';
import InventoryIcon from '@mui/icons-material/Inventory';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from "react-router-dom";

export const mainListItems = (
	<React.Fragment>
		<Link to="/">
			<ListItemButton>
				<ListItemIcon>
					<HomeIcon />
				</ListItemIcon>
				<ListItemText primary="Home" />
			</ListItemButton>
		</Link>

		<Link to="/todo">
			<ListItemButton>
				<ListItemIcon>
					<ListAltIcon />
				</ListItemIcon>
				<ListItemText primary="ToDo" />
			</ListItemButton>
		</Link>

		<Link to="/repairs">
			<ListItemButton>
				<ListItemIcon>
					<BuildIcon />
				</ListItemIcon>
				<ListItemText primary="Repairs" />
			</ListItemButton>
		</Link>

		<Link to="/sales">
			<ListItemButton>
				<ListItemIcon>
					<ShoppingCartIcon />
				</ListItemIcon>
				<ListItemText primary="Sales" />
			</ListItemButton>
		</Link>

		<Link to="/rentals">
			<ListItemButton>
				<ListItemIcon>
					<ConnectWithoutContactIcon />
				</ListItemIcon>
				<ListItemText primary="Rentals" />
			</ListItemButton>
		</Link>
	</React.Fragment>
);

export const secondaryListItems = (
	<React.Fragment>
		<Link to="/bicycles">
			<ListItemButton>
				<ListItemIcon>
					<PedalBikeIcon />
				</ListItemIcon>
				<ListItemText primary="Bicycles" />
			</ListItemButton>
		</Link>

		<Link to="/products">
			<ListItemButton>
				<ListItemIcon>
					<InventoryIcon />
				</ListItemIcon>
				<ListItemText primary="Products" />
			</ListItemButton>
		</Link>

		<Link to="/tasks">
			<ListItemButton>
				<ListItemIcon>
					<AssignmentIcon />
				</ListItemIcon>
				<ListItemText primary="Tasks" />
			</ListItemButton>
		</Link>

		<Link to="/customers">
			<ListItemButton>
				<ListItemIcon>
					<PeopleIcon />
				</ListItemIcon>
				<ListItemText primary="Customers" />
			</ListItemButton>
		</Link>

		<Link to="/employees">
			<ListItemButton>
				<ListItemIcon>
					<PersonIcon />
				</ListItemIcon>
				<ListItemText primary="Employees" />
			</ListItemButton>
		</Link>
	</React.Fragment>
);

export const tertiaryListItems = (
	<React.Fragment>
		<Link to="/signin">
			<ListItemButton>
				<ListItemIcon>
					<LoginIcon />
				</ListItemIcon>
				<ListItemText primary="SignIn" />
			</ListItemButton>
		</Link>
	</React.Fragment>
);
