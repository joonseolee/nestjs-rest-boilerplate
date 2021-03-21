import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { School } from '../school/entities/school.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Student } from '../student/entities/student.entity';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get url(): string {
    return this.configService.get<string>('app.db.main.url');
  }

  get port(): number {
    return this.configService.get<number>('app.db.main.port');
  }

  get database(): string {
    return this.configService.get<string>('app.db.main.database');
  }

  get username(): string {
    return this.configService.get<string>('app.db.main.username');
  }

  get password(): string {
    return this.configService.get<string>('app.db.main.password');
  }

  getMainConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.url,
      port: this.port,
      username: this.username,
      password: this.password,
      database: this.database,
      entities: [School, Student],
      synchronize: true,
    };
  }
}
