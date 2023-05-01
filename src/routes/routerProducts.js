import express from 'express';
import ProductsController from '../Controllers/controllerProducts.js';


const router = express.Router();

export default class routerProducts{

    constructor(){
        this.productsController = new ProductsController()
    }

    start(){

        router.get("/:id?", this.productsController.getProducts) 
        router.post("/",  this.productsController.postProduct) 
        router.put("/:id",  this.productsController.updateProduct) 
        router.delete("/:id", this.productsController.deleteProduct); 
        
        return  router 

    }
}
