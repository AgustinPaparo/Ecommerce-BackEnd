import ProductsServices from "../Services/servicesProducts.js";

export default class ProductsController {
	constructor() {
		this.prodService = new ProductsServices();
	}

	getProducts = async (req, res) => {
		try {
			const { id } = req.params;
			let products = await this.prodService.getProducts(id);
			res.json(products);
			console.log(products);
		} catch (error) {
			throw new Error();
		}
	};

	getProductsHome = async (req, res) => {
		let respuesta = await this.prodService.getProducts(req, res);
		return { ...respuesta };
	};

	listProducts = async () => {
		let respuesta = await this.prodService.listProducts();
		return respuesta;
	};

	postProduct = async (req, res) => {
		try {
			let product = req.body;
			let newProd = await this.prodService.postProduct(product);
			res.json(newProd);
			console.log("Producto Creado");
		} catch (error) {
			console.log(error);
		}
	};

	updateProduct = async (req, res) => {
		try {
			let selectedProduct = req.params.id;
			let changes = req.body;
			let changedProduct = await this.prodService.updateProduct(
				selectedProduct,
				changes
			);
			res.json(changedProduct);
			console.log("Producto Actualizado");
		} catch (error) {
			console.log(error);
		}
	};

	deleteProduct = async (req, res) => {
		try {
			let { id } = req.params;
			let deletedProduct = await this.prodService.deleteProduct(id);
			res.json(deletedProduct);
			console.log("Producto Borrado");
		} catch (error) {
			console.log(error);
		}
	};
}
