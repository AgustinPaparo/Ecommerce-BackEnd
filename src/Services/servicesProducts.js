import productsFactory from "../Persistence/Factories/factoryProducts.js";

export default class ProductsServices {
	constructor() {
		this.productsDAO = productsFactory.getDao();
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

	
}
