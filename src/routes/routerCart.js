import express from 'express';
import CartController from '../controllers/controllerCarts.js';
import authentication from '../middleware/auth.js';


const router = express.Router();

export default class routerCart{

    constructor(){
        this.cartController = new CartController()
    }

    start(){
    //-------------------------------------------------------------------------------------------------------//
    //   Todas las rutas del router son rutas protegidas. En caso de querer usar insomnia o algun software   //
    //             parecido se recomienda quitar el middleware antes de las pruebas.                         //
    //-------------------------------------------------------------------------------------------------------//

        //Compra. PASARLE POR BODY EL ID DEL USER
        router.get('/checkout', /*authentication,*/ this.cartController.checkout )
        //Muestra los productos del carrito
        router.get("/:userid",/*authentication,*/ this.cartController.showCart) 
        // Agrega un producto al carrito. HAY QUE PASARLE POR EL BODY EL ID DEL PROD Y POR PARAM EL ID DEL USER
        router.put("/:userid",/*authentication,*/  this.cartController.addProd) 
        // Limpia el carrito. HAY QUE PASARLE POR BODY EL ID DEL USER
        router.delete("/clear/",/*authentication,*/ this.cartController.clearCart); 
        // Saca  un producto del carrito. HAY QUE PASARLE POR EL BODY EL ID DEL PROD Y POR PARAM EL ID DEL USER
        router.delete("/:userid",/*authentication,*/ this.cartController.deleteProd); 
        return  router 

    }
}