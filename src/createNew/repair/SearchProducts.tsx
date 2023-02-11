//@ts-nocheck
import React, { useState } from "react";
import { useStore } from "../../Store.js";
import { useLazyQuery } from "@apollo/client";
import { TextField } from "@mui/material";
import { GET_PRODUCTS_BY_NAME } from "../../queries";

export const SearchProducts = () => {
	const [searchProduct] = useLazyQuery(GET_PRODUCTS_BY_NAME);

	const storeProducts = useStore((state) => state.storeProducts);

	function handleChange({ value }: HTMLInputElement) {
		searchProduct({ variables: { name: value } })
			.then(({ data }) => {
				storeProducts(data.productsByName);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	return (
		<TextField
			autoFocus
			variant={"outlined"}
			placeholder="Search for Product"
			onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
				handleChange(e.target);
			}}
		/>
	);
};
