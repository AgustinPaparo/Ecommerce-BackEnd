import express from "express";
import session from "express-session";

import passport from "passport";
import MongoStore from "connect-mongo";
import dotenv from "dotenv";
import logger from "./src/Loggers/logger.js";

import routerProducts from "./src/routes/routerProducts.js";
import { USER_ROUTER } from "./src/Routes/routerUser.js";

dotenv.config();

///////////////////////////////////////////// EXPRESS APP /////////////////////////////////////////////
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: process.env.SECRETMONGO,
		saveUninitialized: false,
		resave: false,
		rolling: true,
		store: MongoStore.create({
			mongoUrl: process.env.MONGOURL,
			mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
		}),
		cookie: {
			maxAge: 600000,
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));

///////////////////////////////////////////// MOTOR DE PLANTILLAS /////////////////////////////////////////////

app.set("views", "./views");
app.set("view engine", "pug");

///////////////////////////////////////////// DECLARACION DE RUTAS /////////////////////////////////////////////
const PRODUCTS_ROUTER = new routerProducts();

app.use("/productos", PRODUCTS_ROUTER.start());
app.use("/", USER_ROUTER);
// app.use("/carrito", routerApiCarrito);
// app.use("/", routerApiPedido);
app.get("/", (req, res) => {
	res.redirect("/productos");
});
app.get("*", (req, res) => {
	logger.warn(`invalid route: ${req.headers.referer}`);
	res.json({ error: "la ruta no existe" });
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
	logger.info(`HTTP server listening on ${server.address().port}`);
});
