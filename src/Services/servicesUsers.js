import Factory from "../Persistence/DAOS/factory.js";

export default class UsersServices {
	constructor() {
		this.usersDAO = Factory.getDao("users");
	}

	getUsers = async () => {
		return await this.usersDAO.getAll();
	};

	getUserByMail = async (mail) => {
		return await this.usersDAO.getByMail(mail);
	};

	createUser = async (user) => {
		return await this.usersDAO.createUser(user);
	};

	updateUser = async (mail, update) => {
		return await this.usersDAO.updateByMail(mail, update);
	};

	deleteUser = async (mail) => {
		return await this.usersDAO.deleteByMail(mail);
	};
}
