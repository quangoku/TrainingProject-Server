import { Injectable, Logger, PipeTransform } from '@nestjs/common';

@Injectable()
export class FreezePipe implements PipeTransform {
  private readonly logger = new Logger(FreezePipe.name);
  transform(value: any): any {
    Object.freeze(value);
    this.logger.log('FreezePipe called');
    return value;
  }
}
