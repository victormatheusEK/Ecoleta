"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SpotsController_1 = __importDefault(require("./controllers/SpotsController"));
const ItemsController_1 = __importDefault(require("./controllers/ItemsController"));
const routes = express_1.default.Router();
const spotsController = new SpotsController_1.default();
const itemsController = new ItemsController_1.default();
routes.get('/items', itemsController.index);
routes.post('/spots', spotsController.create);
routes.get('/spots', spotsController.index);
routes.get('/spots/:id', spotsController.show);
exports.default = routes;
//# sourceMappingURL=routes.js.map