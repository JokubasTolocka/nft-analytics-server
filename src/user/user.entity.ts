import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { generateNonce } from './utils/generateNonce';

@Schema()
@ObjectType()
export class User {
  @Field(() => String)
  id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field(() => String, { description: 'User walletAddress ' })
  walletAddress: string;

  @Prop({ required: true, default: generateNonce() })
  @Field(() => String, { description: 'User wallet nonce ' })
  nonce: string;

  @Prop({ required: false, default: null })
  @Field({ description: 'User email ', nullable: true })
  email?: string;

  @Prop({ default: [] })
  @Field(() => [String], { description: 'User favorited collections' })
  favoritedCollections: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
