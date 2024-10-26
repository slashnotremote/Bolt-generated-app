import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';

const prisma = new PrismaClient();
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server, {
    context: async () => ({
      prisma,
    }),
  }),
);

const PORT = process.env.PORT || 4000;

await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);

// Cleanup on shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});