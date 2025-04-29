import { verifyJwt } from "@/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { CreatePetController } from "./create-pet.controller";
import { GetPetController } from "./get-pet.controller";
import { SearchPetController } from "./search-pet.controller";

export async function petRoutes(app: FastifyInstance){
  app.post('/ong/pets', {onRequest: [verifyJwt]}, CreatePetController)
  app.get('/ong/pets/:id', GetPetController)
  app.get('/ong/pets', SearchPetController)
}