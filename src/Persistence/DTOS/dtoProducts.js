export default class productsDTO {
	constructor({ _id, id, nombre, descripcion, foto, precio, stock }) {
        this._id = _id,
        this.id = id,
        this.nombre = nombre,
        this.descripcion = descripcion,
        this.foto = foto,
        this.precio = precio,
        this.stock = stock
	}
}

export function transformDTO(prod) {
    if (Array.isArray(prod)) {
        return prod.map(p => new productsDTO(p))
    } else {
        return new productsDTO(prod)
    }
}