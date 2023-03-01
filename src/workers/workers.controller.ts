import { WorkersService } from './workers.service';
import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';

@Injectable()
@Processor('terraform')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) { }

  @Process("create")
  @OnQueueActive()
  create(job: Job) {
    const dataToSend: { name: string } = job.data
    return this.workersService.create(job);
  }

}
