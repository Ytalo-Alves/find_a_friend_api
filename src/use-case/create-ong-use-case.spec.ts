import { OngRepositoriesInMemory } from "@/repositories/in-memory/ong-repositories-in-memory";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateOngUseCase } from "./create-ong-use-case";
import { MakeOng } from "test/factories/make-ong-factories";
import { OngAlreadyExistsError } from "@/errors/already-exists-error";
import { compare } from "bcryptjs";

let ongRepositories: OngRepositoriesInMemory;
let sut: CreateOngUseCase;

describe("Create Ong - Unit test", () => {
  beforeEach(() => {
    ongRepositories = new OngRepositoriesInMemory();
    sut = new CreateOngUseCase(ongRepositories);
  });

  it('should be able to create a new ong', async () => {
    const {ong} = await sut.execute(MakeOng())

    expect(ongRepositories.items).toHaveLength(1)
    expect(ong.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new ong with an already used email', async () => {
    const  ong = MakeOng()

    await ongRepositories.create(ong)

    await expect(sut.execute(ong)).rejects.toBeInstanceOf(OngAlreadyExistsError)

  })

  it('should hash password upon creation', async () => {
    const password = '123456'

    const {ong} = await sut.execute(MakeOng({ password }))

    expect(await compare(password, ong.password)).toBe(true)
    expect(await compare(password, ongRepositories.items[0].password)).toBe(true)
  })

});
