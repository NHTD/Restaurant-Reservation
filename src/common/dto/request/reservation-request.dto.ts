import { IsString, IsInt, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { ReservationStatus } from 'generated/prisma';

export class ReservationRequest {
  @IsString()
  userId: string;

  @IsString()
  restaurantId: string;

  @IsOptional()
  @IsString()
  tableId?: string;

  @IsInt()
  numberOfPeople: number;

  @IsDateString()
  time: Date;

  @IsOptional()
  @IsEnum(ReservationStatus)
  status?: ReservationStatus;

  @IsOptional()
  @IsString()
  note?: string;
}