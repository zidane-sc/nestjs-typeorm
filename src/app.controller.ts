import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.entity';

@Controller({
  version: '1',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<any> {
    // await this.appService.seed();
    // return 'seed complete';

    return this.appService.getEmployeeById(2);

    // return this.appService.deleteEmployee(1);
  }

  @Version('2')
  @Get()
  async getHello2(): Promise<any> {
    // await this.appService.seed();
    // return 'seed complete';

    return this.appService.getEmployeeById(2);

    // return this.appService.deleteEmployee(1);
  }

  @Version(VERSION_NEUTRAL)
  @Get()
  async getHello3(): Promise<any> {
    // await this.appService.seed();
    // return 'seed complete';

    return this.appService.getEmployeeById(2);

    // return this.appService.deleteEmployee(1);
  }
}
