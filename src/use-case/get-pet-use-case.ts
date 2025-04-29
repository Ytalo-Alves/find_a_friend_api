import { PetNotFoundError } from "@/errors/pet-not-found-error"
import type { PetInterface } from "@/repositories/pet-interface"
import type { Pet } from "@prisma/client"


interface GetPetUseCaseRequest {
  id: string
}

interface GetPetUseCaseResponse {
  pet: Pet
}

export class GetPetUseCase {
  constructor(private petRepositories: PetInterface) {}

  async execute({ id }: GetPetUseCaseRequest) : Promise<GetPetUseCaseResponse> {
    const pet = await this.petRepositories.findById(id)

    if(!pet) throw new PetNotFoundError()

    return { pet }
  } 
}