import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: './schema.gql',
      debug: true,
      playground: true,
      context: ({ req }) => ({ req }),
      cors: {
        origin: ['http://127.0.0.1:3000'],
        credentials: true,
      },
    }),
  ],
})
export class GraphqlModule {}
