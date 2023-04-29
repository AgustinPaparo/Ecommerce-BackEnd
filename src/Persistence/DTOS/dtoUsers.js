export default class usersDTO {
	constructor({ _id, id, nombre, mail, foto, numero, password }) {
        this._id = _id,
        this.id = id,
        this.nombre = nombre,
        this.mail = mail,
        this.foto = foto,
        this.numero = numero,
        this.password = password
	}
}

export function transformDTO(users) {
    if (Array.isArray(users)) {
        return users.map(u => new usersDTO(u))
    } else {
        return new usersDTO(users)
    }
}