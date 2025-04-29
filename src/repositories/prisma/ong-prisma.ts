import type { Prisma, Ong } from "@prisma/client";
import { OngInterface, type FindManyNearbyParams } from "../ong-interface";
import { prisma } from "@/lib/prisma";

export class OngPrisma implements OngInterface {
  async create(data: Prisma.OngCreateInput) {
    const ong = await prisma.ong.create({ data });
    return ong;
  }

  async findById(id: string) {
    const ong = await prisma.ong.findUnique({ where: { id } });
    return ong;
  }

  async findByEmail(email: string) {
    const ong = await prisma.ong.findUnique({ where: { email } });
    return ong;
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const ongs = await prisma.$queryRaw<Ong[]>`
      SELECT * FROM ongs
      WHERE ( 
        6371 * acos(
           cos( radians(${latitude}) ) * cos( radians( latitude ) ) * 
           cos( radians( longitude ) - radians(${longitude}) ) + 
           sin( radians(${latitude}) ) * sin( radians( latitude ) )
            )
          ) <= 10
    `;

    return ongs;
  }
}
