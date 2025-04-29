import { OngNotFoundError } from "@/errors/ong-not-found-error";
import { MakeCreatePetUseCase } from "@/use-case/factories/make-create-pet-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const createPetBodySchema = z.object({
  name: z.string(),
  age: z.string(),
  about: z.string(),
  size: z.string(),
  energy_level: z.string(),
  environment: z.string()
})


export async function CreatePetController(request: FastifyRequest, reply: FastifyReply){

  const body = createPetBodySchema.parse(request.body)

  const createPetUseCase = MakeCreatePetUseCase()
  
  const ong_id = request.user.sub

  try {
    const { pet } = await createPetUseCase.execute({...body, ong_id})

    return reply.status(201).send(pet)
  } catch (error) {
    if(error instanceof OngNotFoundError){
      return reply.status(404).send({message: error.message})
    }
    console.log(error)

    return reply.status(500).send({message: 'Internal server error'})
  }
}