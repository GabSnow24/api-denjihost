import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, HttpStatus } from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from 'src/User/dto/create-User.dto'
import { GetUserDto } from 'src/user/dto/get-user.dto'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The user has been successfully created.', type: CreateUserDto })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The users have been listed.',
    type: [GetUserDto],
  })
  @ApiOperation({ summary: 'Get all queried users' })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user have been listed.',
    type: GetUserDto,
  })
  @ApiOperation({ summary: 'Get the queried user' })
  @ApiParam({ name: "id" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }


  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The user have been update.',
  })
  @ApiOperation({ summary: 'Update the selected user' })
  @ApiParam({ name: "id" })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The user have been deleted.',
  })
  @ApiOperation({ summary: 'Delete the selected user' })
  @ApiParam({ name: "id" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id)
  }

}
