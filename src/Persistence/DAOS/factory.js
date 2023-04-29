import dotenv from "dotenv";
import productsDao from "./daoProducts.js";
import usersDao from "./daoUsers.js";

import productModel from "../Models/modelProduct.js";
import userModel from "../Models/modelUser.js"

dotenv.config();
const url = process.env.MONGOURL;

export default class Factory {
	static getDao(option) {
		let dao;
		switch (option) {
			case "products":
				dao = new productsDao( url, productModel );
				break;
			case "users":
				dao = new usersDao( url, userModel );
				break;
			case "chat":
				dao = new ChatDao("messages");
				break;
		}
		dao.init();
		return dao;
	}
}
