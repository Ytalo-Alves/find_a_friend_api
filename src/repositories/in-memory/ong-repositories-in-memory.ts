import { Ong, Prisma } from "@prisma/client";
import type { FindManyNearbyParams, OngInterface } from "../ong-interface";
import { randomUUID } from "crypto";
import { Decimal } from "@prisma/client/runtime/library";
import { DistanceCoordinates } from "@/utils/distance-coordinates";



export class OngRepositoriesInMemory implements  OngInterface{
  public items: Ong[] = [];


  async create(data: Prisma.OngCreateInput){
    const ong = {
      id: randomUUID(),
      ...data,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString())
    }
      this.items.push(ong)

    return ong
  }

  async findById(id: string) {
    return this.items.find((ong) => ong.id === id) || null;
  }

  async findByEmail(email: string) {
    return this.items.find((ong) => ong.email === email) || null
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = DistanceCoordinates({
        latitude: params.latitude, longitude: params.longitude
      },{
        latitude: item.latitude.toNumber(),
        longitude: item.longitude.toNumber()
      })
      return distance < 10
    })
  }


}