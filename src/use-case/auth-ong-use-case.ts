import { InvalidCredentialsError } from "@/errors/invalid-credentials-error"
import type { OngInterface } from "@/repositories/ong-interface"
import type { Ong } from "@prisma/client"
import { compare } from "bcryptjs"


interface AuthOngUseCaseRequest {
  email: string,
  password: string
}

interface AuthOngUseCaseResponse {
  ong: Ong
}

export class AuthOngUseCase {
  constructor(private ongRepositories: OngInterface) {}

  async execute({
    email,
    password
  }: AuthOngUseCaseRequest) : Promise<AuthOngUseCaseResponse> {
    const ong = await this.ongRepositories.findByEmail(email)

    if(!ong) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, ong.password)

    if(!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return { ong }
  }
}