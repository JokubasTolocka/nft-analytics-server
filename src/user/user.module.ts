import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { GqlAuthGuard } from './guards/auth.guard';
import { AuthService } from './guards/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [UsersResolver, UsersService, GqlAuthGuard, AuthService],
})
export class UsersModule {}
