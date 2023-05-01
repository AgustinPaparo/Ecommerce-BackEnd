import mongoose from "mongoose";
import Config from "../../../Config.js";
import logger from "../../utils/Loggers/logger.js";
import path from "path"

import productsDao from "./daoProducts.js";
import usersDao from "./daoUsers.js";
import cartDao from "./daoCarts.js";
import ordersDao from "./daoOrder.js";

import productModel from "../Models/modelProduct.js";
import userModel from "../Models/modelUser.js";

const url = Config.MONGOURL;
const NODE_ENV = Config.NODE_ENV

const route = path.resolve(process.cwd(), `${process.env.NODE_ENV}.env`)

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
			case "orders":
				// if(NODE_ENV = "prod"){
				// 	// dao = new ordersDaoDB( orderModel )
				// }
				dao = new ordersDao("./orders.json");
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
