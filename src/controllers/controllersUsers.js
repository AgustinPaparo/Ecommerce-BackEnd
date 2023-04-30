import UsersServices from "../Services/servicesUsers.js";
import CartsServices from "../Services/servicesCarts.js"
import ProductsController from "../Controllers/controllerProducts.js"

const producstController = new ProductsController()
const userService = new UsersServices()
const cartService = new CartsServices()

/////////////////////////// LOGIN ///////////////////////////

export const login = async (req, res) => {
	try {
		if (await req.isAuthenticated()) {
			let products = await producstController.productForUser() 
			let cart = await cartService.getCart(req.user.id)
			res.json({
				Mensaje: req.user.mail + " tu sesion esta activa",
				Carrito: cart,
				Catálgo: products,
			});
		} else {
			res.render('User/login');;
		}
	} catch (error) {
		console.error(error);
		res.status(500)
	}
};

/////////////////////////// ERROR LOGIN ///////////////////////////

export const errorLogin = async (req, res) => {
	try {
		res.status(400).render('User/login-error');;
	} catch (error) {
		console.error(error);
		res.status(500)
	}
};

/////////////////////////// REGISTER ///////////////////////////

export const signup = async (req, res) => {
	try {
		if (await req.isAuthenticated()) {
			// let cart = await getCurrentCarrito( toString(req.user.mail) ) // servicio de carrito
			// let products = await productForUser() // servico de productos
			res.json({
				Mensaje: "Sesión Iniciada exitosamente",
				Carrito: "aca va el carrito del usuario",
				Catálgo: "aca va el catalgo",
			});
		} else {
			res.render('User/signup');
		}
	} catch (error) {
		console.error(error);
		res.status(500)
	}
};

/////////////////////////// ERROR REGISTER ///////////////////////////

export const errorsignup = async (req, res) => {
	try {
		res.render('User/signup-error');
	} catch (error) {
		console.error(error);
		res.status(500)
	}
};

/////////////////////////// CERRAR SESION ///////////////////////////

export const logout = async (req, res) => {
	try {
		if (req.isAuthenticated()) {
			req.session.destroy((err) => {
				if (err) {
					logger.error(`ERROR: ${err}`);
				}
			});
			const userId = req.user.id;
			await cartService.clearCart(userId); // Limpio el carrito del usuario cuando cierra sesion
            const user = req.user.nombre;
            const saludo = `${user} su sesion ha sido cerrada exitosamente`;
			return res.status(200).render('User/logout', {saludo});
		}
		res.status(200).json({ Error: "Aún no ha iniciado sesión" });
	} catch (error) {
		console.error(error);
		res.status(500)
	}
};

/////////////////////////// LIST OF USERS ///////////////////////////



export const getUsersList = async (req, res) => {
	try {
		let users = await userService.getUsers()
		return users
	} catch (error) {
		console.error(error);
	}
}

export const getUsersListJSON = async (req, res) => {
	try {
		let users = await userService.getUsers()
		console.log(users);
		return res.json(users)
	} catch (error) {
		console.error(error);
	}
}

/////////////////////////// USER BY MAIL ///////////////////////////

export const getUserByMail = async (req, res) => {
	try {
		let user = await userService.getUserByMail(req)
		console.log(user);
		return user
	} catch (error) {
		console.error(error);
	}
}

export const udateUser = async (req,res) => {
	try {
		let selectedProduct = req.params.mail;
		let changes = req.body;
		let changedProduct = await userService.updateUser(
			selectedProduct,
			changes
		);
		res.json(changedProduct);
		console.log("Producto Actualizado");
	} catch (error) {
		console.error(error);
	}
}

export const deleteProduct = async (req, res) => {
	try {
		let { mail } = req.params;
		let deletedProduct = await userService.deleteUser(mail);
		res.json(deletedProduct);
		console.log("Producto Borrado");
	} catch (error) {
		console.log(error);
	}
};