import { app } from "@/app";
import { MakeOng } from "test/factories/make-ong-factories";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'

describe('Fetch Nearby Ong - Test e2e', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to fetch nearby ong', async () => {
    const ong = MakeOng()

    await request(app.server).post('/ongs').send(ong).expect(201)

    const response = await request(app.server)
    .get('/ongs/nearby')
    .query({latitude: ong.latitude, longitude: ong.longitude})
    .expect(200)

    expect(response.body.ong).toHaveLength(1)
    expect(response.body.ong[0].name).toEqual(ong.name)
  })
})