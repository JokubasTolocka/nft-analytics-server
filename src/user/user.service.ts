import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { bufferToHex } from 'ethereumjs-util';
import { JwtService } from '@nestjs/jwt';

import { User } from './user.entity';
import { AuthenticateInput } from './dto/authenticate.input';
import { recoverPersonalSignature } from 'eth-sig-util';
import { generateNonce } from './utils/generateNonce';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async authenticate({ walletAddress, signature }: AuthenticateInput) {
    const user = await this.userModel.findOne({ walletAddress });

    if (!user)
      throw new HttpException(
        'User with this wallet address was not found.',
        403,
      );

    const message = `Nonce for this message: ${user.nonce}`;

    const msgBufferHex = bufferToHex(Buffer.from(message, 'utf8'));
    // recover the address
    const address = recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature,
    });

    // if recovered address doesn't match our address
    if (address.toLowerCase() !== walletAddress.toLowerCase())
      throw new HttpException('Signature failed to verify', 403);

    // generate a new nonce for the user
    const newNonce = generateNonce();

    // save the new nonce to the user
    user.nonce = newNonce;
    user.save();

    // generate JWT token

    const token = this.jwtService.sign({
      payload: {
        id: user.id,
        walletAddress,
      },
    });

    return token;
  }

  async checkIfUserExists(walletAddress: string) {
    try {
      const user = await this.userModel.findOne({ walletAddress });

      if (user) return user;

      const newUser = new this.userModel({ walletAddress });

      await newUser.save();

      return newUser;
    } catch (e) {
      throw new HttpException('User retrieval or creation failed', 400);
    }
  }

  async getMyUser(walletAddress: string) {
    try {
      const myUser = await this.userModel.findOne({ walletAddress });
      return myUser;
    } catch {
      throw new UnauthorizedException(
        'Failed to find a user by that wallet address',
      );
    }
  }
}
