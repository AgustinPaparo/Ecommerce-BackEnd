import mongoose from "mongoose";
//////////////////////// CONEXION A MONGOOSE ////////////////////////

const collection = "carritos";
const schema = new mongoose.Schema({
	owner: { type: String, require: true },
	products: { type: Array, require: true },
});

const cartModel = mongoose.model(collection, schema);
export default cartModel;
