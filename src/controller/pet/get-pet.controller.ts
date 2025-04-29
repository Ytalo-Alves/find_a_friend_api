import { PetNotFoundError } from "@/errors/pet-not-found-error";
import { MakeGetPetUseCase } from "@/use-case/factories/make-get-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const GetPetControllerBodySchema = z.object({
  id: z.string(),
})

export async function GetPetController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = GetPetControllerBodySchema.parse(request.params)

  const getPetUseCase = MakeGetPetUseCase()

  try {
    const { pet } = await getPetUseCase.execute({ id })

    return reply.status(200).send(pet)
  } catch (error) {
    if(error instanceof PetNotFoundError) {
      return reply.status(404).send({message: error.message})
    }

    console.log(error)

    return reply.status(500).send({message: 'Internal server error'})
  }

}