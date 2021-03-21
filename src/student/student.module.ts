import { CacheModule, Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CustomCacheInterceptor } from '../interceptor/custom.cache.interceptor';

@Module({
  controllers: [StudentController],
  providers: [
    StudentService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CustomCacheInterceptor,
    },
  ],
  imports: [TypeOrmModule.forFeature([Student]), CacheModule.register()],
  exports: [TypeOrmModule],
})
export class StudentModule {}
