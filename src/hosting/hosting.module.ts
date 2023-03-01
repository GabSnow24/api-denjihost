import { Module } from '@nestjs/common';
import { HostingService } from './hosting.service';
import { HostingController } from './hosting.controller';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'terraform',
    }),],
  controllers: [HostingController],
  providers: [HostingService]
})
export class HostingModule { }
