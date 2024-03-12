import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import bodyParser from 'body-parser';
import { prismaClient } from '../clients/db';
// to get the data from the server we query the data 
// when we want to send data to the server we use mutation

export async function initServer(){
    const app = express();

    app.use(bodyParser.json());

    
    const graphqlServer = new ApolloServer({
        // typeDefs is a string that contains the schema definition language (SDL) that defines the GraphQL schema.  
        typeDefs:`    
        type Query{
            sayHello: String 
        }

        `,
        resolvers:{
            Query:{
                sayHello:()=>`Hello from GraphQL Server!`
            },
        },
      });

    await graphqlServer.start();
    app.use('/graphql',expressMiddleware(graphqlServer));

    return app;
}