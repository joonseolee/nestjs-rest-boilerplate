import { CACHE_MANAGER, CacheModule, Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Cache } from 'cache-manager';
import { SchoolModule } from './school/school.module';
import { StudentModule } from './student/student.module';
import { AppConfigModule } from './conf/configuration.module';
import { AppConfigService } from './conf/configuration.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CustomCacheInterceptor } from './interceptor/custom.cache.interceptor';

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
    CacheModule.register(),
    SchoolModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CustomCacheInterceptor,
    },
  ],
})
export class AppModule {
  constructor(
    private connection: Connection,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
}
