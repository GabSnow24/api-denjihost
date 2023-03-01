import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { PrismaService } from '../prisma/prisma.service'
import { JwtStrategy } from '../auth/jwt.strategy'
import { PromService } from '@digikare/nestjs-prom'
import { APP_GUARD } from '@nestjs/core'

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtStrategy, PromService]
})
export class UserModule { }
