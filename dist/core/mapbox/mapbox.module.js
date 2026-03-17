"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapboxModule = void 0;
const common_1 = require("@nestjs/common");
const mapbox_service_1 = require("./mapbox.service");
let MapboxModule = class MapboxModule {
};
exports.MapboxModule = MapboxModule;
exports.MapboxModule = MapboxModule = __decorate([
    (0, common_1.Module)({
        providers: [mapbox_service_1.MapboxService],
        exports: [mapbox_service_1.MapboxService],
    })
], MapboxModule);
//# sourceMappingURL=mapbox.module.js.map