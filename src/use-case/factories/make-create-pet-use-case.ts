import { OngPrisma } from "@/repositories/prisma/ong-prisma";
import { PetPrisma } from "@/repositories/prisma/pet-prisma";
import { CreatePetUseCase } from "../create-pet-use-case";

export function MakeCreatePetUseCase() {
  return new CreatePetUseCase (
    new OngPrisma(),
    new PetPrisma()
  )
}