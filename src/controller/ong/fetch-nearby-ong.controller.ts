import { MakeFetchNearbyOngUseCase } from "@/use-case/factories/make-fetch-nearby-ong-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const fetchNearbyBodySchema = z.object({
  latitude: z.coerce.number().refine((value) => {return Math.abs(value) <= 90}),
  longitude: z.coerce.number().refine((value) => {return Math.abs(value) <= 180})
})

export async function FetchNearbyOngController(request: FastifyRequest, reply: FastifyReply) {
  const query = fetchNearbyBodySchema.parse(request.query)

  const fetchNearbyUseCase = MakeFetchNearbyOngUseCase()

  try {
    const { ong } = await fetchNearbyUseCase.execute({
      userLatitude: query.latitude,
      userLongitude: query.longitude
    })

    return reply.status(200).send({ong})
  } catch (error) {
    console.log(error)

    return reply.status(500).send({message: 'Internal server error'})
  }
} 