import UsersServices from "../Services/servicesUsers.js";

/////////////////////////// LOGIN ///////////////////////////

export const login = async (req, res) => {
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
			res.render('User/login');;
		}
	} catch (error) {
		console.error(error);
	}
};

/////////////////////////// ERROR LOGIN ///////////////////////////

export const errorLogin = async (req, res) => {
	try {
		res.render('User/login-error');;
	} catch (error) {
		console.error(error);
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
	}
};

/////////////////////////// ERROR REGISTER ///////////////////////////

export const errorsignup = async (req, res) => {
	try {
		res.render('User/signup-error');
	} catch (error) {
		console.error(error);
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
			const mail = req.user.mail;
			// await usersService.Delete(mail); // Servicio para borrar el carrito --> falta crear
            const user = req.user.nombre;
            const saludo = `${user} su sesion ha sido cerrada exitosamente`;
			res.render('User/logout', {saludo});
		}
		res.json({ Error: "Aún no ha iniciado sesión" });
	} catch (error) {
		console.error(error);
	}
};

/////////////////////////// LIST OF USERS ///////////////////////////

const userService = new UsersServices()

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