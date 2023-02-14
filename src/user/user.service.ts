import { Injectable, NotFoundException } from '@nestjs/common';
import { RegisterUserInput } from './dto/create-user.input';
import { User } from './user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  create(registerUserInput: RegisterUserInput) {
    const user = new this.userModel(registerUserInput);

    return user.save();
  }

  async findOne(walletAddress: string) {
    const user = await this.userModel.findOne({ walletAddress }).exec();

    if (!user) throw new NotFoundException(`User ${walletAddress} not found`);

    return user;
  }
}
