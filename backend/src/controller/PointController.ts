import {Request,Response} from 'express'
import knex from '../database/conection'
class PointController{
    
    async index(request: Request, response: Response){
          const {city,uf,items}=request.query
            const pointItem=String(items).split(',')
            .map(item=>Number(item.trim()))
          const point_item=await knex('points')
              .join('point_items', 'points.id', '=','point_items.points_id')
              .whereIn('point_items.items_id', pointItem)
              .where('city',String(city))
              .where('uf', String(uf))
              .distinct()
              .select('points.*')
        const serializedPoints = point_item.map(point => {
            return {
                ...point,
                image_url: `http://localhost:3333/uploads/${point.image
                }`
            }
        })
        return response.json({ point: serializedPoints})
      }

      async show(request:Request,response:Response){

           const id=request.params.id
           const data=await knex('points').where('id',id).first()
        if(!data){
            return response.status(400).json({erro:"erro nao em contra points"})
        }
           const item=await knex('items')
               .join('point_items','items.id','=','point_items.items_id')
               .where('point_items.points_id',id)
               .select('title')
          const serializedPoints = {
             
              image_url: `http://localhost:3333/uploads/${data.image
                      }`
        
          }
          return response.json({ points: serializedPoints ,item})
      }

    async crete(request: Request, response: Response){
        const {
            items,
            nome,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        } = await request.body
    
       const trx= await knex.transaction()
            const point={
                     image: request.file.filename,
                     nome,
                     email,
                     whatsapp,
                    latitude,
                     longitude,
                    city,
                     uf
                     }
              
                const id = await trx('points').insert(point)
                    const points_id = id[0]
                    const point_item = items
                    .split(',')
                    .map((items:string)=>Number(items.trim()))
                        .map((items_id: number) => {
                      
                        return {
                            items_id,
                             points_id, 
                        }
                         
                    })
      
       
        await trx('point_items').insert(point_item)

                  await trx.commit()
                    return response.json({
                        id: points_id,
                        ...point
                      
                    })
                }              
}

export default PointController

