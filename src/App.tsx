import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard";
import SignIn from "./signIn/SignIn";

function App() {
	return (
		<Router>
			<div className="App">
				<ul>
					<li>
						<Link to="/">Dashboard</Link>
					</li>
					<li>
						<Link to="/about">SignIn</Link>
					</li>
				</ul>
				<Routes>
					<Route path="/" element={<Dashboard />}></Route>
					<Route path="/about" element={<SignIn />}></Route>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
