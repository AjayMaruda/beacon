import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log } from 'src/models/log.schema';

@Injectable()
export class LogsService {
  constructor(@InjectModel(Log.name) private readonly logModel: Model<Log>) {}

  async create(data: Partial<Log>): Promise<Log> {
    const log = new this.logModel(data);
    return log.save();
  }

  async findAll(filter: any): Promise<Log[]> {
    const query: any = {};
    if (filter.serviceName) query.serviceName = filter.serviceName;
    if (filter.level) query.level = filter.level;

    return this.logModel.find(query).sort({ timestamp: -1 }).limit(100).exec();
  }
}
