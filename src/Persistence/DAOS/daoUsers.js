import mongoose from "mongoose";
import bcrypt from "bcrypt"
import logger from "../../Loggers/logger.js";
import { transformDTO } from "../DTOS/dtoUsers.js";

export default class usersDao {
	constructor(url, userModel) {
		this.url = url;
		this.users = userModel;
	}

	async init() {
		try {
			await mongoose.connect(this.url, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			logger.info("MongoDb Connected");
		} catch (error) {
			logger.error("Error connecting to database", error);
		}
	}

	async disconnect() {
		await mongoose.disconnect();
		console.log("MongoDb Disconnected");
	}

	getAll = async () => {
		try {
			let users = await this.users.find({}).sort({ id: 1 });
			return transformDTO(users);
		} catch (error) {
			logger.error("Error al buscar todos los usuarios " + error);
		}
	};

	async getByMail(mail) {
		try {
			const user = await this.users.findOne({ mail: mail })
			return transformDTO(user);
		} catch (error) {
			logger.error("Error al buscar el usuario con mail = " + mail + error);
			let user = undefined
			return user
		}
	}

	async createUser(newUser) {
		try {
			await this.users(newUser).save();
			return transformDTO(newUser);
		} catch (error) {
			logger.error("Error al crear el usuario. " + error);
		}
	}

	async deleteByMail(mail) {
		try {
			const user = await this.users.findOne({ mail: mail });
			await this.users.deleteOne({ mail: mail });
			return transformDTO(user);
		} catch (error) {
			logger.error("Error al borrar el usuario con mail = " + mail + error);
		}
	}

	async updateByMail(mail, update) {
		try {
			const updated = await this.users.findOneAndUpdate(
				{ mail: mail },
				update,
				{ new: true }
			);
			return transformDTO(updated);
		} catch (error) {
			logger.error(
				"Error al actualizar los datos del usuario con mail = " + mail + error
			);
		}
	}
}
