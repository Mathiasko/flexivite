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

export interface nextInterface {
	setNextDisabled: React.Dispatch<React.SetStateAction<boolean>>;
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
