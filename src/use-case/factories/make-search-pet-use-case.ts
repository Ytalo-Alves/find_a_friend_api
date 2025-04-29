import { PetPrisma } from "@/repositories/prisma/pet-prisma";
import { SearchPetUseCase } from "../search-pet-use-case";

export function MakeSearchPetUseCase() {
  return new SearchPetUseCase(new PetPrisma)
}