import express from "express";
import passport from "passport";
import { login, signup } from "../middleware/passport.js";
import * as controllersUsers from "../controllers/controllersUsers.js";
import authentication from "../middleware/auth.js";

///////////////////////////////////////////// PASSPORT /////////////////////////////////////////////

passport.use("login", login);
passport.use("signup", signup);
passport.serializeUser((user, done) => {
	done(null, user.mail);
});
passport.deserializeUser(async (username, done) => {
	const users = await controllersUsers.getUsersList();
	const user = users.find((u) => u.mail == username);
	if (user) {
		return done(null, user);
	} else {
		return done(null, false);
	}
});

///////////////////////////////////////////// ROUTES /////////////////////////////////////////////

const USER_ROUTER = express.Router();

//------------------------------------------- LOGIN -------------------------------------------//
USER_ROUTER.post(
	"/login",
	passport.authenticate("login", {
		failureRedirect: "/error-login",
		successRedirect: "/users",
	})
);
USER_ROUTER.get("/login", controllersUsers.login);
USER_ROUTER.get("/error-login", controllersUsers.errorLogin);

//------------------------------------------- REGISTER -------------------------------------------//
USER_ROUTER.post(
	"/signup",
	passport.authenticate("signup", {
		failureRedirect: "/error-signup",
		successRedirect: "/users",
	})
); 
USER_ROUTER.get("/signup", controllersUsers.signup);
USER_ROUTER.get("/error-signup", controllersUsers.errorsignup);

//------------------------------------------- LOGOUT -------------------------------------------//
USER_ROUTER.get("/logout", controllersUsers.logout);

//------------------------------------------- MANEJO DE USERS -------------------------------------------//
//                Estas rutas son protegidas y solo un usuario logueado podría utilizarlas.              //
//-------------------------------------------------------------------------------------------------------//

USER_ROUTER.get("/users", authentication, controllersUsers.getUsersListJSON);
USER_ROUTER.put("/users/:mail", authentication, controllersUsers.udateUser);
USER_ROUTER.delete(
	"/users/:mail",
	authentication,
	controllersUsers.deleteProduct
);

export { USER_ROUTER };
