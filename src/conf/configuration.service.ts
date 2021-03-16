import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { School } from '../school/entities/school.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get masterUrl(): string {
    return this.configService.get<string>('app.db.main.master.url');
  }

  get slaveUrl(): string {
    return this.configService.get<string>('app.db.main.slave.url');
  }

  get masterPort(): number {
    return this.configService.get<number>('app.db.main.master.port');
  }

  get slavePort(): number {
    return this.configService.get<number>('app.db.main.slave.port');
  }

  get masterDatabase(): string {
    return this.configService.get<string>('app.db.main.master.database');
  }

  get slaveDatabase(): string {
    return this.configService.get<string>('app.db.main.slave.database');
  }

  get masterUsername(): string {
    return this.configService.get<string>('app.db.main.master.username');
  }

  get slaveUsername(): string {
    return this.configService.get<string>('app.db.main.slave.username');
  }

  get masterPassword(): string {
    return this.configService.get<string>('app.db.main.master.password');
  }

  get slavePassword(): string {
    return this.configService.get<string>('app.db.main.slave.password');
  }

  getMainConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      replication: {
        master: {
          host: this.masterUrl,
          port: this.masterPort,
          username: this.masterUsername,
          password: this.masterPassword,
          database: this.masterDatabase,
        },
        slaves: [
          {
            host: this.slaveUrl,
            port: this.slavePort,
            username: this.slaveUsername,
            password: this.slavePassword,
            database: this.slaveDatabase,
          },
        ],
      },
      entities: [School],
    };
  }
}
