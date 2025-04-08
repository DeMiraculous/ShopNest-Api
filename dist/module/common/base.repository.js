"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const prisma_service_1 = require("./prisma.service");
class BaseRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
        this.prisma = new prisma_service_1.PrismaService();
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map