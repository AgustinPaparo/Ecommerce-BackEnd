import { promises as fs } from "fs"

export default class ordersDao {

    constructor(route) {
        this.ruta = route
    }

    async showOrders() {
        try {
            const orders = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(orders)
        } catch (err) {
            return []
        }
    }

    async addOrder(newOrder) {
        try {
            const orders = await this.showOrders()
            orders.push(newOrder)

            await fs.writeFile(this.ruta, JSON.stringify(orders)) // devuelve undifined si es que se escribio todo bien
            return newOrder
        } catch (err) {
            console.log(err);
        }
    }

}

