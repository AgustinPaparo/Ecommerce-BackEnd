import twilio from "twilio";
import { createTransport } from "nodemailer";
import logger from "./Loggers/logger.js";
import Config from "../../Config.js";

///////////////////////////////////////////// NODEMAILER /////////////////////////////////////////////
const USER = Config.USER;
const PASS = Config.PASS;

const transporter = createTransport({
	service: "gmail",
	port: 587,
	auth: {
		user: USER,
		pass: PASS,
	},
});

export const nodemailerRegister = async (newUser) => {
	const mailOptions = {
		from: "<agustin@backend.com.ar>",
		to: USER,
		subject: "Nuevo Usuario Registrado",
		html: `Nuevo usuario registrado: <br>
        nombre = ${newUser.nombre}<br>
        mail = ${newUser.mail}<br>
        password = ${newUser.password}<br>
        numero = ${newUser.numero}
        `,
	};

	try {
		const mensaje = await transporter.sendMail(mailOptions);
        logger.info(mensaje)
	} catch (error) {
		logger.error(`error mensajes: ${error}`)
        console.error(error);
	}
};

export const nodemailerCheckout = async (order) => {
    let products =  JSON.stringify(order.products)
	const mailOptions = {
		from: "<agustin@backend.com>",
		to: order.user,
		subject: `nuevo pedido de ${order.user}`,
		text: `
                Detalle de la compra:
                ${products}
                Total: ${order.total}
                Fecha: ${order.timestamp}
        `,
		html: `
                <b>Detalle de la compra:</b><br>
                ${products}<br>
                <b>Total:</b> ${order.total} <br>
                <b>Fecha:</b> ${order.timestamp}
`,
	};
	try {
		const mensaje = await transporter.sendMail(mailOptions);
        logger.info(mensaje)
	} catch (error) {
		logger.error(`error mensajes: ${error}`);
	}
};

///////////////////////////////////////////// TWILIO /////////////////////////////////////////////

const FROM = Config.FROM;
const accountSid = Config.ACCOUNTSID;
const authToken = Config.AUTHTOKEN;

const twilioClient = twilio(accountSid, authToken);

export const twilioCheckout = async (phone, order) => {
    let products = JSON.stringify(order.products)
    let wppMessage = `
        ${order.user} realizó un pedido de:
        ${products}
        `;
	await twilioClient.messages
		.create({
			body: `${wppMessage}`,
			from: `whatsapp:${FROM}`,
			to: `whatsapp:+${phone}`,
		})
		.then(console.log("Whatsapp enviado"))
		.catch((err) => {
			logger.error(`error mensajes: ${err}`);
		});
};
