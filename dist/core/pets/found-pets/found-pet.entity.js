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
exports.FoundPet = void 0;
const typeorm_1 = require("typeorm");
let FoundPet = class FoundPet {
    id;
    species;
    breed;
    color;
    size;
    description;
    photoUrl;
    finderName;
    finderEmail;
    finderPhone;
    location;
    address;
    foundDate;
    createdAt;
    updatedAt;
};
exports.FoundPet = FoundPet;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FoundPet.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 60 }),
    __metadata("design:type", String)
], FoundPet.prototype, "species", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 120, nullable: true }),
    __metadata("design:type", Object)
], FoundPet.prototype, "breed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 60 }),
    __metadata("design:type", String)
], FoundPet.prototype, "color", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], FoundPet.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], FoundPet.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", Object)
], FoundPet.prototype, "photoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 120 }),
    __metadata("design:type", String)
], FoundPet.prototype, "finderName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], FoundPet.prototype, "finderEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 40 }),
    __metadata("design:type", String)
], FoundPet.prototype, "finderPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'geometry',
        spatialFeatureType: 'Point',
        srid: 4326,
    }),
    __metadata("design:type", Object)
], FoundPet.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], FoundPet.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], FoundPet.prototype, "foundDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], FoundPet.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], FoundPet.prototype, "updatedAt", void 0);
exports.FoundPet = FoundPet = __decorate([
    (0, typeorm_1.Entity)({ name: 'found_pets' })
], FoundPet);
//# sourceMappingURL=found-pet.entity.js.map