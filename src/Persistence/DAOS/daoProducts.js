import mongoose from "mongoose";
import  { transformDTO } from "../DTOS/dtoProducts.js";
import logger from "../../loggers/logger.js"


class productsDao {

	constructor(url, productModel) {
		this.url = url;
		this.products = productModel;
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

	getAll = async() =>{
		try {
			let productos = await this.products.find({}).sort({id:1});
			return transformDTO(productos);
		} catch (error) {
			logger.error("Error al buscar todos los productos " + error);
		}
	}

	async getById(id) {
		try {
			const product = await this.products.findOne({ id: id });
			return transformDTO(product);			
		} catch (error) {
			logger.error("Error al buscar el producto con id = "+ id + error);
		}
	}

	async postProduct(newProduct) {
		try {
			await this.products(newProduct).save();
			return transformDTO(newProduct);
		} catch (error) {
			logger.error("Error al cargar el producto. "+ error);
		}
	}

	async deleteById(id) {
		try {
			const product = await this.products.findOne({ id: id })
			await this.products.deleteOne({ id: id })
			return transformDTO(product)
		} catch (error) {
			logger.error("Error al borrar el producto con id = "+ id + error);
		}
		}

	async updateById(id, update) {
		try {
			const updated = await this.products.findOneAndUpdate({ id: id },  update, {new: true});
			return transformDTO(updated);			
		} catch (error) {
			logger.error("Error al actualizar el producto con id = "+ id + error);
		}
	}
}

export default productsDao;
