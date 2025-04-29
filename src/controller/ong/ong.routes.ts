import type { FastifyInstance } from "fastify";
import { createOngController } from "./create-ong.controller";
import { AuthenticateOngController } from "./authenticate-ong.controller";
import { FetchNearbyOngController } from "./fetch-nearby-ong.controller";



export async function ongRoutes(app: FastifyInstance) {
  app.post('/ongs', createOngController)
  app.post('/authenticate/ongs', AuthenticateOngController)
  app.get('/ongs/nearby', FetchNearbyOngController)
}