import { Pet, type Prisma } from "@prisma/client";
import { FindAllParams, PetInterface } from "../pet-interface";
import { prisma } from "@/lib/prisma";


export class PetPrisma implements PetInterface{
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({data})
    return pet
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({where: {id}})
    return pet
  }

  async findAll(params: FindAllParams) {
    const pets = await prisma.pet.findMany({
      where: {
        age: params.age,
        size: params.size,
        energy_level: params.energy_level,
        ong: {
          city: {
            contains: params.city,
            mode: 'insensitive'
          }
        }
      }
    })

    return pets
  }
 
}