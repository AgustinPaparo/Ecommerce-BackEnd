import express from 'express';
import ProductsController from '../Controllers/controllerProducts.js';


const router = express.Router();

export default class routerProducts{

    constructor(){
        this.productsController = new ProductsController()
    }

    start(){

        router.get("/:id?", this.productsController.getProducts) //Utiliza la funcion getProducts declarada en controllers
        router.post("/",  this.productsController.postProduct) // Utiliza la funcion postProduct declarada en controllers
        router.put("/:id",  this.productsController.updateProduct) //Utiliza la funcion updateProduct declarada en controllers
        router.delete("/:id", this.productsController.deleteProduct); // Utiliza la funcion deleteProduct declarada en controllers
        
        return  router 

    }
}
