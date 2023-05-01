import express from "express";
import session from "express-session";

import config from "./Config.js"
import passport from "passport";
import MongoStore from "connect-mongo";
import logger from "./src/utils/Loggers/logger.js";

import { USER_ROUTER } from "./src/Routes/routerUser.js";
import routerProducts from "./src/Routes/routerProducts.js";
import routerCart from "./src/Routes/routerCart.js";




///////////////////////////////////////////// EXPRESS APP /////////////////////////////////////////////
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: config.SECRETMONGO,
		saveUninitialized: false,
		resave: false,
		rolling: true,
		store: MongoStore.create({
			mongoUrl: config.MONGOURL,
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
const CART_ROUTER = new routerCart()

app.use("/", USER_ROUTER);
app.use("/productos", PRODUCTS_ROUTER.start());
app.use("/shop", CART_ROUTER.start());
app.get("/", (req, res) => {
	res.redirect("/productos");
})
app.get("*", (req, res) => {
	logger.warn(`invalid route: ${req.headers.referer}`);
	res.status(404).json({ ERROR: "The requested URL was not found on this server." });
});

const PORT = config.PORT
const server = app.listen(PORT, () => {
	logger.info(`HTTP server listening on ${server.address().port}`);
});
