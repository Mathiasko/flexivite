import { gql } from "@apollo/client";

export const GET_TODO = gql`
	query RepairsInProgress {
		repairsDone {
			id
			number
			status {
				value
				id
			}
			bicycle {
				id
				type
				name
				color {
					value
					id
				}
				brand {
					value
					id
				}
				gearsystem {
					id
					value
				}
				tires {
					id
					value
				}
			}
			customer {
				id
				fullName
				email
			}
			takenBy {
				id
				name
			}
			technician {
				id
				name
			}
			taskInvoiceLines {
				id
				task {
					id
					name
					taskCategory {
						id
						name
					}
					duration
				}
				time
				price
			}
			productInvoiceLines {
				id
				product {
					id
					productBrand {
						id
						value
					}
					productCategory {
						id
						value
					}
					name
					type
					ean
					buyPrice
				}
				amount
				price
			}
			dateStarted
			dateFinished
			comment
			createdAt
		}
		repairsInProgress {
			id
			number
			status {
				value
				id
			}
			bicycle {
				id
				type
				name
				color {
					value
					id
				}
				brand {
					value
					id
				}
				gearsystem {
					id
					value
				}
				tires {
					id
					value
				}
			}
			customer {
				id
				fullName
				email
			}
			takenBy {
				id
				name
			}
			technician {
				id
				name
			}
			taskInvoiceLines {
				id
				task {
					id
					name
					taskCategory {
						id
						name
					}
					duration
				}
				time
				price
			}
			productInvoiceLines {
				id
				product {
					id
					productBrand {
						id
						value
					}
					productCategory {
						id
						value
					}
					name
					type
					ean
					buyPrice
				}
				amount
				price
			}
			dateStarted
			comment
			createdAt
		}
		repairsToDo {
			id
			number
			status {
				value
				id
			}
			bicycle {
				id
				type
				name
				color {
					value
					id
				}
				brand {
					value
					id
				}
				gearsystem {
					id
					value
				}
				tires {
					id
					value
				}
			}
			customer {
				id
				fullName
				email
			}
			takenBy {
				id
				name
			}
			taskInvoiceLines {
				id
				task {
					id
					name
					taskCategory {
						id
						name
					}
					duration
				}
				time
				price
			}
			productInvoiceLines {
				id
				product {
					id
					productBrand {
						id
						value
					}
					productCategory {
						id
						value
					}
					name
					type
					ean
					buyPrice
				}
				amount
				price
			}
			comment
			createdAt
		}
	}
`;
export const GET_ALL_REPAIRS = gql`
	query GET_ALL_REPAIRS {
		repairs {
			id
			number
			paymentMethod {
				id
				method
			}
			bicycle {
				id
				type
				name
				color {
					id
					value
				}
				brand {
					id
					value
				}
				gearsystem {
					id
					value
				}
				status {
					id
					value
				}
				tires {
					id
					value
				}
				frameNumber
				owner {
					id
					fullName
				}
				holder {
					id
					fullName
				}
				createdAt
				updatedAt
			}
			customer {
				id
				fullName
				firstName
				lastName
			}
			status {
				id
				value
			}
			takenBy {
				id
				name
			}
			technician {
				id
				name
			}
			taskInvoiceLines {
				id
				task {
					id
					name
					taskCategory {
						id
						name
					}
					duration
				}
				fkRepairId
				amount
				time
				price
			}
			productInvoiceLines {
				product {
					productBrand {
						value
					}
					productCategory {
						value
					}
					sellPrice
				}
				amount
				price
				id
			}
			dateStarted
			dateFinished
			dateReturned
			spareBicycle {
				id
				type
				name
				frameNumber
				createdAt
				updatedAt
			}
			comment
			createdAt
			updatedAt
		}
	}
`;
export const TAKE_REPAIR = gql`
	mutation ($id: String!, $status: String, $fkTechnicianId: String, $dateStarted: String) {
		editRepair(
			input: {
				id: $id
				status: $status
				fkTechnicianId: $fkTechnicianId
				dateStarted: $dateStarted
			}
		) {
			id
			technician {
				name
			}
			status {
				id
				value
			}
			dateStarted
		}
	}
`;
export const FINISH_REPAIR = gql`
	mutation ($id: String!, $status: String, $dateFinished: String) {
		editRepair(input: { id: $id, status: $status, dateFinished: $dateFinished }) {
			id
			status {
				value
				id
			}
			dateFinished
		}
	}
`;
export const GET_PRODUCT_INVOICE_LINES = gql`
	query ProductInvoiceLines($repairId: String) {
		productInvoiceLines(repairId: $repairId) {
			id
			amount
			product {
				id
				productBrand {
					value
					id
				}
				productCategory {
					value
					id
				}
				name
				type
				sellPrice
			}
		}
	}
`;
export const DELETE_PRODUCT_INVOICE_LINE = gql`
	mutation ($id: String!) {
		deleteProductInvoiceLine(id: $id) {
			deleted
		}
	}
`;

export const CREATE_TASK = gql`
	mutation createTask(
		$name: String!
		$fkTaskCategory: String!
		$fkProductCategoryId: String
		$duration: Int!
	) {
		createTask(
			input: {
				name: $name
				fkTaskCategory: $fkTaskCategory
				fkProductCategoryId: $fkProductCategoryId
				duration: $duration
			}
		) {
			id
			name
			taskCategory {
				name
			}
			fkProductCategoryId
			duration
		}
	}
`;

export const CREATE_TASK_CATEGORY = gql`
	mutation createTaskCategory($name: String!) {
		createTaskCategory(input: { name: $name }) {
			id
			name
		}
	}
`;
export const TASK_CATEGORY = gql`
	query taskCategory {
		taskCategory {
			id
			name
		}
	}
`;
export const TASKS_BY_CATEGORY = gql`
	query taskByCategory($categoryId: String!) {
		taskByCategory(categoryId: $categoryId) {
			id
			name
			taskCategory {
				name
			}
			duration
		}
	}
`;
export const GET_TASK_INVOICE_LINES = gql`
	query taskInvoiceLines($repairId: String) {
		taskInvoiceLines(repairId: $repairId) {
			id
			task {
				id
				name
				taskCategory {
					name
					id
				}
				duration
			}
			fkRepairId
			amount
			time
			price
		}
	}
`;
export const DELETE_TASK_INVOICE_LINE = gql`
	mutation ($id: String!) {
		deleteTaskInvoiceLine(id: $id) {
			deleted
		}
	}
`;
export const GET_BICYCLES = gql`
	query ($customerId: String!) {
		bicyclesByCustomerId(customerId: $customerId) {
			id
			type
			frameNumber
			status {
				value
			}
			color {
				value
			}
			brand {
				value
			}
			gearsystem {
				value
			}
		}
	}
`;
export const POST_NEW_REPAIR = gql`
	mutation (
		$fkBicycleId: String!
		$fkCustomerId: String!
		$fkTakenBy: String!
		$comment: String
		$status: String!
	) {
		createRepair(
			input: {
				fkBicycleId: $fkBicycleId
				fkCustomerId: $fkCustomerId
				fkTakenBy: $fkTakenBy
				comment: $comment
				status: $status
			}
		) {
			id
			bicycle {
				id
			}
			customer {
				id
			}
			takenBy {
				id
			}
			createdAt
			updatedAt
			status {
				id
			}
			number
		}
	}
`;
export const ADD_TASK_INVOICE_LINE = gql`
	mutation ($fkTask: String!, $fkRepairId: String!, $amount: Int!, $time: Float!, $price: Float!) {
		createTaskInvoiceLine(
			input: {
				fkTask: $fkTask
				fkRepairId: $fkRepairId
				amount: $amount
				time: $time
				price: $price
			}
		) {
			id
			task {
				id
				name
				taskCategory {
					name
					id
				}
				duration
			}
			fkRepairId
			amount
			price
			time
		}
	}
`;
export const ADD_PRODUCT_INVOICE_LINE = gql`
	mutation (
		$fkRepairId: String
		$fkSaleId: String
		$fkProductId: String!
		$amount: Int!
		$price: Float!
	) {
		createProductInvoiceLine(
			input: {
				fkRepairId: $fkRepairId
				fkSaleId: $fkSaleId
				fkProductId: $fkProductId
				amount: $amount
				price: $price
			}
		) {
			id
			product {
				id
				productSupplier {
					value
					id
				}
				productBrand {
					id
					value
				}
				productCategory {
					id
					value
				}
				productGroup {
					id
					value
				}
				name
				type
				ean
				sellPrice
			}
			price
		}
	}
`;
export const GET_REPAIR = gql`
	query getRepair($id: String!) {
		getRepair(id: $id) {
			id
			number
			bicycle {
				id
				type
				color {
					value
				}
				brand {
					value
				}
			}
			status {
				value
			}
			customer {
				fullName
			}
			technician {
				name
			}
			taskInvoiceLines {
				id
				task {
					id
					name
					taskCategory {
						name
					}
				}
				time
			}
			productInvoiceLines {
				id
				product {
					id
					productBrand {
						value
					}
					productCategory {
						value
					}
					name
					type
				}
				amount
				price
			}
			dateStarted
			dateFinished
			dateReturned
			spareBicycle {
				type
				brand {
					value
				}
				color {
					value
				}
			}
			comment
			createdAt
		}
	}
`;
export const GET_CUSTOMER = gql`
	query getCustomer($name: String!) {
		customerByName(name: $name) {
			id
			firstName
			lastName
			fullName
			company
			cvr
			phone
			address
			zipCode
			city
			email
		}
	}
`;
export const NEW_BICYCLE = gql`
	mutation CreateBicycle(
		$color: String!
		$frameNumber: String
		$type: String
		$brand: String!
		$gearsystem: String!
		$status: String!
		$tires: String!
		$fkOwnerId: String!
		$fkHolderId: String!
	) {
		createBicycle(
			input: {
				color: $color
				brand: $brand
				frameNumber: $frameNumber
				type: $type
				gearsystem: $gearsystem
				status: $status
				tires: $tires
				fkOwnerId: $fkOwnerId
				fkHolderId: $fkHolderId
			}
		) {
			id
			type
			frameNumber
			color {
				value
			}
			brand {
				value
			}
			gearsystem {
				value
			}
		}
	}
`;
export const EDIT_BICYCLE = gql`
	mutation (
		$id: ID!
		$name: String
		$brand: String
		$type: String
		$color: String
		$gearsystem: String
		$tires: String
		$status: String
		$frameNumber: String
	) {
		editBicycle(
			input: {
				id: $id
				type: $type
				name: $name
				color: $color
				brand: $brand
				gearsystem: $gearsystem
				status: $status
				tires: $tires
				frameNumber: $frameNumber
			}
		) {
			id
			type
			name
			color {
				id
				value
			}
			brand {
				id
				value
			}
			gearsystem {
				id
				value
			}
			status {
				id
				value
			}
			tires {
				id
				value
			}
			frameNumber
			owner {
				id
				fullName
			}
			holder {
				id
				fullName
			}
		}
	}
`;
export const CREATE_EDIT_PRODUCT = gql`
	mutation (
		$id: ID
		$fkSupplier: String
		$fkBrand: String
		$fkGroup: String
		$fkCategory: String
		$name: String
		$type: String
		$ean: String
		$stock: Int
		$minStock: Int
		$buyPrice: Float
		$sellPrice: Float
		$expectedDurability: Int
	) {
		createEditProduct(
			input: {
				id: $id
				fkSupplier: $fkSupplier
				fkBrand: $fkBrand
				fkGroup: $fkGroup
				fkCategory: $fkCategory
				name: $name
				type: $type
				ean: $ean
				stock: $stock
				minStock: $minStock
				buyPrice: $buyPrice
				sellPrice: $sellPrice
				expectedDurability: $expectedDurability
			}
		) {
			id
			productSupplier {
				value
				id
			}
			productBrand {
				id
				value
			}
			productCategory {
				id
				value
			}
			productGroup {
				id
				value
			}
			name
			type
			ean
			stock
			minStock
			buyPrice
			sellPrice
			expectedDurability
		}
	}
`;
export const NEW_CUSTOMER = gql`
	mutation (
		$id: ID
		$firstName: String!
		$lastName: String!
		$email: String!
		$phone: Int
		$company: String
		$cvr: String
		$address: String
		$zipCode: String
		$city: String
	) {
		createEditCustomer(
			input: {
				id: $id
				firstName: $firstName
				lastName: $lastName
				email: $email
				phone: $phone
				company: $company
				cvr: $cvr
				address: $address
				zipCode: $zipCode
				city: $city
			}
		) {
			id
			fullName
			email
			phone
			company
			cvr
			address
			zipCode
			city
		}
	}
`;
export const POST_NEW_SALE = gql`
	mutation ($fkPaymentMethod: Int!, $fkCustomerId: String!, $fkSalespersonId: String!) {
		createSale(
			input: {
				fkPaymentMethod: $fkPaymentMethod
				fkCustomerId: $fkCustomerId
				fkSalespersonId: $fkSalespersonId
			}
		) {
			id
		}
	}
`;
export const ADD_BICYCLE_INVOICE_LINE = gql`
	mutation ($fkSaleId: String!, $fkBicycleId: String!, $price: Float!) {
		createBicycleInvoiceLine(
			input: { fkSaleId: $fkSaleId, fkBicycleId: $fkBicycleId, price: $price }
		) {
			id
			sale {
				id
			}
			bicycle {
				id
			}
			price
		}
	}
`;
export const GET_PRODUCTS_BY_CATEGORY = gql`
	query GetProductsByCategory($categoryId: String!) {
		productsByCategory(categoryId: $categoryId) {
			id
			productBrand {
				value
				id
			}
			productCategory {
				id
				value
			}
			name
			type
			stock
			sellPrice
		}
	}
`;
export const GET_PRODUCTS_BY_NAME = gql`
	query ProductsByName($name: String!) {
		productsByName(name: $name) {
			id
			productBrand {
				value
				id
			}
			productSupplier {
				minOrder
				value
				id
			}
			productCategory {
				id
				value
			}
			productGroup {
				id
				value
			}
			name
			type
			ean
			stock
			minStock
			buyPrice
			sellPrice
			expectedDurability
		}
	}
`;
export const GET_BICYCLE_PROPS = gql`
	query {
		bicycleProps {
			color {
				id
				value
			}
			tires {
				id
				value
			}
			status {
				id
				value
			}
			gearsystem {
				id
				value
			}
			brand {
				id
				value
			}
		}
	}
`;
export const GET_PRODUCT_PROPS = gql`
	query {
		productProps {
			brand {
				value
				id
			}
			category {
				value
				id
			}
			group {
				value
				id
			}
			supplier {
				minOrder
				value
				id
			}
		}
	}
`;
export const GET_TASK_PROPS = gql`
	query {
		taskProps {
			category {
				name
				id
			}
		}
	}
`;
export const GET_TASKS = gql`
	query {
		tasks {
			taskCategory {
				name
				id
			}
			fkProductCategoryId
			id
			name
			duration
		}
	}
`;
export const GET_TASKS_BY_NAME = gql`
	query GetTaskByName($name: String!) {
		taskByName(name: $name) {
			id
			name
			taskCategory {
				name
				id
			}
			fkProductCategoryId
			duration
		}
	}
`;
export const GET_ALL_BICYCLES = gql`
	query {
		bicycles {
			type
			name
			color {
				id
				value
			}
			brand {
				value
				id
			}
			gearsystem {
				value
				id
			}
			status {
				value
				id
			}
			tires {
				value
				id
			}
			frameNumber
			owner {
				id
				fullName
			}
			holder {
				id
				fullName
			}
			id
		}
	}
`;
export const GET_ALL_CUSTOMERS = gql`
	query {
		customers {
			id
			firstName
			lastName
			company
			cvr
			phone
			address
			zipCode
			city
			email
		}
	}
`;
export const GET_ALL_PRODUCTS = gql`
	query {
		products {
			id
			productSupplier {
				value
				id
			}
			productBrand {
				value
				id
			}
			productCategory {
				value
				id
			}
			productGroup {
				value
				id
			}
			name
			type
			ean
			stock
			minStock
			buyPrice
			sellPrice
			expectedDurability
		}
	}
`;
export const LOGIN = gql`
	query ($name: String!, $password: String!) {
		comparePassword(name: $name, password: $password) {
			error
			employee {
				id
				name
			}
		}
	}
`;
export const SIGNIN = gql`
	mutation ($name: String!, $password: String!) {
		createEmployee(name: $name, password: $password) {
			id
			name
		}
	}
`;
export const GET_EMPLOYEES = gql`
	query {
		employees {
			id
			name
		}
	}
`;
export const CHANGE_REPAIR_STATUS = gql`
	mutation editRepair($id: String!, $status: String!) {
		editRepair(input: { id: $id, status: $status }) {
			id
			status {
				id
				value
			}
		}
	}
`;
export const EDIT_REPAIR_COMMENT = gql`
	mutation editRepairComment($id: String!, $comment: String!) {
		editRepair(input: { id: $id, comment: $comment }) {
			id
			comment
		}
	}
`;
export const GET_REPAIR_STATUSES = gql`
	query RepairStatuses {
		repairStatuses {
			id
			value
		}
	}
`;
export const GET_RENTAL_BICYCLES = gql`
	query RentalBicycles {
		rentalBicycles {
			id
			type
			name
			color {
				value
			}
			brand {
				value
			}
		}
	}
`;
export const POST_NEW_RENTAL = gql`
	mutation CreateRental(
		$fkSalesPersonId: String!
		$fkCustomerId: String!
		$periodStart: String!
		$periodEnd: String!
		$fkBicycleId: String!
	) {
		createRental(
			input: {
				fkSalesPersonId: $fkSalesPersonId
				fkCustomerId: $fkCustomerId
				periodStart: $periodStart
				periodEnd: $periodEnd
				fkBicycleId: $fkBicycleId
			}
		) {
			id
			number
			salesPerson {
				name
			}
			customer {
				id
				fullName
			}
			bicycle {
				id
			}
			periodStart
			periodEnd
		}
	}
`;
export const ADD_NEW_RENTAL_INVOICE_LINE = gql`
	mutation CreateRentalInvoiceLine($fkBicycleId: String!, $fkRentalId: String!) {
		createRentalInvoiceLine(input: { fkBicycleId: $fkBicycleId, fkRentalId: $fkRentalId }) {
			id
			fkRentalId
			bicycle {
				id
				color {
					value
				}
				brand {
					value
				}
				type
			}
		}
	}
`;
export const GET_ALL_RENTALS = gql`
	query getAlRentals {
		rentals {
			id
			number
			returned
			customer {
				fullName
			}
			bicycle {
				color {
					value
				}
				brand {
					value
				}
				type
			}
			periodStart
			periodEnd
		}
	}
`;
export const RETURN_RENTAL = gql`
	mutation returnRental($rentalId: String!) {
		returnRental(rentalId: $rentalId) {
			id
			number
			returned
			active
			bicycle {
				id
			}
		}
	}
`;
export const GET_ALL_SALES = gql`
	query Sales {
		sales {
			id
			number
			customer {
				fullName
			}
			salesPerson {
				name
			}
			createdAt
		}
	}
`;
