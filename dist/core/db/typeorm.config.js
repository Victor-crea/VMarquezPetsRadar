"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTypeormOptions = buildTypeormOptions;
const lost_pet_entity_1 = require("../pets/lost-pets/lost-pet.entity");
const found_pet_entity_1 = require("../pets/found-pets/found-pet.entity");
function buildTypeormOptions(config) {
    return {
        type: 'postgres',
        host: config.get('DB_HOST', 'localhost'),
        port: config.get('DB_PORT', 5432),
        username: config.get('DB_USERNAME', 'postgres'),
        password: config.get('DB_PASSWORD', 'postgres'),
        database: config.get('DB_NAME', 'petradar'),
        entities: [lost_pet_entity_1.LostPet, found_pet_entity_1.FoundPet],
        synchronize: true,
        logging: config.get('NODE_ENV') !== 'production',
    };
}
//# sourceMappingURL=typeorm.config.js.map