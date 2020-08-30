"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
class SpotsController {
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const spot = yield connection_1.default('spots').where('id', id).first();
            if (!spot)
                return res.status(400).json({ message: 'spot not found!' });
            const items = yield connection_1.default('items')
                .join('spots_items', 'items.id', '=', 'spots_items.id')
                .where('spots_items.spot_id', id)
                .select('items.title');
            return res.json({ spot, items });
        });
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { city, uf, items } = req.query;
            const parsedItems = String(items).split(/, */);
            const spots = yield connection_1.default('spots')
                .join('spots_items', 'spots.id', '=', 'spots_items.spot_id')
                .whereIn('spots_items.item_id', parsedItems)
                .where('city', String(city))
                .where('uf', String(uf).toUpperCase())
                .distinct()
                .select('spots.*');
            res.json(spots);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, whatsapp, latitude, longitude, city, uf, items, } = req.body;
            const spot = {
                image: 'image-fake',
                name,
                email,
                whatsapp,
                latitude,
                longitude,
                city,
                uf: String(uf).toUpperCase(),
            };
            const trx = yield connection_1.default.transaction();
            const insertedIds = yield trx('spots').insert(spot);
            const spot_id = insertedIds[0];
            const spotItems = items.map((item_id) => {
                return {
                    item_id,
                    spot_id,
                };
            });
            yield trx('spots_items').insert(spotItems);
            yield trx.commit();
            return res.json(Object.assign({ spot_id }, spot));
        });
    }
}
exports.default = SpotsController;
//# sourceMappingURL=SpotsController.js.map