import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useLazyQuery } from "@apollo/client";
import { LOGIN } from "../queries";
import { useStore } from "../Store.js";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
	const [login] = useLazyQuery(LOGIN);
	const signIn = useStore(({ signIn }) => signIn);

	const navigate = useNavigate();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		login({ variables: { name: data.get("name"), password: data.get("password") } })
			.then(({ data }) => {
				signIn(data.comparePassword.employee);
				navigate("/todo");
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="name"
						label="Name"
						name="name"
						autoComplete="jakopreco"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						id="password"
						type="password"
						autoComplete="current-password"
					/>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						Sign In
					</Button>
				</Box>
			</Box>
		</Container>
	);
}
