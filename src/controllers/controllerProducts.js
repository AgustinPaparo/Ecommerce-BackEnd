import ProductsServices from "../Services/servicesProducts.js";

export default class ProductsController {
	constructor() {
		this.prodService = new ProductsServices();
	}

	getProducts = async (req, res) => {
		try {
			const { id } = req.params;
			let products = await this.prodService.getProducts(id);
			res.status(200).json(products);
			console.log(req.session);
		} catch (error) {
			console.error(error);
			res.status(404)
		}
	};

	productForUser = async (req, res) => {
		try {
			let products = await this.prodService.getProducts();
			return products;
		} catch (error) {
			console.error(error);
			res.status(404)
		}
		
	}; // Paso los productos como un objeto.

	postProduct = async (req, res) => {
		try {
			let product = req.body;
			product.id =  await this.prodService.getNextId()
			let newProd = await this.prodService.postProduct(product);
			res.status(201).json(newProd);
			console.log("Producto Creado");
		} catch (error) {
			console.error(error);
			res.status(404)
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
			res.status(302).json(changedProduct);
			console.log("Producto Actualizado");
		} catch (error) {
			console.error(error);
			res.status(404)
		}
	};

	deleteProduct = async (req, res) => {
		try {
			let { id } = req.params;
			let deletedProduct = await this.prodService.deleteProduct(id);
			res.status(202).json(deletedProduct);
			console.log("Producto Borrado");
		} catch (error) {
			console.error(error);
			res.status(404)
		}
	};

}
