import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './typeDefs.js';
import resolvers from './resolvers.js';
import mongoose, { Mongoose, mongo } from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'

async function initServer () {
  const app = express();
  app.use(cors());
  dotenv.config();
  const apolloServer = new ApolloServer({typeDefs, resolvers})
  await apolloServer.start();
  apolloServer.applyMiddleware({ app })
  app.use((req, res) => {
    res.send('server started successfully')
  })

  const PORT = 5000;
  try {
    await mongoose.connect(process.env.mongodb);
    console.log(`connected to mongodb with port ${PORT}`)

  } catch (err) {
    console.log('mongo connection error -', err)
  }
  app.listen(PORT,() => {
    console.log(`server is listing on port ${PORT}`)
  })
}
initServer();