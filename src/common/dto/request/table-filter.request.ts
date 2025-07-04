import { IsOptional, IsEnum, IsString } from 'class-validator';
import { TableStatus } from 'generated/prisma';

export class TableFilterRequest {
  @IsString()
  restaurantId: string;

  @IsOptional()
  @IsEnum(TableStatus, { each: true })
  status?: TableStatus | TableStatus[];
}
