import { OngRepositoriesInMemory } from "@/repositories/in-memory/ong-repositories-in-memory";
import { PetRepositoriesInMemory } from "@/repositories/in-memory/pet-repositories-in-memory";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchPetUseCase } from "./search-pet-use-case";
import { MakeOng } from "test/factories/make-ong-factories";
import { MakePet } from "test/factories/make-pet-factories";


describe('Get pet - Unit Test', () => {
  let petRepositories: PetRepositoriesInMemory
  let ongRepositories: OngRepositoriesInMemory
  let sut: SearchPetUseCase

  beforeEach(() => {
    ongRepositories = new OngRepositoriesInMemory()
    petRepositories = new PetRepositoriesInMemory(ongRepositories)
    sut = new SearchPetUseCase(petRepositories)
  })

  it('should be able to search pet by city', async () => {
    const ong = await ongRepositories.create(MakeOng())

    await petRepositories.create(MakePet({ong_id: ong.id}))
    await petRepositories.create(MakePet({ong_id: ong.id}))

    const ong2 = await ongRepositories.create(MakeOng())

    await petRepositories.create(MakePet({ong_id: ong2.id}))

    const { pets } = await sut.execute({city: ong.city})

    expect(pets).toHaveLength(2)

    const { pets: pet2 } = await sut.execute({city: ong2.city})

    expect(pet2).toHaveLength(1) 
  })

  it('should be able to search pets by city and age', async () => {
    const ong = await ongRepositories.create(MakeOng())

    await petRepositories.create(MakePet({ong_id: ong.id, age: '1'}))
    await petRepositories.create(MakePet({ong_id: ong.id}))

    const { pets } = await sut.execute({ city: ong.city, age: '1'})

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pets by city and size', async () => {
    const ong = await ongRepositories.create(MakeOng())

    await petRepositories.create(MakePet({ong_id: ong.id, size: 'small'}))
    await petRepositories.create(MakePet({ong_id: ong.id, size: 'medium'}))
    await petRepositories.create(MakePet({ong_id: ong.id, size: 'large'}))

    const { pets } = await sut.execute({city: ong.city, size: 'large'})

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pet by city and energy_level', async () => {
    const ong = await ongRepositories.create(MakeOng())

    await petRepositories.create(MakePet({ong_id: ong.id, energy_level: 'low'}))
    await petRepositories.create(MakePet({ong_id: ong.id, energy_level: 'medium'}))
    await petRepositories.create(MakePet({ong_id: ong.id, energy_level: 'high'}))

    const { pets } = await sut.execute({ city: ong.city, energy_level: 'high'})

    expect(pets).toHaveLength(1)
  })

  it('should be able to search pet by city and environment', async () => {
    const ong = await ongRepositories.create(MakeOng())
  
    await petRepositories.create(
      MakePet({ ong_id: ong.id, environment: 'INDOOR' }) // padronizado
    )
    await petRepositories.create(
      MakePet({ ong_id: ong.id, environment: 'OUTDOOR' }) // padronizado
    )
  
    const { pets } = await sut.execute({
      city: ong.city,
      environment: 'INDOOR', // usa o mesmo formato
    })
  
    expect(pets).toHaveLength(1)
  })
})