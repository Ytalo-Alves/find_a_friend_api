import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { petRoutes } from "./controller/pet/pet.routes";
import { ongRoutes } from "./controller/ong/ong.routes";
import swagger from '@fastify/swagger'
import SwaggerUi from "@fastify/swagger-ui";

export const app = fastify()

app.register(swagger, {
  swagger: {
    info: {
      title: 'Find a Friend Api',
      description: 'API created for a pet adoption system',
      version: '1.0.0'
    },
    host: 'localhost:3333',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  }
})

app.register(SwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false
  }
})

app.register(fastifyJwt, {
  secret: env.JWT_TOKEN,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '1d'
  }
})

app.register(fastifyCookie)

app.register(petRoutes)
app.register(ongRoutes)

app.setErrorHandler((error, _request, reply) => {
  if(error instanceof ZodError) {
    return reply.status(400).send({message:'Validation error', errors: error.format()})
  }

  if(env.NODE_ENV != 'prod') {
    console.error(error)
  }

  return reply.status(500).send({message: 'Internal server error'})
})