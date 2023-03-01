import { ConflictException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import { passwordHasher } from '../utils/encrypt.utils'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'


const userInfoToReturn = {
  id: true,
  username: true,
  cellphone: true,
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }


  async create(data: CreateUserDto) {
    try {
      const { cellphone, username, password, email } = data
      const foundUser = await this.prisma.user.findFirst({
        where: {
          cellphone,
          username,
          // email
        }
      })

      if (foundUser) {
        Logger.error('User already created', '', 'UserService', true)
        throw new ConflictException('User already created')
      }

      const { hash } = await passwordHasher(password)
      data = { ...data, password: hash }

      const user = await this.prisma.user.create({
        data,
        select: {
          cellphone: true,
          username: true
        }
      })

      return user
    } catch (error) {
      Logger.error(error)
      throw new Error(error)
    }
  }

  findAll() {
    return this.prisma.user.findMany({
      select: userInfoToReturn
    })
  }

  async findOne(id: string) {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        id
      },
      select: userInfoToReturn
    })
    if (!foundUser) {
      Logger.error('User not found', '', 'UserService', true)
      throw new NotFoundException('User not found')
    }
    return foundUser
  }

  async findByUserName(username: string) {
    const foundUser = await this.prisma.user.findFirst({
      where: {
        username
      }
    })
    if (!foundUser) {
      Logger.error('User not found', '', 'UserService', true)
      throw new NotFoundException('User not found')
    }
    return foundUser
  }

  async update(id: string, data: UpdateUserDto) {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        id
      }
    })
    if (!foundUser) {
      Logger.error('User not found', '', 'UserService', true)
      throw new NotFoundException('User not found')
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        id
      },
      data,
      select: userInfoToReturn
    })

    return updatedUser
  }

  async remove(id: string) {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        id
      }
    })
    if (!foundUser) {
      Logger.error('User not found', '', 'UserService', true)
      throw new NotFoundException('User not found')
    }
    await this.prisma.user.delete({
      where: {
        id
      }
    })
  }
}
