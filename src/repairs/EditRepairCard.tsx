import React from "react";
import { useQuery } from "@apollo/client";
import { GET_REPAIR } from "../queries";
import { SelectTaskParts } from "../createNew/repair/SelectTaskParts";

export const EditRepairCard = ({ id }: { id: string }) => {
	return <SelectTaskParts repairId={id} />;
};
