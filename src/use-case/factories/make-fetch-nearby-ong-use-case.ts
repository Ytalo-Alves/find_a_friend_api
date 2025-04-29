import { OngPrisma } from "@/repositories/prisma/ong-prisma";
import { FetchNearbyOngUseCase } from "../fetch-nearby-ong-use-case";

export function MakeFetchNearbyOngUseCase() {
  return new FetchNearbyOngUseCase(new OngPrisma())
}