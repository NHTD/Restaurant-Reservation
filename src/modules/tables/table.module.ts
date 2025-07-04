import { Module } from "@nestjs/common";
import { TableController } from "./table.controller";
import { TableService } from "./table.service";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  imports: [],
  controllers: [TableController],
  providers: [TableService, PrismaService],
})
export class TableModule {}
