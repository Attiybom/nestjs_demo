import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as joi from 'joi';

// 环境文件路径
const envFilePath = `.env.${process.env.NODE_ENV || `development`}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })],
      validationSchema: joi.object({
        NODE_ENV: joi
          .string()
          .valid('development', 'production')
          .default('development'),
        DB_PORT: joi.number().default(3306),
        DB_URL: joi.string().domain(),
        DB_HOST: joi.string().ip(),
      }),
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
