import Factory from "../Persistence/DAOS/factory.js";

export default class ProductsServices {
	constructor() {
		this.productsDAO = Factory.getDao('products');
	}

	getProducts = async (id) => {
		if (!id) {
			return await this.productsDAO.getAll();
		} else {
			return await this.productsDAO.getById(id);
		}
	};

	postProduct = async (product) => {
		return await this.productsDAO.postProduct(product);
	};

	updateProduct = async (id, update) => {
		return await this.productsDAO.updateById(id, update);
	};

	deleteProduct = async (id) => {
		return await this.productsDAO.deleteById(id);
	};

	getNextId = async () => {
		let array = await this.productsDAO.getAll()
		JSON.stringify(array)
		let length = array.length
		return length? parseInt( length + 1) : 1
	}
}
