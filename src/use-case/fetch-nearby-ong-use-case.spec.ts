import { OngRepositoriesInMemory } from "@/repositories/in-memory/ong-repositories-in-memory";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearbyOngUseCase } from "./fetch-nearby-ong-use-case";
import { MakeOng } from "test/factories/make-ong-factories";

describe('Fetch nearby ong use case', () => {
  let ongRepositories: OngRepositoriesInMemory;
  let sut : FetchNearbyOngUseCase

  beforeEach(() => {
    ongRepositories = new OngRepositoriesInMemory()
    sut = new FetchNearbyOngUseCase(ongRepositories)
  })

  it('should be able to fetch nearby ong', async () => {
    const ong = await ongRepositories.create(MakeOng())

    const nearbyOng = await sut.execute({
      userLatitude: ong.latitude.toNumber(),
      userLongitude: ong.longitude.toNumber()
    })

    expect(nearbyOng.ong).toEqual([ong])
  })
})