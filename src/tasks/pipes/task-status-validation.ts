/* eslint-disable @typescript-eslint/ban-types */
import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { UpdateTaskDto } from '../dto/update-task.dto';

export class TaskStatusValidationPipes implements PipeTransform<any> {
  async transform(
    value: UpdateTaskDto,
    { metatype }: ArgumentMetadata,
  ): Promise<UpdateTaskDto> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    3;
    console.log(object);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
