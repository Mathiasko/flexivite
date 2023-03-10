//@ts-nocheck
import { useLazyQuery } from "@apollo/client";
import {
	Box,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
} from "@mui/material";
import React, { useState, FC } from "react";
import { CustomerInterface } from "../../Interfaces.js";
import { GET_CUSTOMER } from "../../queries.js";
import { useStore } from "../../Store.js";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { NewCustomerModal } from "./NewCustomerModal.js";
interface searchCustomerInterface {
	setCustomers: React.Dispatch<React.SetStateAction<CustomerInterface[] | undefined>>;
}

const SearchCustoemer = ({ setCustomers }: searchCustomerInterface) => {
	const [searchCustoemer] = useLazyQuery(GET_CUSTOMER);
	const [modal, setModal] = useState(false);
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
		<Box display={"flex"} alignItems="center">
			<TextField
				variant={"outlined"}
				placeholder="Search for Customer"
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					handleChange(e.target);
				}}
			/>
			<IconButton
				sx={{ marginLeft: 1 }}
				onClick={() => {
					setModal(true);
				}}>
				<AddCircleOutlineRoundedIcon color="primary" fontSize="large" />
			</IconButton>
			{modal ? <NewCustomerModal setModal={setModal} /> : ""}
		</Box>
	);
};

export const SelectCustomer: FC = () => {
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [customers, setCustomers] = useState<CustomerInterface[]>();
	const selectCustomer = useStore((state) => state.selectCustomer);
	const selectedCustomer = useStore((state) => state.selectedCustomer);

	const handleListItemClick = (index: number, item: CustomerInterface) => {
		setSelectedIndex(index);
		selectCustomer(item);
	};

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
