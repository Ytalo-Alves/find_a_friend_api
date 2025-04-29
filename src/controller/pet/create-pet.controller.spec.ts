import { app } from "@/app";
import { MakeOng } from "test/factories/make-ong-factories";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { MakePet } from "test/factories/make-pet-factories";


describe('Create pet - test e2e', () => {
  beforeAll(() => {
    app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should create a new pet', async () => {
    const ong = MakeOng()

    await request(app.server).post('/ongs').send(ong)

    const authResponse = await request(app.server)
    .post('/authenticate/ongs')
    .send({email: ong.email, password: ong.password})

    const response = await request(app.server)
    .post('/ong/pets')
    .set('Authorization', `Bearer ${authResponse.body.token}`)
    .send(MakePet())

    expect(response.status).toBe(201)
  })
})