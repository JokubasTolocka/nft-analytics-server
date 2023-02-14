import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
@ObjectType()
export class User {
  @Field(() => String)
  id: MongooseSchema.Types.ObjectId;
  @Prop({ required: true })
  @Field(() => String, { description: 'User walletAddress ' })
  walletAddress: string;
  @Prop({ required: false })
  @Field(() => String, { description: 'User email ' })
  email: string;
  @Prop()
  @Field(() => [String], { description: 'User favorited collections' })
  favoritedCollections: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
