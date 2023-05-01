import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import UsersServices from "../Services/servicesUsers.js";
import {getUsersList} from "../Controllers/controllersUsers.js"
import Config from "../../Config.js";



///////////////////////////////////////////// LOGIN /////////////////////////////////////////////
const service = new UsersServices();

export const login = new LocalStrategy(async (username, password, done) => {
	const users = await getUsersList()
	const user = users.find(u => u.mail == username);
	if (!user) {
		console.log("Usuario innexistente");
		return done(null, false);
	}
	if (!comparePassword(user, password)) {
		console.log("Usuario y/o contraseña incorrectosss");
		return done(null, false);
	}
	return done(null, user);
});

///////////////////////////////////////////// REGISTER /////////////////////////////////////////////

const USER = Config.USER; //NODEMAILER

export const signup = new LocalStrategy (
	{ passReqToCallback: true },
	async (req, username, password, done) => {
			console.log("entra aca");
			const data = req.body;
			let users = await getUsersList()
			let length = users.length
			let defaultPhoto = "../../../public/img/default.png"
			const user = users.find(u => u.mail == username);
			// AGREGAR CONF NODEMAILER
			if (!user) {
				console.log('verifico que no existe el usuario');
				if(password === data.repeatPassword){
					console.log('contraseñas iguales');
					const newUser = {
						id: parseInt(length + 1),
						nombre : data.nombre,
						mail: username,
						password: createHash(password),
						foto: data.foto? data.foto : defaultPhoto,
						numero: data.numero,
						carrito: []
					}
					await service.createUser(newUser);
					// await servicio cuando lo cree 
					done(null, newUser);
				} else{
					console.log('No coinciden las contraseñas');
					return done(null , false)
				}
			} else{
				console.log("Ya existe este usuario");
				return done(null, false);
			}
	}
);

function comparePassword(user, password) {
	return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}