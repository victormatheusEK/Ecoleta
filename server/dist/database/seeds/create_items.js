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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex('items').insert([
            { title: 'Lâmpadas', image: 'lampadas.svg' },
            { title: 'Pilhas e Baterias', image: 'baterias.svg' },
            { title: 'Papeis e Papelão', image: 'papeis-papelao.svg' },
            { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg' },
            { title: 'Resíduos Orgânicos', image: 'organicos.svg' },
            { title: 'Óleo de cozinha', image: 'oleo.svg' },
        ]);
    });
}
exports.seed = seed;
//# sourceMappingURL=create_items.js.map