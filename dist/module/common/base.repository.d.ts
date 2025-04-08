import { PrismaService } from "./prisma.service";
export declare class BaseRepository {
    prisma: PrismaService;
    constructor(prisma: PrismaService);
}
