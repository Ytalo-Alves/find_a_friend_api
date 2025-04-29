import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { MakeOng } from "test/factories/make-ong-factories";


describe('Create Ong - Test e2e', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('Should create a new ong', async () => {
    const response = await request(app.server).post('/ongs').send(MakeOng())

    expect(response.status).toBe(201)
  })
})