import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput {
  @Field(() => String, { description: 'walletAddress of the user' })
  walletAddress: string;

  @Field(() => String, { description: 'email of the user', nullable: true })
  email?: string;
}
