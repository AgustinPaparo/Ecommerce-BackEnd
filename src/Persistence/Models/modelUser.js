import mongoose from "mongoose";
//////////////////////// CONEXION A MONGOOSE ////////////////////////

const collection = "usarios";
const schema = new mongoose.Schema({
	id: { type: Number, require: true },
	mail: { type: String, require: true, unique:true },
	nombre: { type: String, require: true },
	password: { type: String, require: true, minLength: 6 },
	numero: { type: Number, require: true },
	foto: { type:String, default: "../../../public/img/default.png" }
});

const userModel = mongoose.model(collection, schema);
export default userModel;
