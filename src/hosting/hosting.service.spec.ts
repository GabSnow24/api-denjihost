import { getQueueToken } from '@nestjs/bull';
import { Test, TestingModule } from '@nestjs/testing';
import { HostingModule } from './hosting.module';
import { HostingService } from './hosting.service';

describe('HostingService', () => {
  let service: HostingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HostingModule],
    }).overrideProvider(getQueueToken("terraform"))
      .useValue("terraform")
      .compile();

    service = module.get<HostingService>(HostingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
