import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './user.service';
import { User } from './user.entity';
import { AuthenticateInput } from './dto/authenticate.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/auth.guard';
import { Cookies } from 'src/decorators/cookies.decorators';

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

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  myUser(@Cookies('JWT_AUTH') authToken: string) {
    return this.usersService.getMyUser(authToken);
  }
}
