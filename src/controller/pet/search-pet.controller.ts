import { MakeSearchPetUseCase } from "@/use-case/factories/make-search-pet-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


const SearchPetBodySchema = z.object({
  city: z.string().min(1),
  age: z.string().optional(),
  size: z.string().optional(),
  energy_level: z.string().optional(),
  environment: z.string().optional()
})

export async function SearchPetController(request: FastifyRequest, reply: FastifyReply) {
  const {city, age, size, energy_level, environment} = SearchPetBodySchema.parse(request.query)

  const searchPetUseCase = MakeSearchPetUseCase()

  try {
    const { pets } = await searchPetUseCase.execute({
      city,
      age,
      size,
      energy_level,
      environment
    })

    return reply.status(200).send({pets})
  } catch (error) {
    console.log(error)

    return reply.status(500).send({message: 'Internal server error'})
  }
}