import { app } from "@/app";
import { MakeOng } from "test/factories/make-ong-factories";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { MakePet } from "test/factories/make-pet-factories";

describe('Get pet - Test e2e', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should get a pet', async () => {
    const ong = MakeOng()

    await request(app.server).post('/ongs').send(ong)

    const authResponse = await request(app.server)
    .post('/authenticate/ongs')
    .send({email: ong.email, password: ong.password})

    const response = await request(app.server)
    .post('/ong/pets')
    .set('Authorization', `Bearer ${authResponse.body.token}` )
    .send(MakePet())

    const getPetResponse = await request(app.server)
    .get(`/ong/pets/${response.body.id}`)
    .set('Authorization', `Bearer ${authResponse.body.token}`)

    expect(getPetResponse.status).toBe(200)
  })
})