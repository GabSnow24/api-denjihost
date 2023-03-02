import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Job } from 'bull';
import * as fs from 'fs';
const util = require('util')
const exec = util.promisify(require('child_process').exec);


@Injectable()
@Processor('terraform')
export class WorkersService {


  @Process("create")
  @OnQueueActive()
  async create(job: Job) {
    const { name } = job.data
    const fileContent = `
    env = [{ key="API_PORT", value="8080" },{ key="DATABASE_URL", value="${process.env.DATABASE_3XA}" } ]
    project-image="qzzdocker24/3xa"
    cloudrun_name="${name.split(" ").join("").toLocaleLowerCase()}" 
    port=8080
    allow_public_access=true
    max_instances=2
    min_instances=1`
    const tfvarsFileName = "terraform.tfvars"
    const tfvarsFilePath = `./terraform/${tfvarsFileName}`
    fs.writeFileSync(tfvarsFilePath, fileContent)
    const { stdout, stderr } = await exec(`cd ./terraform && terraform apply -var-file="${tfvarsFileName}" `)
    console.log("stdout", stdout)
    console.log("stderr", stderr)
    if (stdout) {
      Logger.log(`STDOUT:${stdout}`)
    }
    else {
      Logger.error(`STDERR:${stderr}`)
      throw new Error(stderr)
    }
    await job.progress(1)
  }
}
