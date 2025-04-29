import type { FastifyInstance } from "fastify";
import { createOngController } from "./create-ong.controller";
import { AuthenticateOngController } from "./authenticate-ong.controller";
import { FetchNearbyOngController } from "./fetch-nearby-ong.controller";

export async function ongRoutes(app: FastifyInstance) {
  app.post('/ongs', {
    schema: {
      summary: 'Criar uma nova ONG',
      tags: ['Ongs'],
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          password: { type: 'string' },
          address: { type: 'string' },
          latitude: { type: 'number' },
          longitude: { type: 'number' },
        },
        required: ['name', 'email', 'password', 'address', 'latitude', 'longitude'],
      },
      response: {
        201: {
          description: 'ONG criada com sucesso',
          type: 'object',
          properties: {
            ong: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' },
              }
            }
          }
        }
      }
    }
  }, createOngController)

  app.post('/authenticate/ongs', {
    schema: {
      summary: 'Autenticar ONG',
      tags: ['Ongs'],
      body: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          password: { type: 'string' },
        },
        required: ['email', 'password'],
      },
      response: {
        200: {
          description: 'Autenticação realizada com sucesso',
          type: 'object',
          properties: {
            token: { type: 'string' },
          }
        }
      }
    }
  }, AuthenticateOngController)

  app.get('/ongs/nearby', {
    schema: {
      summary: 'Buscar ONGs próximas',
      tags: ['Ongs'],
      querystring: {
        type: 'object',
        properties: {
          latitude: { type: 'number' },
          longitude: { type: 'number' },
        },
        required: ['latitude', 'longitude'],
      },
      response: {
        200: {
          description: 'Lista de ONGs próximas',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              address: { type: 'string' },
            }
          }
        }
      }
    }
  }, FetchNearbyOngController)
}
