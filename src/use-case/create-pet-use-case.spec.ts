import { OngRepositoriesInMemory } from "@/repositories/in-memory/ong-repositories-in-memory";
import { PetRepositoriesInMemory } from "@/repositories/in-memory/pet-repositories-in-memory";
import { beforeEach, describe, expect, it } from "vitest";
import { CreatePetUseCase } from "./create-pet-use-case";
import { MakeOng } from "test/factories/make-ong-factories";
import { MakePet } from "test/factories/make-pet-factories";

let ongRepositories: OngRepositoriesInMemory;
let petRepositories: PetRepositoriesInMemory;
let sut : CreatePetUseCase

describe('Create Pet - Unit test', () => {
  beforeEach(() => {
    ongRepositories = new OngRepositoriesInMemory()
    petRepositories = new PetRepositoriesInMemory(ongRepositories)
    sut = new CreatePetUseCase(ongRepositories, petRepositories)
  })
  it('should be able to create a new pet', async () => {
    const ong = await ongRepositories.create(MakeOng())
    const {pet} = await sut.execute(MakePet({ong_id: ong.id})) 

    expect(petRepositories.items).toHaveLength(1)
    expect(pet.id).toEqual(expect.any(String))
  })
})