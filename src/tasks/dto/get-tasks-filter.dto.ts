import { TaskStatus } from '../task-staus.enum';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetTasksFilterDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
