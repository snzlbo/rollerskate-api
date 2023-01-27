import { Express } from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/federation';
import gql from 'graphql-tag';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from '@apollo/server/plugin/landingPage/default';
import {
  ApolloServerPluginInlineTraceDisabled
} from '@apollo/server/plugin/disabled';
import schemas from './schema';
import resolvers from './resolvers';

export default async function initApollo (app: Express) {
  const { types, queries, mutations } = schemas;

  const typeDefs = gql(`#graphql
    ${types}
    extend type Query {
      ${queries}
    }
    extend type Mutation {
      ${mutations}
    }
  `)

  const apolloServer = new ApolloServer({
    schema: buildSubgraphSchema([
      {
        typeDefs,
        resolvers,
      }
    ]),
    introspection: process.env.NODE_ENV !== 'production',
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageLocalDefault({ embed: false }),
      ApolloServerPluginInlineTraceDisabled(),
    ],
  });

  await apolloServer.start();

  app.use(expressMiddleware(apolloServer));
}