import { useQuery } from "@apollo/client";
import React from "react";
import { GET_BICYCLE_PROPS } from "../queries";
import { useStore } from "../Store.js";

export const QueryData = () => {
	const { data: bicycleProps, loading } = useQuery(GET_BICYCLE_PROPS);
	const storeBicycleProps = useStore((state: any) => state.storeBicycleProps);

	bicycleProps && !loading ? storeBicycleProps(bicycleProps.bicycleProps) : "";

	return <></>;
};
