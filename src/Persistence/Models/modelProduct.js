import mongoose from "mongoose";
//////////////////////// CONEXION A MONGOOSE ////////////////////////

const productsCollection = "productos";
const productSchema = new mongoose.Schema({
	id: {type : Number, require: true} ,
	nombre: {type : String, require: true} ,
	descripcion: String,
	foto: String,
	precio: {type : Number, require: true},
	stock: Number,
});

const productModel = mongoose.model(productsCollection, productSchema);
export default productModel;
