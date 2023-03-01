import { getQueueToken } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { HostingController } from './hosting.controller';
import { HostingModule } from './hosting.module';
import { HostingService } from './hosting.service';

describe('HostingController', () => {
  let controller: HostingController;
  let service: HostingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HostingModule],
    }).overrideProvider(getQueueToken("terraform"))
      .useValue("terraform")
      .compile();
    service = module.get<HostingService>(HostingService);
    controller = module.get<HostingController>(HostingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
