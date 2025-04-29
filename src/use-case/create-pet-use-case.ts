import { OngNotFoundError } from "@/errors/ong-not-found-error";
import { OngInterface } from "@/repositories/ong-interface";
import { PetInterface } from "@/repositories/pet-interface";
import { Pet } from "@prisma/client";

interface CreatePetUseCaseRequest {
  name: string;
  age: string;
  about: string;
  size: string;
  energy_level: string;
  environment: string;
  ong_id: string;
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(
    private ongRepositories: OngInterface,
    private petRepositories: PetInterface
  ) {}

  async execute({
    name,
    age,
    about,
    size,
    energy_level,
    environment,
    ong_id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const ong = await this.ongRepositories.findById(ong_id);

    if (!ong) {
      throw new OngNotFoundError();
    }

    const pet = await this.petRepositories.create({
      name,
      about,
      age,
      size,
      energy_level,
      environment,
      ong_id,
    });

    return { pet };
  }
}
