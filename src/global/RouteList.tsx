import Dashboard from "../dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import SignIn from "../signIn/SignIn";
import { ToDo } from "../todo/ToDo";
import { Rentals } from "../rentals/Rentals";
import { Bicycles } from "../bicycles/Bicycles";
import { Products } from "../products/Products";
import { Customers } from "../customers/Customers";
import { Employees } from "../employees/Employees";
import { Repairs } from "../reapirs/Repairs";
import { Sales } from "../sales/Sales";

export const RouteList = () => {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />}></Route>
			<Route path="/todo" element={<ToDo />}></Route>
			<Route path="/repairs" element={<Repairs />}></Route>
			<Route path="/sales" element={<Sales />}></Route>
			<Route path="/rentals" element={<Rentals />}></Route>
			<Route path="/bicycles" element={<Bicycles />}></Route>
			<Route path="/products" element={<Products />}></Route>
			<Route path="/customers" element={<Customers />}></Route>
			<Route path="/employees" element={<Employees />}></Route>
			<Route path="/signin" element={<SignIn />}></Route>
		</Routes>
	);
};
