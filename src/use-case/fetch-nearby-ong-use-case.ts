import { OngInterface } from "@/repositories/ong-interface";
import type { Ong } from "@prisma/client";

interface FetchNearbyOngUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyOngUseCaseResponse {
  ong: Ong[]
}

export class FetchNearbyOngUseCase {
  constructor(private ongRepositories : OngInterface) {}

  async execute({
    userLatitude, userLongitude
  }: FetchNearbyOngUseCaseRequest): Promise<FetchNearbyOngUseCaseResponse> {
    const ong = await this.ongRepositories.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude
    })

    return { ong }
  }
}