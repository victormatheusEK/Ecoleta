import express from 'express';
import multer from 'multer';
import { celebrate, Joi } from 'celebrate';
import multerConfig from './config/multer';
import SpotsController from './controllers/SpotsController';
import ItemsController from './controllers/ItemsController';

const upload = multer(multerConfig);
const routes = express.Router();
const spotsController = new SpotsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);
routes.get('/spots', spotsController.index);
routes.get('/spots/:id', spotsController.show);

routes.post(
  '/spots',
  upload.single('image'),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
      }),
    },
    { abortEarly: false }
  ),
  spotsController.create
);

export default routes;
