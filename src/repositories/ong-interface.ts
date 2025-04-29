import { Ong, Prisma } from "@prisma/client";

export interface FindManyNearbyParams {
  latitude: number,
  longitude: number,
}

export interface OngInterface {
  create(data: Prisma.OngCreateInput): Promise<Ong>
  findById(id: string): Promise<Ong | null>
  findByEmail(email: string): Promise<Ong | null>
  findManyNearby(params: FindManyNearbyParams): Promise<Ong[]>
}