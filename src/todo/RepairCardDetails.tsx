import React from "react";
import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import { CheckList } from "./CheckList";

export const RepairCardDetails = () => {
	return (
		<Container className="box-shadow" sx={{ backgroundColor: "#F5F5F5", borderRadius: "10px" }}>
			<Typography variant="h5" paddingY={2}>
				<strong>Repair No. </strong> RR74292
			</Typography>
			<Grid container columns={3} columnSpacing={5} rowSpacing={6} paddingBottom={3}>
				<Grid item xs={1}>
					<Typography>
						Taken by: <strong> Ferko Jagoda</strong>
					</Typography>
					<Typography marginY={3}>
						Date: <strong>12/12/2012</strong>
					</Typography>
					<Typography>
						Customer: <strong>Palko Rieka</strong>
					</Typography>
					<Typography>
						Bicycle: <strong>Titan Speed, white</strong>
					</Typography>
				</Grid>
				<Grid item xs={1}>
					<Typography>
						<strong>ETA: </strong>2h
					</Typography>
				</Grid>
				<Grid item xs={1}>
					<TextField
						id="outlined-basic"
						label="Comment"
						placeholder="Ved uz nieco napis"
						variant="outlined"
						rows={4}
						fullWidth={true}
						margin={"dense"}
						multiline
					/>
				</Grid>
				<Grid item xs={1} sx={{ maxWidth: "100px" }}>
					<Box
						className={"box-shadow_sm"}
						sx={{ backgroundColor: "white" }}
						padding={2}
						borderRadius={2}>
						<Typography marginBottom={2}>Tasks:</Typography>
						<CheckList />
					</Box>
				</Grid>
				<Grid item xs={1} sx={{ maxWidth: "100px" }}>
					<Box
						className={"box-shadow_sm"}
						sx={{ backgroundColor: "white" }}
						padding={2}
						borderRadius={2}>
						<Typography marginBottom={2}>Parts:</Typography>
						<CheckList />
					</Box>
				</Grid>
				<Grid item xs={1} sx={{ maxWidth: "100px" }}>
					<Box
						className={"box-shadow_sm"}
						sx={{ backgroundColor: "white" }}
						padding={2}
						borderRadius={2}>
						<Typography marginBottom={2}>Extras:</Typography>
						<CheckList />
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};
