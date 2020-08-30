import { Request, Response } from 'express';
import knex from '../database/connection';

class SpotsController {
  async show(req: Request, res: Response) {
    const { id } = req.params;

    const spot = await knex('spots').where('id', id).first();

    if (!spot) return res.status(400).json({ message: 'spot not found!' });

    const serializedSpot = {
      ...spot,
      image: `http://192.168.42.48:8000/uploads/${spot.image}`,
    };

    const items = await knex('items')
      .join('spots_items', 'items.id', '=', 'spots_items.item_id')
      .where('spots_items.spot_id', id)
      .select('items.title');

    return res.json({ spot: serializedSpot, items });
  }
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items).split(/, */);

    const spots = await knex('spots')
      .join('spots_items', 'spots.id', '=', 'spots_items.spot_id')
      .whereIn('spots_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf).toUpperCase())
      .distinct()
      .select('spots.*');

    const serializedSpots = spots.map((spot) => ({
      ...spot,
      image: `http://192.168.42.48:8000/uploads/${spot.image}`,
    }));

    res.json(serializedSpots);
  }
  async create(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = req.body;

    const spot = {
      image: req.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf: String(uf).toUpperCase(),
    };
    const trx = await knex.transaction();
    const insertedIds = await trx('spots').insert(spot);

    const spot_id = insertedIds[0];
    const spotItems = items.split(/, */).map((item_id: number) => {
      return {
        item_id,
        spot_id,
      };
    });

    await trx('spots_items').insert(spotItems);

    await trx.commit();

    return res.json({
      spot_id,
      ...spot,
    });
  }
}

export default SpotsController;
