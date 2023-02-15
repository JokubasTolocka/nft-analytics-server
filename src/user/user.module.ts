import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.entity';
import { JwtModule } from '@nestjs/jwt';

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
      signOptions: { expiresIn: '120s' },
    }),
  ],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
