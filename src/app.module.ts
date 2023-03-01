import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { HostingModule } from './hosting/hosting.module';
import { UserModule } from './user/user.module';
import { WorkersModule } from './workers/workers.module';


@Module({
  imports: [ConfigModule.forRoot(), HostingModule, WorkersModule, UserModule, AuthModule,
  BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
    },
  }),
  ],
})
export class AppModule { }
