import { InvalidCredentialsError } from "@/errors/invalid-credentials-error";
import { verifyJwt } from "@/middlewares/verify-jwt";
import { MakeAuthOngUseCase } from "@/use-case/factories/make-auth-ong-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

const authOngControllerBodySchema = z.object({
  email: z.string(),
  password: z.string()
})

export async function AuthenticateOngController(request: FastifyRequest, reply: FastifyReply) {

  const body = authOngControllerBodySchema.parse(request.body)

  const authOngUseCase = MakeAuthOngUseCase()

  try {
    const { ong } = await authOngUseCase.execute(body)

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: ong.id
        }
      }
    )

    return reply.status(200).send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message})
    }

    throw error
  }
}