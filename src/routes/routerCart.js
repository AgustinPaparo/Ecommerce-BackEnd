import express from 'express';
import CartController from '../Controllers/controllerCarts.js';
import authentication from '../middleware/auth.js';


const router = express.Router();

export default class routerCart{

    constructor(){
        this.cartController = new CartController()
    }

    start(){

        //Muestra los productos del carrito
        router.get("/:userid",authentication, this.cartController.showCart) 
        // Agrega un producto al carrito. HAY QUE PASARLE POR EL BODY EL ID DEL PROD Y POR PARAM EL ID DEL USER
        router.put("/:userid",authentication,  this.cartController.addProd) 
        // Limpia el carrito. HAY QUE PASARLE POR BODY EL ID DEL USER
        router.delete("/clear/",authentication, this.cartController.clearCart); 
        // Saca  un producto del carrito. HAY QUE PASARLE POR EL BODY EL ID DEL PROD Y POR PARAM EL ID DEL USER
        router.delete("/:userid",authentication, this.cartController.deleteProd); 
        
        return  router 

    }
}