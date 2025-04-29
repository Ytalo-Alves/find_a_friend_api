import {faker} from '@faker-js/faker'

type OverWrite = {
  ong_id?: string
  age?: string
  size?: string
  energy_level?: string
  environment?: string
}

export function MakePet(overwrite? : OverWrite){
  return {
    id: crypto.randomUUID(),
    ong_id: overwrite?.ong_id ?? crypto.randomUUID(),
    name: faker.animal.dog(),
    about: faker.lorem.paragraph(),
    age: overwrite?.age ?? faker.number.int().toString(),
    size: overwrite?.size ?? faker.helpers.arrayElement(['small', 'medium', 'large']),
    energy_level: overwrite?.energy_level ?? faker.helpers.arrayElement(['low', 'medium', 'high']),
    environment: faker.helpers.arrayElement(['indoor', 'outdoor'])
  }
}