import { Pet, type Prisma } from "@prisma/client";
import { PetInterface, type FindAllParams } from "../pet-interface";
import { randomUUID } from "crypto";
import { OngRepositoriesInMemory } from "./ong-repositories-in-memory";



export class PetRepositoriesInMemory implements PetInterface {

  public items: Pet[] = [];

  constructor(private ongRepositories: OngRepositoriesInMemory) {}

  async create(data: Prisma.PetUncheckedCreateInput){
    const pet = {
      id: randomUUID(),
      ...data,
    }
    this.items.push(pet)
    return pet
  }

  async findById(id: string){
    return this.items.find((item) => item.id === id) ?? null
  }

  async findAll(params: FindAllParams) : Promise<Pet[]>{
    const ongByCity = this.ongRepositories.items.filter(
      (ong) => ong.city === params.city,
    )

    const pets = this.items
      .filter((item) => ongByCity.some((ong) => ong.id === item.ong_id))
      .filter((item) => (params.age ? item.age === params.age : true))
      .filter((item) => (params.size ? item.size === params.size : true))
      .filter((item) => params.energy_level ? item.energy_level === params.energy_level : true)
      .filter((item) => params.environment ? item.environment === params.environment : true)

    return pets
  }

}

  