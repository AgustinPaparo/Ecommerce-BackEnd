import logger from "../../Loggers/logger.js";

export default class cartDao {

	constructor( userModel) {
		this.cart = userModel;
	}

	async searchInCart (userId){
		try {
			let user = await this.cart.findOne({id : userId})
			return user.carrito // Array de objetos
		} catch (error) {
			logger.error("Error al buscar el carrito" + error);
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