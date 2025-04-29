import type { PetInterface } from "@/repositories/pet-interface";
import type { Pet } from "@prisma/client"


interface SearchPetUseCaseRequest {
  city: string,
  age?: string,
  size?: string,
  energy_level?: string,
  environment?: string
}

interface SearchPetUseCaseResponse {
  pets: Pet[];
}

export class SearchPetUseCase {
  constructor(private petRepositories: PetInterface) {}

  async execute({
    city,
    age,
    size,
    energy_level,
    environment
  }: SearchPetUseCaseRequest) : Promise<SearchPetUseCaseResponse> {
    const pets = await this.petRepositories.findAll({
      city,
      age,
      size,
      energy_level,
      environment
    })
    
    return { pets }
  }
}