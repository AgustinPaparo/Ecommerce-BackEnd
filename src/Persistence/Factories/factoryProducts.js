import dotenv from "dotenv"
import productsDao from '../DAOS/daoProducts.js'
import productModel from "../Models/modelProduct.js"

dotenv.config()
const url = process.env.MONGOURL

export default class productsFactory{
    static getDao() {
        const dao = new productsDao( url, productModel )
        dao.init()
        return dao
    }
}
