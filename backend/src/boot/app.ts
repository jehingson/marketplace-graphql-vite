import 'dotenv/config'
// graqhl 
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { AuthenticationError } from "apollo-server-express";

import { typeDefs, resolvers } from '../app/graphql';

import express from 'express';
import bodyParser, { json } from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import * as http from 'http';
import helmet from 'helmet';
import morgan from 'morgan';
import { verify } from 'jsonwebtoken';
import { Jwt } from '../interfaces/jwt.interface';
import { AppDataSource } from './data-source';
// import router from "../api/routes"
import { Status } from '../app/enum/status.enum';


interface MyContext {
  token?: String;
  accessToken?: String;
}

export const initializeApp = async () => {
  const app = express();
  let httpServer = null
  app.use(bodyParser.json());
  app.use(cors());

  app.use(helmet());
  app.use(fileUpload());
  app.use(morgan('dev'));

  // app.use(router())

  const PORT = process.env.PORT || 30001

  app.get('/ping', (_req, res) => {
    console.log('somene pinged here!!')
    res.send('Pong')
  })

  // if (appConfig.https) {
  //   const certName = appConfig.name.toLowerCase().replace(/\s/g, '-');
  //   const key = fs.readFileSync(`/etc/ssl/${certName}.key`);

  //   const cert = fs.readFileSync(`/etc/ssl/${certName}.crt`);
  //   httpServer = https.createServer(
  //     {
  //       key,
  //       cert,
  //     },
  //     app
  //   );
  // } else {
  //   httpServer = http.createServer(app);
  // }

  httpServer = http.createServer(app)

  const startApolloServer = async () => {
    const server = new ApolloServer<MyContext>({
      typeDefs,
      resolvers,
      csrfPrevention: true,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
      ],
      formatError: (err) => {
        // Don't give the specific errors to the client.
        if (err.message.startsWith('Database Error: ')) {
          return new Error('Internal server error');
        }
        // Otherwise return the original error. The error can also
        // be manipulated in other ways, as long as it's returned.
        return err;
      },
    });
    await server.start();
    app.use(
      '/graphql',
      cors<cors.CorsRequest>(),
      json(),
      expressMiddleware(server, {
        context: async ({ req }) => {
          if (!req) throw new AuthenticationError("you must be logged in");
          const Query = req.body.query

          if (req.body.operationName === "IntrospectionQuery" || Query.includes('getAccessToken')) return { };

          const appShortName = (process.env.SHORT_NAME as string).toUpperCase();
          if (Query.includes("register") ||
              Query.includes("login") ||
              Query.includes("googleRegister"))
            {
              const accessToken = req.header(`x-${appShortName}-access-token`)
              try {
                verify(
                  accessToken,
                  process.env.JWT_SECRET
                ) as Jwt;
                return {}
              } catch (error) {
                throw new AuthenticationError("invalid token access");
              }
           }   
           
            try {
              const header = req.header(`x-${appShortName}-auth-token`)
         
              const tokenVerifiedContent = verify(
                header,
                process.env.JWT_SECRET
              ) as Jwt;

              if (!tokenVerifiedContent) throw new AuthenticationError("invalid token auth");

              const model = (await import(
                 `../app/models/${tokenVerifiedContent.modelName}.model`
              ).then(md => Object.values(md)[0])) as any;
      
              const tokenModel = (await import(
                 `../app/models/${tokenVerifiedContent.modelName}-token.model`
              ).then(md => Object.values(md)[0])) as any;
                
              const repository = AppDataSource.getRepository(model);
              const tokenRepository = AppDataSource.getRepository(tokenModel);
                
                
              const token = await tokenRepository.findOne({
                where: {
                  authToken: header,
                  status: Status.Active
                },
              })

              if (!token) throw new AuthenticationError("invalid token auth");

              const account = await repository.findOne({
                where: {
                  id: tokenVerifiedContent.id,
                },
              });

              if (!account)  throw new AuthenticationError("invalid token auth");

              return {
                account
              }
            } catch (error) {
              throw new AuthenticationError("invalid token auth");
            }

            
        },
      }),
    );
    console.log(`apollo server is running at https://sandbox.apollo.dev/?endpoint=http://localhost:${PORT}/graphql`)
  }

  startApolloServer()

  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));

}