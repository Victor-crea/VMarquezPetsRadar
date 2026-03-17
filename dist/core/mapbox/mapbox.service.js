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
exports.MapboxService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let MapboxService = class MapboxService {
    config;
    constructor(config) {
        this.config = config;
    }
    buildStaticMapUrl(params) {
        const token = this.config.get('MAPBOX_TOKEN');
        if (!token)
            return null;
        const { lostLng, lostLat, foundLng, foundLat } = params;
        const overlays = [
            `pin-s-l+ff0000(${lostLng},${lostLat})`,
            `pin-s-f+00aa00(${foundLng},${foundLat})`,
        ].join(',');
        return `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${overlays}/auto/600x400?access_token=${token}`;
    }
};
exports.MapboxService = MapboxService;
exports.MapboxService = MapboxService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MapboxService);
//# sourceMappingURL=mapbox.service.js.map