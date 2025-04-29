import { OngRepositoriesInMemory } from "@/repositories/in-memory/ong-repositories-in-memory";
import { beforeEach, describe, expect, it } from "vitest";
import { AuthOngUseCase } from "./auth-ong-use-case";
import { MakeOng } from "test/factories/make-ong-factories";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";

describe('Authenticate Ong - Unit test', () => {
  let ongRepositories: OngRepositoriesInMemory
  let sut: AuthOngUseCase

  beforeEach(() => {
    ongRepositories = new OngRepositoriesInMemory()
    sut = new AuthOngUseCase(ongRepositories)
  })

  it('should be able to authenticate an ong', async () => {
    const password = '123456'

    const ong = await ongRepositories.create(
      MakeOng({password: await hash(password, 8)})
    )

    const {ong: authenticateOng} = await sut.execute({
      email: ong.email,
      password
    })

    expect(authenticateOng).toEqual(ong)
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() => 
      sut.execute({
        email: 'johndoe@exemplo.com',
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const password = '123456'

    const ong = await ongRepositories.create(
      MakeOng({password: await hash(password, 8)})
    )

    await expect(() => 
      sut.execute({
        email: ong.email,
        password: '123123'
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})