import { faker } from "@faker-js/faker"

  type OverWhite = {
    password?: string
  }

  export function MakeOng(overwrite? : OverWhite) {
    return {
      id: crypto.randomUUID(),
      author_name: faker.person.fullName(),
      cep: faker.location.zipCode(),
      city: faker.location.city(),
      email: faker.internet.email(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      name: faker.company.name(),
      neighborhood: faker.location.streetAddress(),
      password: overwrite?.password ?? faker.internet.password(),
      state: faker.location.state(),
      street: faker.location.street(),
      whatsApp: faker.phone.number(),
    }
  }