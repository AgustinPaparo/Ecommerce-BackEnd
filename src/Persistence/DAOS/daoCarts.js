import logger from "../../utils/Loggers/logger.js";

export default class cartDao {

	constructor(userModel) {
		this.cart = userModel;
	}

	async getCart (userId){
		try {
			let user = await this.cart.findOne({id : userId})
			return user.carrito // Array de objetos
		} catch (error) {
			logger.error("Error al buscar el carrito" + error);
		}
	}

	async getUser(userId) {
		try {
			let user = await this.cart.findOne({id : userId})
			return user
		} catch (error) {
			logger.error("Error al buscar el usuario con id = " + id + error);
			let user = undefined
			return user
		}
	}

	async addProd( idUser, product ) {
		try {
			return ( await this.cart.updateOne( { id: idUser }, {$push: {carrito: product} } ) )
		} catch (error) {
			logger.error("Error al agregar el producto al carrito " + error);
		}
    }

	async deleteProd( idUser, product ) {
		try {
			return ( await this.cart.findOneAndUpdate({ id: idUser },  {carrito: product}, {new: true}) )
		} catch (error) {
			logger.error("Error al eliminar el producto del carrito " + error);
		}
    }
}