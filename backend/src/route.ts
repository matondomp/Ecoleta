

import express from 'express'
 const routes=express.Router()
 import multer from 'multer'
import multerConfig from './config/multer'
import PointController from './controller/PointController'
import ItemController from './controller/ItemController'
import {celebrate,Joi} from 'celebrate'

const upload = multer(multerConfig)

const pointController = new PointController()
const itemController = new ItemController()
routes.get('/uploads', itemController.crete)

routes.get('/points', pointController.index)
routes.post('/points', upload.single('image'),
    celebrate({
        body:Joi.object().keys({
            nome:Joi.string().required(),
            email:Joi.string().required().email(),
            whatsapp: Joi.string().required(),
            latitude: Joi.string().required(),
            longitude: Joi.string().required(),
            uf: Joi.string().required().max(2),
            city: Joi.string().required(),
            items: Joi.string().required()
        })
  },
    {
        abortEarly: false
    }
  )
 ,pointController.crete)
routes.get('/point/:id', pointController.show)

export default routes