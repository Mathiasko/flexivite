import { useMutation } from "@apollo/client";
import { Button, Typography } from "@mui/material";
import { repairInterface } from "../Interfaces";
import { FINISH_REPAIR, TAKE_REPAIR, GET_TODO } from "../queries";
import { useStore } from "../Store.js";

export const ActionButton = ({ repair }: { repair: repairInterface }) => {
	const [takeRepair] = useMutation(TAKE_REPAIR, {
		refetchQueries: [{ query: GET_TODO }],
	});
	const [finishRepair] = useMutation(FINISH_REPAIR, {
		refetchQueries: [{ query: GET_TODO }],
	});
	const [returnRepair] = useMutation(TAKE_REPAIR, {
		refetchQueries: [{ query: GET_TODO }],
	});

	const Condition = ({ repair }: { repair: repairInterface }) => {
		const signedIn = useStore((state) => state?.signedIn);

		switch (repair.status.id) {
			case "be9e0fb7-1277-45c9-8fd1-3f5b8071f0d3": //waiting for repair
				return (
					<Button
						sx={{
							"&hover": {
								backgroundColor: "#225166",
							},
						}}
						variant="contained"
						color="secondary"
						onClick={() =>
							takeRepair({
								variables: {
									id: repair.id,
									status: "7983b8b5-472d-4e07-946a-c157face13a6",
									dateStarted: new Date(),
									fkTechnicianId: signedIn.id,
								},
							})
						}>
						Take Repair
					</Button>
				);
			case "7983b8b5-472d-4e07-946a-c157face13a6": //in progress
				return (
					<Button
						sx={{
							"&hover": {
								backgroundColor: "#0063cc",
							},
						}}
						variant="contained"
						color="secondary"
						onClick={() =>
							finishRepair({
								variables: {
									id: repair.id,
									status: "0c3abf0e-a548-445b-8323-e3f580d54a84",
									dateFinished: new Date(),
								},
							})
						}>
						Finish Repair
					</Button>
				);
			case "0c3abf0e-a548-445b-8323-e3f580d54a84": //waiting for pickup
				return (
					<Button
						sx={{
							"&hover": {
								backgroundColor: "#0063cc",
							},
						}}
						variant="contained"
						color="secondary">
						Return Repair
					</Button>
				);
			default:
				return <Typography variant="h4">ERR</Typography>;
		}
	};

	return <Condition repair={repair} />;
};
