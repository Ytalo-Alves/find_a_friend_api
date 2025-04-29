import { verifyJwt } from "@/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { CreatePetController } from "./create-pet.controller";
import { GetPetController } from "./get-pet.controller";
import { SearchPetController } from "./search-pet.controller";

export async function petRoutes(app: FastifyInstance){
  app.post('/ong/pets', 
    {
      onRequest: [verifyJwt],
      schema: {
        summary: 'Cadastrar um novo pet',
        tags: ['Pets'],
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            age: { type: 'string' },
            about: { type: 'string' },
            size: { type: 'string' },
            energy_level: { type: 'string' },
            environment: { type: 'string' },
          },
          required: ['name', 'age', 'about', 'size', 'energy_level', 'environment'],
        },
        response: {
          201: {
            description: 'Pet criado com sucesso',
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              age: { type: 'string' },
              about: { type: 'string' },
              size: { type: 'string' },
              energy_level: { type: 'string' },
              environment: { type: 'string' },
              ong_id: { type: 'string' }
            }
          },
          404: {
            description: 'ONG não encontrada',
            type: 'object',
            properties: {
              message: { type: 'string' }
            }
          },
          500: {
            description: 'Erro interno',
            type: 'object',
            properties: {
              message: { type: 'string' }
            }
          }
        }
      }
    },
    CreatePetController
  )

  app.get('/ong/pets/:id', 
    {
      schema: {
        summary: 'Buscar detalhes de um pet por ID',
        tags: ['Pets'],
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' }
          },
          required: ['id']
        },
        response: {
          200: {
            description: 'Detalhes do pet',
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              age: { type: 'string' },
              about: { type: 'string' },
              size: { type: 'string' },
              energy_level: { type: 'string' },
              environment: { type: 'string' },
              ong_id: { type: 'string' }
            }
          },
          404: {
            description: 'Pet não encontrado',
            type: 'object',
            properties: {
              message: { type: 'string' }
            }
          }
        }
      }
    },
    GetPetController
  )

  app.get('/ong/pets', 
    {
      schema: {
        summary: 'Pesquisar pets',
        tags: ['Pets'],
        querystring: {
          type: 'object',
          properties: {
            city: { type: 'string' },
            age: { type: 'string' },
            size: { type: 'string' },
            energy_level: { type: 'string' },
            environment: { type: 'string' }
          }
        },
        response: {
          200: {
            description: 'Lista de pets',
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                age: { type: 'string' },
                about: { type: 'string' },
                size: { type: 'string' },
                energy_level: { type: 'string' },
                environment: { type: 'string' },
                ong_id: { type: 'string' }
              }
            }
          }
        }
      }
    },
    SearchPetController
  )
}
