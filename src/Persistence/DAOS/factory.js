import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../../Loggers/logger.js";

import productsDao from "./daoProducts.js";
import usersDao from "./daoUsers.js";
import cartDao from "./daoCarts.js";

import productModel from "../Models/modelProduct.js";
import userModel from "../Models/modelUser.js";

dotenv.config();
const url = process.env.MONGOURL;

export default class Factory {
	static getDao(option) {
		let dao;
		switch (option) {
			case "products":
				dao = new productsDao(productModel);
				break;
			case "users":
				dao = new usersDao(userModel);
				break;
			case "carts":
				dao = new cartDao(userModel);
				break;
		}

		// Verifico si la conexion a mongoDB esta activa. Si no esta, la conecto.
		// Los states de mongoose pueden ser: 0-Desconectado, 1-Conectado,
		// 2-Conectando y 3-Desconectando
		if (
			mongoose.connection.readyState === 0 ||
			mongoose.connection.readyState === 3
		) {
			init();
		}
		return dao;
	}
}

const init = async () => {
	try {
		await mongoose.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		logger.info("MongoDb Connected");
	} catch (error) {
		logger.error("Error connecting to database", error);
	}
};

const disconnect = async () => {
	await mongoose.disconnect();
	console.log("MongoDb Disconnected");
};
