import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { TableStatus } from "generated/prisma";

export class TableRequest {
    @IsString()
    restaurantId: string;

    @IsString()
    name: string;

    @IsInt()
    capacity: number;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsEnum(TableStatus)
    status?: TableStatus;
}