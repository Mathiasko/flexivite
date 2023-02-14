//@ts-nocheck
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
	signedIn: { id: "0e066280-a88e-44b5-ab6c-2598bda9bf00", name: "maros" },
	selectedBicycle: undefined,
	selectedCustomer: undefined,
	selectedRepair: undefined,
	productCart: [],
	bicycleCart: [],
	taskCart: [],
	rentalCart: [],
	bicycleProps: {},
	productProps: {},
	repairStatuses: {},
	taskProps: {},
	tasks: {},
	products: {},
	taskCategories: {},
	modal: false,
	modalContent: {},

	signIn: (employee) => set(() => ({ signedIn: employee })),
	logOut: () => set(() => ({ signedIn: undefined })),
	toggleModal: () => {
		set((state) => ({
			modal: !state.modal,
		}));
	},
	setModalContent: (content) => set(() => ({ modalContent: content })),
	emptyStore: () =>
		set((state) => ({
			...state,
			productCart: [],
			bicycleCart: [],
			taskCart: [],
			rentalCart: [],
		})),
	selectCustomer: (customer) => set((state) => ({ ...state, selectedCustomer: customer })),
	selectBicycle: (bicycle) => set((state) => ({ ...state, selectedBicycle: bicycle })),
	selectRepair: (repair) => set((state) => ({ ...state, selectedRepair: repair })),
	addProductToCart: (product) =>
		set(({ productCart }) => {
			const productIndex = productCart.findIndex(
				(cartProduct) => cartProduct.product.id === product.id
			);
			if (productIndex !== -1) {
				return {
					productCart: productCart.map((cartProduct) =>
						cartProduct.product.id === product.id
							? { ...cartProduct, amount: cartProduct.amount + 1 }
							: cartProduct
					),
				};
			} else {
				return {
					productCart: [
						...productCart,
						{
							amount: 1,
							product,
						},
					],
				};
			}
		}),
	removeProductFromCart: ({ id }) =>
		set(({ productCart }) => {
			const productIndex = productCart.findIndex((cartItem) => cartItem.product.id === id);
			if (productIndex === -1) {
				console.log(new Error("Index not found in cart"));
			} else {
				const productToRemove = productCart[productIndex];
				if (productToRemove.amount === 1) {
					return {
						productCart: productCart.filter(({ product }) => {
							return product.id !== productToRemove.product.id;
						}),
					};
				} else {
					return {
						productCart: productCart.map((cartProduct) =>
							cartProduct.product.id === id
								? { ...cartProduct, amount: cartProduct.amount - 1 }
								: cartProduct
						),
					};
				}
			}
		}),
	updateTime: (taskId, time) => {
		set(({ taskCart }) => {
			return {
				taskCart: taskCart.map((task) => (task.id === taskId ? { ...task, duration: time } : task)),
			};
		});
	},
	addBicycleToCart: ({ bicycle, price }) =>
		set(({ bicycleCart }) => {
			const bicycleIndex = bicycleCart.findIndex((cartBike) => cartBike.bicycle.id === bicycle.id);
			if (bicycleIndex === -1) {
				return { bicycleCart: [...bicycleCart, { bicycle, price }] };
			}
			return bicycleCart;
		}),
	removeBicycleFromCart: (id) =>
		set(({ bicycleCart }) => {
			return {
				bicycleCart: bicycleCart.filter(({ bicycle }) => {
					return bicycle.id !== id;
				}),
			};
		}),
	addTaskToCart: (task) => {
		return set(({ taskCart }) => {
			const taskIndex = taskCart.findIndex((cartTask) => cartTask.id === task.id);
			if (taskIndex === -1) {
				return { taskCart: [...taskCart, task] };
			}
			return taskCart;
		});
	},
	removeTaskFromCart: ({ id }) =>
		set(({ taskCart }) => {
			return {
				taskCart: taskCart.filter((task) => {
					return task.id !== id;
				}),
			};
		}),
	addRentalToCart: (rental) => {
		return set(({ rentalCart }) => {
			const rentalIndex = rentalCart.findIndex((cartRental) => cartRental.id === rental.id);
			if (rentalIndex === -1) {
				return { rentalCart: [...rentalCart, rental] };
			}
		});
	},
	removeRentalFromCart: (id) =>
		set(({ rentalCart }) => {
			return {
				rentalCart: rentalCart.filter((rental) => {
					return rental.id !== id;
				}),
			};
		}),
	storeBicycleProps: (props) => set((state) => ({ ...state, bicycleProps: props })),
	storeTaskProps: (props) => set((state) => ({ ...state, taskProps: props })),
	storeProduceProps: (props) => set((state) => ({ ...state, productProps: props })),
	storeRepairStatuses: (statuses) => set((state) => ({ ...state, repairStatuses: statuses })),
	storeProducts: (products) => set((state) => ({ ...state, products: products })),
	storeTasks: (tasks) => set((state) => ({ ...state, tasks: tasks })),
	storeTaskCategories: (props) => set((state) => ({ ...state, taskCategories: props })),
});

export const useStore = create(devtools(store));
