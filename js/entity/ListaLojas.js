"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let ListaLojas = class ListaLojas {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], ListaLojas.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ListaLojas.prototype, "nome_loja", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ListaLojas.prototype, "endereco", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ListaLojas.prototype, "celular", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ListaLojas.prototype, "cnpj", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ListaLojas.prototype, "horarioDeTrabalho", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ListaLojas.prototype, "cidade", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ListaLojas.prototype, "estado", void 0);
ListaLojas = __decorate([
    typeorm_1.Entity()
], ListaLojas);
exports.ListaLojas = ListaLojas;
//# sourceMappingURL=ListaLojas.js.map