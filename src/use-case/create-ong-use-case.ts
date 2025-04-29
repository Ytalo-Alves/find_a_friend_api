import { OngAlreadyExistsError } from '@/errors/already-exists-error'
import { OngInterface } from '@/repositories/ong-interface'
import { Ong } from '@prisma/client'
import { hash } from 'bcryptjs'

interface CreateOrgUseCaseRequest {
  name: string
  author_name: string
  email: string
  whatsApp: string
  password: string
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  latitude: number
  longitude: number
}

interface CreateOrgUseCaseResponse {
  ong: Ong
}

export class CreateOngUseCase {
  constructor(private ongRepositories: OngInterface ) {}

  async execute({
    name,
    author_name,
    email,
    whatsApp,
    password,
    cep,
    state,
    city,
    neighborhood,
    street,
    latitude,
    longitude,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const orgByEmail = await this.ongRepositories.findByEmail(email)

    if (orgByEmail) throw new OngAlreadyExistsError()

    const password_hash = await hash(password, 8)

    const ong = await this.ongRepositories.create({
      name,
      author_name,
      email,
      whatsApp,
      password: password_hash,
      cep,
      state,
      city,
      neighborhood,
      street,
      latitude,
      longitude,
    })

    return { ong }
  }
}