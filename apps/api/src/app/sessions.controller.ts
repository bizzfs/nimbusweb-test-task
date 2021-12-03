import { Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './services/app.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createSession(): Promise<string> {
    return this.appService.createSession().then(({ id }) => {
      if (id == null) {
        throw new HttpException(
          { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'sid is missing after session create' },
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
      return id;
    });
  }
}
