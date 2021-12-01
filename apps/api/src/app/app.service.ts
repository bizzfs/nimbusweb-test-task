import { Injectable } from '@nestjs/common';
import { Message } from '@nimbusweb-test-task/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
