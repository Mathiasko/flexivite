import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./global/Layout";

function App() {
	const client = new ApolloClient({
		uri: "https://www.kalinovskyklin.xyz:3000/graphql",
		// uri: 'https://localhost:3000/graphql',
		cache: new InMemoryCache(),
	});
	return (
		<Router>
			<ApolloProvider client={client}>
				<Layout />
			</ApolloProvider>
		</Router>
	);
}

export default App;
