import { OngRepositoriesInMemory } from '@/repositories/in-memory/ong-repositories-in-memory'
import { PetRepositoriesInMemory } from '@/repositories/in-memory/pet-repositories-in-memory'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetUseCase } from './get-pet-use-case'
import { MakePet } from 'test/factories/make-pet-factories'
import { PetNotFoundError } from '@/errors/pet-not-found-error'

describe('Get Pet Use Case', () => {
  let petsRepository: PetRepositoriesInMemory
  let sut: GetPetUseCase

  beforeEach(() => {
    const ongRepository = new OngRepositoriesInMemory()
    petsRepository = new PetRepositoriesInMemory(ongRepository)
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get a new pet', async () => {
    const pet = await petsRepository.create(MakePet())
    const result = await sut.execute({ id: pet.id })

    expect(result.pet).toEqual(pet)
  })

  it('should not be able to get a non-existing pet', async () => {
    await expect(sut.execute({ id: 'invalid' })).rejects.toBeInstanceOf(
      PetNotFoundError,
    )
  })
})
