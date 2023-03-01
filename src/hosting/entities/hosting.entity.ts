import { Prisma } from '@prisma/client';

export class Hosting implements Prisma.HostingUncheckedCreateInput {
    id?: string;
    name: string;
    language: string;
    price: number;
    userId: string;
}
