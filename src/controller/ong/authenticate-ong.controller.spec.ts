import { app } from "@/app";
import { MakeOng } from "test/factories/make-ong-factories";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'

describe('Authenticate Ong - Test e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  

  it('should authenticate an ong', async () => {
    const ong = MakeOng()

    await request(app.server).post('/ongs').send(ong)

    const response = await request(app.server).post('/authenticate/ongs').send({
      email: ong.email,
      password: ong.password
    })

    expect(response.status).toBe(200)
    expect(response.body.token).toEqual(expect.any(String))
  })
})