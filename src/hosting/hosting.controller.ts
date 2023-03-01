import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpStatus } from '@nestjs/common';
import { HostingService } from './hosting.service';
import { CreateHostingDto } from './dto/create-hosting.dto';
import { UpdateHostingDto } from './dto/update-hosting.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetHostingDto } from './dto/get-hosting.dto';

@ApiTags('Hosting')
@Controller('hosting')
export class HostingController {
  constructor(private readonly hostingService: HostingService) { }

  @ApiBody({ type: CreateHostingDto })
  @ApiOperation({ summary: 'Create hosting' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The hosting has been successfully created.', type: CreateHostingDto })
  @Post()
  create(@Body() createHostingDto: CreateHostingDto) {
    return this.hostingService.create(createHostingDto);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The hostings have been listed.',
    type: [GetHostingDto],
  })
  @ApiOperation({ summary: 'Get all queried hosting' })
  @Get()
  findAll() {
    return this.hostingService.findAll();
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The item have been listed.',
    type: GetHostingDto,
  })
  @ApiOperation({ summary: 'Get the queried item' })
  @ApiParam({ name: "id" })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hostingService.findOne(+id);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The item have been update.',
  })
  @ApiOperation({ summary: 'Update the selected item' })
  @ApiParam({ name: "id" })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateHostingDto: UpdateHostingDto) {
    return this.hostingService.update(+id, updateHostingDto);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The item have been deleted.',
  })
  @ApiOperation({ summary: 'Delete the selected item' })
  @ApiParam({ name: "id" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hostingService.remove(+id);
  }
}
