import dotenv from 'dotenv'
import path from 'path'


dotenv.config({
    path: path.resolve(process.cwd(), `${process.env.NODE_ENV}.env`)
});



export default {
    NODE_ENV: process.env.NODE_ENV||'dev',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 8080,
    //MONGO
    MONGOURL: 'mongodb+srv://Gotan:coderhouse@ecommerce.l0xcdsf.mongodb.net/ecommerce?retryWrites=true&w=majority',
    SECRETMONGO: process.env.SECRETMONGO,
    //NODEMAILER
    USER: process.env.USER,
    PASS: process.env.PASS,
    //TWILIO
    ACCOUNTSID: process.env.ACCOUNTSID, 
    AUTHTOKEN: process.env.AUTHTOKEN, 
    FROM: process.env.FROM, 


}