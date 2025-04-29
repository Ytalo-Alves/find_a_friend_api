import { OngPrisma } from "@/repositories/prisma/ong-prisma";
import { AuthOngUseCase } from "../auth-ong-use-case";

export function MakeAuthOngUseCase() {
  return new AuthOngUseCase(new OngPrisma())
}