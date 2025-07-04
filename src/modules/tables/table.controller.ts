import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { TableService } from "./table.service";
import { TableRequest } from "src/common/dto/request/table-request.dto";
import { Roles } from "../auth/role.decorator";
import { TableFilterRequest } from "src/common/dto/request/table-filter.request";

@Controller("v1/table")
@UseGuards(UseGuards, JwtAuthGuard)
export class TableController{
    constructor(private readonly tableService: TableService){}

    @Post()
    @Roles('ADMIN')
    create(@Body() request: TableRequest) {
        return this.tableService.create(request);
    }

    @Get('/status')
    @Roles('ADMIN')
    getAvailable(@Query()request: TableFilterRequest) {
        return this.tableService.getAvailableTables(request);
    }

    @Get(':id')
    @Roles('ADMIN', 'USER')
    findOne(@Param('id') id: string) {
        return this.tableService.findOne(id);
    }

    @Patch(':id')
    @Roles('ADMIN')
    update(@Param('id') id: string, @Body() request: TableRequest) {
        return this.tableService.update(id, request);
    }

    @Delete(':id')
    @Roles('ADMIN')
    delete(@Param('id') id: string) {
        return this.tableService.delete(id);
    }
}