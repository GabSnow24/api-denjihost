import { Injectable, Logger } from '@nestjs/common';
import { CreateHostingDto } from './dto/create-hosting.dto';
import { UpdateHostingDto } from './dto/update-hosting.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import * as fs from 'fs';
const util = require('util')
const exec = util.promisify(require('child_process').exec);


@Injectable()
export class HostingService {
  constructor(@InjectQueue('terraform') private queueService: Queue,) { }

  async create(createHostingDto: CreateHostingDto) {
    const { name } = createHostingDto
    //MUDAR NOME DEPOIS E ACRESCENTAR MASCARA NO DTO
    const job = await this.queueService.add("create", {
      name
    })
    return
  }

  findAll() {
    return `This action returns all hosting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hosting`;
  }

  update(id: number, updateHostingDto: UpdateHostingDto) {
    return `This action updates a #${id} hosting`;
  }

  remove(id: number) {
    return `This action removes a #${id} hosting`;
  }
}
