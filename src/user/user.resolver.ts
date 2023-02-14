import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './user.service';
import { User } from './user.entity';
import { RegisterUserInput } from './dto/create-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  register(@Args('registerInput') registerInput: RegisterUserInput) {
    return this.usersService.create(registerInput);
  }

  @Query(() => User, { name: 'user' })
  login(@Args('walletAddress', { type: () => String }) walletAddress: string) {
    return this.usersService.findOne(walletAddress);
  }
}
