import { TaskStatus } from '../task-staus.enum';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
