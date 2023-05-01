import Factory from "../Persistence/DAOS/factory.js";

export default class CartsServices {
	constructor() {
		this.cartDAO = Factory.getDao("carts");
		this.productsDAO = Factory.getDao("products");
		this.usersDAO = Factory.getDao("users");
		this.orderDAO = Factory.getDao("orders");
	}

	//Mostrar carrito
	async getCart(userId) {
		return await this.cartDAO.getCart(userId);
	}

	//Agregar productos al carrito almacenando su id.
	async addProd(userId, prodId) {
		let product = await this.productsDAO.getById(prodId);
		return await this.cartDAO.addProd(userId, product);
	}
	//Eliminar producto del carrito
	async deleteProd(userId, prodId) {
		let cart = await this.cartDAO.getCart(userId);
		const exist = cart.some((prod) => prod.id == prodId);
		if (!exist) {
			throw new Error("No hay producto con ese id dentro del carrito");
		} else {
			const update = cart.findIndex((objeto) => objeto.id === prodId);
			if (update !== -1) {
				cart.splice(update, 1);
			}
			return await this.cartDAO.deleteProd(userId, cart);
		}
	}
	//Limpiar el carrito
	async clearCart(userId) {
		let emptyCart = [];
		return await this.cartDAO.deleteProd(userId, emptyCart);
	}

	async checkout(userId) {
		let cart = await this.cartDAO.getCart(userId); //Carrito como array de obj
		let user = await this.cartDAO.getUser(userId);

		let total = 0;
		let products = {};
		cart.forEach((p) => {
			if (products[p.nombre]) {
				products[p.nombre].quantity++;
				products[p.nombre].precio += p.precio;
			} else {
				products[p.nombre] = {
					prodName: p.nombre,
					precio: p.precio,
					quantity: 1,
				};
			}
			total += p.precio;
		});

		let order = {
			user: user.mail,
			products: Object.values(products),
			total: "$" + total,
			timestamp: new Date(),
		};

		return await this.orderDAO.addOrder(order);
	}
}
