import { OngPrisma } from "@/repositories/prisma/ong-prisma";
import { CreateOngUseCase } from "../create-ong-use-case";


export function MakeCreateOngUseCase() {
  return new CreateOngUseCase(new OngPrisma())
}