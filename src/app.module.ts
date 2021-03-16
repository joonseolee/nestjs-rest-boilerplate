import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { SchoolModule } from './school/school.module';
import { School } from './school/entities/school.entity';
import { StudentModule } from './student/student.module';
import { AppConfigModule } from './conf/configuration.module';
import { AppConfigService } from './conf/configuration.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => {
        return configService.getMainConfig();
      },
    }),
    AppConfigModule,
    SchoolModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
