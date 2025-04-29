import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { MakeOng } from 'test/factories/make-ong-factories'
import { MakePet } from 'test/factories/make-pet-factories'

describe('Search Pets (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search pets by city', async () => {
    const ong = MakeOng()

    await request(app.server).post('/ongs').send(ong)

    const authResponse = await request(app.server)
      .post('/authenticate/ongs')
      .send({ email: ong.email, password: ong.password })

    await request(app.server)
      .post('/ong/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(MakePet())

    await request(app.server)
      .post('/ong/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(MakePet())

    const response = await request(app.server)
      .get('/ong/pets')
      .query({ city: ong.city })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(2)
  })

  it('should not be able to search pets without city', async () => {
    const response = await request(app.server).get('/ong/pets')

    expect(response.status).toBe(400)
  })

  it('should be able to search pets by city and age', async () => {
    const ong = MakeOng()

    await request(app.server).post('/ongs').send(ong)

    const authResponse = await request(app.server)
      .post('/authenticate/ongs')
      .send({ email: ong.email, password: ong.password })

    await request(app.server)
      .post('/ong/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(MakePet({ age: '1' }))

    await request(app.server)
      .post('/ong/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(MakePet())

    const response = await request(app.server)
      .get('/ong/pets')
      .query({ city: ong.city, age: '1' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to search pets by city and size', async () => {
    const ong = MakeOng()

    await request(app.server).post('/ongs').send(ong)

    const authResponse = await request(app.server)
      .post('/authenticate/ongs')
      .send({ email: ong.email, password: ong.password })

    await request(app.server)
      .post('/ong/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(MakePet({ size: 'small' }))

    await request(app.server)
      .post('/ong/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(MakePet({ size: 'medium' }))

    await request(app.server)
      .post('/ong/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(MakePet({ size: 'large' }))

    const response = await request(app.server)
      .get('/ong/pets')
      .query({ city: ong.city, size: 'small' })

      console.log(response.body)

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to search pets by city and energy level', async () => {
    const ong = MakeOng()

    await request(app.server).post('/ongs').send(ong)

    const authResponse = await request(app.server)
      .post('/authenticate/ongs')
      .send({ email: ong.email, password: ong.password })

    await request(app.server)
      .post('/ong/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(MakePet({ energy_level: 'low' }))

    await request(app.server)
      .post('/ong/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(MakePet({ energy_level: 'medium' }))

    const response = await request(app.server)
      .get('/ong/pets')
      .query({ city: ong.city, energy_level: 'low' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to search pets by city and environment', async () => {
    const ong = MakeOng()

    await request(app.server).post('/ongs').send(ong)

    const authResponse = await request(app.server)
      .post('/authenticate/ongs')
      .send({ email: ong.email, password: ong.password })

    await request(app.server)
      .post('/ong/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(MakePet({ environment: 'indoor' }))

    const response = await request(app.server)
      .get('/ong/pets')
      .query({ city: ong.city, environment: 'indoor' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  // create a test with a lot of pets that combines all the filters
  it('should be able to search pets by city and all filters', async () => {
    const ong = MakeOng()

    await request(app.server).post('/ongs').send(ong)

    const authResponse = await request(app.server)
      .post('/authenticate/ongs')
      .send({ email: ong.email, password: ong.password })

    const pets = [
      MakePet({
        age: '1',
        size: 'small',
        energy_level: 'low',
        environment: 'indoor',
      }),
      MakePet({
        age: '2',
        size: 'medium',
        energy_level: 'medium',
        environment: 'outdoor',
      }),
      MakePet({
        age: '1',
        size: 'large',
        energy_level: 'high',
        environment: 'indoor',
      }),
      MakePet({
        age: '4',
        size: 'small',
        energy_level: 'low',
        environment: 'outdoor',
      }),
      MakePet({
        age: '5',
        size: 'medium',
        energy_level: 'medium',
        environment: 'indoor',
      }),
    ]

    await Promise.all(
      pets.map((pet) =>
        request(app.server)
          .post('/ong/pets')
          .set('Authorization', `Bearer ${authResponse.body.token}`)
          .send(pet),
      ),
    )

    let response = await request(app.server).get('/ong/pets').query({
      city: ong.city,
      age: '1',
      size: 'small',
      energy_level: 'low',
      environment: 'indoor',
    })

    expect(response.body.pets).toHaveLength(1)

    response = await request(app.server).get('/ong/pets').query({
      city: ong.city,
      size: 'medium',
    })

    expect(response.body.pets).toHaveLength(2)

    response = await request(app.server).get('/ong/pets').query({
      city: ong.city,
      energy_level: 'low',
    })

    expect(response.body.pets).toHaveLength(2)
  })
})

function makeOrg() {
  throw new Error('Function not implemented.')
}
