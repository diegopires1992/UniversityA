import { Module } from '@nestjs/common';
import { StudentModule } from './modules/student/student.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';


@Module({
  imports: [StudentModule],
  controllers: [],
  providers: [{
    provide: APP_PIPE,
    useClass: ZodValidationPipe
  }],
})
export class AppModule { }
