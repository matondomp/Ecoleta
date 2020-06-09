import { Request, Response } from 'express'
import knex from '../database/conection'
class ItemController {
    async  crete(response: Response) {
        const items = await knex('items').select('*')
        const serilized = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://localhost:3333/uploads/${item.image}`
            }
        })
        return response.json(serilized)
    }
}

export default ItemController

