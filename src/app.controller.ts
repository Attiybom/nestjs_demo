import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test')
  getTest(): any {
    return {
      code: 0,
      msg: '请求成功',
      data: {
        id: 101,
        username: 'coder',
      },
    };
  }
}
