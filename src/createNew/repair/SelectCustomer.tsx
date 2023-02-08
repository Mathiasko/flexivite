import { useLazyQuery } from "@apollo/client";
import { Box, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import React, { useState } from "react";
import { GET_CUSTOMER } from "../../queries.js";
import { useStore } from "../../Store.js";

const SearchCustoemer = ({ setCustomers }) => {
	const [searchCustoemer, { called, loading, data }] = useLazyQuery(GET_CUSTOMER);

	function handleChange({ value }: HTMLInputElement) {
		searchCustoemer({ variables: { name: value } })
			.then(({ data }) => {
				setCustomers(data.customerByName);
			})
			.catch((err) => {
				console.error(err);
			});
	}
	return (
		<TextField
			autoFocus
			variant={"outlined"}
			placeholder="Search for Customer"
			onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
				handleChange(e.target);
			}}
		/>
	);
};

export const SelectCustomer = () => {
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [customers, setCustomers] = useState();
	const selectCustomer = useStore((state) => state.selectCustomer);
	const selectedCustomer = useStore((state) => state.selectedCustomer);

	const handleListItemClick = (index: number, item: string) => {
		setSelectedIndex(index);
		selectCustomer(item);
	};
	console.log("customers", customers);

	return (
		<Box>
			<SearchCustoemer setCustomers={setCustomers} />
			<Box height={"200px"} overflow={"auto"} m={1}>
				<Table size="small">
					<TableHead sx={{ position: "sticky", top: 0, height: "100%", backgroundColor: "#FFF" }}>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Email</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{customers ? (
							customers.map((c, index: number) => (
								<TableRow
									key={index}
									hover
									selected={selectedIndex === index}
									sx={{ cursor: "pointer" }}
									onClick={() => handleListItemClick(index, c)}>
									<TableCell>{c.fullName}</TableCell>
									<TableCell>{c.email}</TableCell>
								</TableRow>
							))
						) : selectedCustomer ? (
							<TableRow hover>
								<TableCell>{selectedCustomer?.fullName}</TableCell>
								<TableCell>{selectedCustomer?.email}</TableCell>
							</TableRow>
						) : (
							""
						)}
					</TableBody>
				</Table>
			</Box>
		</Box>
	);
};
