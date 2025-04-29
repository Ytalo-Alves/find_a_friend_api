import { OngAlreadyExistsError } from "@/errors/already-exists-error";
import { MakeCreateOngUseCase } from "@/use-case/factories/make-create-ong-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


const createOngBodySchema = z.object({
  name: z.string(),
  author_name: z.string(),
  email: z.string(),
  whatsApp: z.string(),
  password: z.string(),
  cep: z.string(),
  state: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  street: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

export async function createOngController (request: FastifyRequest, reply: FastifyReply) {
  const body = createOngBodySchema.parse(request.body)

  const createOngUseCase = MakeCreateOngUseCase()

  try {
    const {ong} = await createOngUseCase.execute(body)

    return reply.status(201).send(ong)
  } catch (error) {
    if(error instanceof OngAlreadyExistsError) {
      return reply.status(400).send({ message: error.message})
    }
  }
}