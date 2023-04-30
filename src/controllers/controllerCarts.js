import CartsServices from "../Services/servicesCarts.js";


export default class CartController {
	constructor() {
		this.cartService = new CartsServices();
	}

	showCart = async (req, res) =>{
		try {
			const userId = req.params.userid
			let cart = await this.cartService.getCart(userId)
			console.log(cart);
			res.status(302).json(cart)			
		} catch (error) {
			console.error(error);
			res.status(400)
		}
	}

	addProd = async (req, res) => {
		try {
			const userId = req.params.userid
			const prodId = req.body.id
			let cart = await this.cartService.addProd(userId, prodId);
			console.log('Producto agregado correctamente');
			res.status(202).json(cart)
		} catch (error) {
			console.error(error);
			res.status(400)
		}
	}

	deleteProd= async (req, res) => {
		try {
			const userId = req.params.userid
			const prodId = req.body.id
			let cart = await this.cartService.deleteProd(userId, prodId);
			console.log('Producto eliminado correctamente');
			res.status(202).json(cart)
		} catch (error) {
			console.error(error);
			res.status(400)
		}
	}

	clearCart = async (req, res) =>{
		try {
			const userId = req.body.id
			let emptyCart = await this.cartService.clearCart(userId)
			console.log('Carrito vacio');
			res.status(202).json(emptyCart)
		} catch (error) {
			console.error(error);
			res.status(400)
		}
	}
}