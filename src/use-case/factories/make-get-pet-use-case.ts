import { PetPrisma } from "@/repositories/prisma/pet-prisma";
import { GetPetUseCase } from "../get-pet-use-case";

export function MakeGetPetUseCase() {
  return new GetPetUseCase(new PetPrisma())
}