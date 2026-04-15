import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LogsService } from './logs.service';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('logs')
@Controller('logs')
export class LogsController {
  constructor(private readonly logService: LogsService) {}

  @Post('addLog')
  @ApiOperation({ summary: 'Ingest a new log entry' })
  @ApiBody({
    schema: {
      example: {
        serviceName: 'auth-service',
        level: 'error',
        messsage: 'Failed to verify JWT token',
      },
    },
  })
  create(@Body() body: any) {
    return this.logService.create(body);
  }

  @Get('listOfLogs')
  @ApiOperation({ summary: 'Quary logs with optional filters' })
  @ApiQuery({
    name: 'serviceName',
    required: false,
    example: 'auth-service',
  })
  @ApiQuery({
    name: 'level',
    required: false,
    enum: ['info', 'warn', 'error', 'debug'],
  })
  @ApiResponse({
    status: 200,
    description: 'List of logs',
  })
  findAll(@Query() query: any) {
    return this.logService.findAll(query);
  }
}
