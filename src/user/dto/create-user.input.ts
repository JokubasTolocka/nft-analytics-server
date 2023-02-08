import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'walletAddress of the user' })
  walletAddress: string;
  @Field(() => String, { description: 'email of the user' })
  @IsOptional()
  email?: string;
}
