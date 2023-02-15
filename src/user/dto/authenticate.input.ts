import { InputType, Field } from '@nestjs/graphql';
import { Length } from 'class-validator';

@InputType()
export class AuthenticateInput {
  @Length(42, 42)
  @Field(() => String, { description: 'walletAddress of the user' })
  walletAddress: string;

  @Length(132, 132)
  @Field(() => String, { description: 'signature of the wallet of the user' })
  signature: string;
}
