import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './user.service';
import { User } from './user.entity';
import { AuthenticateInput } from './dto/authenticate.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  checkIfUserExists(
    @Args('walletAddress', { type: () => String }) walletAddress: string,
  ) {
    return this.usersService.checkIfUserExists(walletAddress);
  }

  @Mutation(() => String)
  authenticate(
    @Args('authenticateInput') authenticateInput: AuthenticateInput,
  ) {
    return this.usersService.authenticate(authenticateInput);
  }

  @Query(() => User)
  myUser(@Args('walletAddress', { type: () => String }) walletAddress: string) {
    return this.usersService.getMyUser(walletAddress);
  }
}
