import Factory from "../Persistence/DAOS/factory.js";

export default class CartsServices {
	constructor() {
		this.cartDAO = Factory.getDao("carts");
		this.productsDAO = Factory.getDao("products");
		this.usersDAO = Factory.getDao("users");
	}

	//Mostrar carrito
	async getCart (userId) {
		return await this.cartDAO.searchInCart(userId)
	}

	//Agregar productos al carrito almacenando su id.
	async addProd(userId, prodId) {
		let product = await this.productsDAO.getById(prodId)
		return await this.cartDAO.addProd(userId, product);
	}
	//Eliminar producto del carrito
	async deleteProd(userId, prodId) {
		let cart = await this.cartDAO.searchInCart(userId)
		const exist = cart.some((prod) => prod.id == prodId);
		if(!exist){
			throw new Error ('No hay producto con ese id dentro del carrito')
		}else{
			const update = cart.findIndex(objeto => objeto.id === prodId)
			if (update !== -1) {
				cart.splice(update, 1);
			}
			return await this.cartDAO.deleteProd(userId, cart);
		}

	}
	//Limpiar el carrito
	async clearCart(userId) {
		let emptyCart = [{}]
		return await this.cartDAO.deleteProd(userId, emptyCart);
	}

}
