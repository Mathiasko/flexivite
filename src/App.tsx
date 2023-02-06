import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./global/Layout";

function App() {
	return (
		<Router>
			<div className="App">
				<Layout />
			</div>
		</Router>
	);
}

export default App;
