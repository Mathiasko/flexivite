export interface productInterface {
	id: string;
	productSupplier: { id: string; value: string; minOrder: number | null };
	productBrand: { id: string; value: string };
	productCategory: { id: string; value: string };
	productGroup: { id: string; value: string };
	name: string;
	type: string;
	ean: string;
	stock: number;
	minStock: number;
	buyPrice: number;
	sellPrice: number;
	expectedDurability: number;
}

interface propertyInterface {
	id: string;
	value: string;
}

interface technicianInterface {
	id: string;
	name: string;
	role: number;
}

export interface productInvoiceLinesInterface {
	id: string;
	amount: number;
	price: number;
	product: productInterface;
}
export interface taskInvoiceLinesInterface {
	id: string;
	task: {
		id: string;
		name: string;
		taskCategory: {
			id: string;
			name: string;
		};
		duration: number;
	};
	time: string;
	price: number;
}

export interface repairInterface {
	id: string;
	number: string;
	paymentMethod: { id: number; method: string };
	bicycle: bicycleInterface;
	customer: CustomerInterface;
	status: propertyInterface;
	productInvoiceLines: productInvoiceLinesInterface[];
	taskInvoiceLines: taskInvoiceLinesInterface[];
	takenBy?: technicianInterface;
	technician?: technicianInterface;
	dateStarted: string;
	dateFinished: string;
	dateReturned: string;
	spareBicycle: bicycleInterface;
	comment: string;
	createdAt: string;
}
export interface partInterface {
	product: productInterface;
	amount: number;
}

export interface CustomerInterface {
	id: string;
	fullName: string;
	email: string;
}

export interface taskInterface {
	id: string;
	name: string;
	taskCategory: { id: string; name: string };
	fkProductCategoryId: string;
	duration: number;
}

export interface bicycleInterface {
	id: string;
	type: string;
	name: string;
	color: { id: string; value: string };
	brand: { id: string; value: string };
	gearsystem: { id: string; value: string };
	status: { id: string; value: string };
	tires: { id: string; value: string };
	frameNumber: string;
	fkOwnerId: string;
	fkHolderId: string;
	fleetNr: string;
}

export interface BicyclePropInterface {
	color: string;
	frameNumber: string;
	type: string;
	brand: string;
	gearsystem: string;
	status: string;
	tires: string;
}
