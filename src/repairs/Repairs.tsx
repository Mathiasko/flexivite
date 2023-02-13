import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import { GET_ALL_REPAIRS } from "../queries.js";
import { useQuery } from "@apollo/client";
import { visuallyHidden } from "@mui/utils";
import { useStore } from "../Store";
import { bicycleInterface, repairInterface } from "../Interfaces";
import { formatDate } from "../helper/dateConversion";
import { EditRepairCard } from "./EditRepairCard.js";

interface Data {
	id: string;
	number: string;
	createdAt: string;
	customer: { fullname: string };
	bicycle: bicycleInterface;
	status: { value: string };
	edit: boolean;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
	if (!array) {
		return [];
	}
	const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) {
			return order;
		}
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: "number",
		numeric: false,
		disablePadding: true,
		label: "Number",
	},
	{
		id: "createdAt",
		numeric: true,
		disablePadding: false,
		label: "Date",
	},
	{
		id: "customer",
		numeric: true,
		disablePadding: false,
		label: "Customer",
	},
	{
		id: "bicycle",
		numeric: true,
		disablePadding: false,
		label: "Bicycle",
	},
	{
		id: "status",
		numeric: true,
		disablePadding: false,
		label: "Status",
	},
	{
		id: "edit",
		numeric: true,
		disablePadding: false,
		label: "Edit",
	},
];

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
	const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? "right" : "left"}
						sortDirection={orderBy === headCell.id ? order : false}>
						<TableSortLabel
							active={orderBy === headCell.id}
							direction={orderBy === headCell.id ? order : "asc"}
							onClick={createSortHandler(headCell.id)}>
							{headCell.label}
							{orderBy === headCell.id ? (
								<Box component="span" sx={visuallyHidden}>
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</Box>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

interface EnhancedTableToolbarProps {
	numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
	const { numSelected } = props;

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				...(numSelected > 0 && {
					bgcolor: (theme) =>
						alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
				}),
			}}>
			{numSelected > 0 ? (
				<Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
					{numSelected} selected
				</Typography>
			) : (
				<Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
					All Repairs
				</Typography>
			)}
			{numSelected > 0 ? (
				<Tooltip title="Delete">
					<IconButton>
						<DeleteIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Tooltip title="Filter list">
					<IconButton>
						<FilterListIcon />
					</IconButton>
				</Tooltip>
			)}
		</Toolbar>
	);
}

export const Repairs = () => {
	const [order, setOrder] = React.useState<Order>("asc");
	const [orderBy, setOrderBy] = React.useState<keyof Data>("id");
	const [selected, setSelected] = React.useState<readonly string[]>([]);
	const setModalContent = useStore(({ setModalContent }) => setModalContent);
	const toggleModal = useStore(({ toggleModal }) => toggleModal);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [open, setOpen] = React.useState(false);
	const { data: repairs } = useQuery(GET_ALL_REPAIRS);
	const repairsLength = repairs?.repairs?.length;

	// console.log("repairs", repairs?.repairs);
	// console.log("repairsLEngth", repairs?.repairs?.length)

	const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
		const isAsc = orderBy === property && order === "asc";
		setOrder(isAsc ? "desc" : "asc");
		setOrderBy(property);
	};

	// const handleClick = (event: React.MouseEvent<unknown>, id: string) => {};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	function canEdit({status, id}: repairInterface) {
		if (
			status.id === "e8f93e09-851a-4c24-adda-07867725ca81" ||
			status.id === "3e487a79-74d2-464c-b695-1d738ac58c48" ||
			status.id === "0c3abf0e-a548-445b-8323-e3f580d54a84"
		) {
			return (
				<IconButton>
					<EditIcon color="disabled" />
				</IconButton>
			);
		} else {
			return (
				<IconButton
					onClick={() => {
						setModalContent(<EditRepairCard id={id} />);
						toggleModal();
					}}>
					<EditIcon color="primary" />
				</IconButton>
			);
		}
	}

	// // Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - repairsLength) : 0;

	return (
		<Box sx={{ width: "100%" }}>
			<Paper sx={{ width: "100%", mb: 2 }}>
				<EnhancedTableToolbar numSelected={selected.length} />
				<TableContainer>
					<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onRequestSort={handleRequestSort}
							rowCount={repairsLength}
						/>
						<TableBody>
							{stableSort(repairs?.repairs, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((repair, index) => {
									return (
										<TableRow
											hover
											// onClick={(event) => handleClick(event, repair?.id)}
											role="checkbox"
											tabIndex={-1}
											key={index}>
											<TableCell component="th" scope="row">
												{repair.number}
											</TableCell>
											<TableCell align="right">{formatDate(repair.createdAt)}</TableCell>
											<TableCell align="right">{repair.customer.fullName}</TableCell>
											<TableCell align="right">
												<strong>{repair.bicycle.brand.value}</strong> <br /> {repair.bicycle.type}
											</TableCell>
											<TableCell align="right">{repair.status.value}</TableCell>
											<TableCell align="right">{canEdit(repair)}</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={repairsLength}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
};
