import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getIndex(): string {
    return 'Visit the endpoint /graphql to see the playground';
  }
}
