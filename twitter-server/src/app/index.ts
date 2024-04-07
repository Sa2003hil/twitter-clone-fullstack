import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
// import { prismaClient } from '../clients/db';
import axios from 'axios'
import { User } from './user'
import { Tweet } from './tweet'
import { GraphqlContext } from '../interfaces'
import JWTService from '../services/jwt'
// to get the data from the server we query the data
// when we want to send data to the server we use mutation

export async function initServer () {
  const app = express()

  app.use(bodyParser.json())
  app.use(cors())

  const graphqlServer = new ApolloServer<GraphqlContext>({
    // typeDefs is a string that contains the schema definition language (SDL) that defines the GraphQL schema.
    typeDefs: `

        ${User.types}
        ${Tweet.types}
        type Query{
            
            ${User.queries}
            ${Tweet.queries}
        }

        type Mutation{
            ${Tweet.mutations}
        }

        `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
        ...Tweet.resolvers.queries
      },
      Mutation: {
        ...Tweet.resolvers.mutations
      },
      ...Tweet.resolvers.extraResolvers,
      ...User.resolvers.extraResolvers
    }
  })

  await graphqlServer.start()
  app.use(
    '/graphql',
    expressMiddleware(graphqlServer, {
      context: async ({ req, res }) => {
        return {
          user: req.headers.authorization
            ? JWTService.decodeToken(
                req.headers.authorization.split('Bearer ')[1]
              )
            : undefined
        }
      }
    })
  )

  return app
}
