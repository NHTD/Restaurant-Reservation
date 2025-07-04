import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { RestaurantRequest } from "src/common/dto/request/restaurant-request.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/role.decorator";

@Controller("v1/restaurant")
@UseGuards(JwtAuthGuard, RolesGuard)
export class RestaurantController {

    constructor(private readonly restaurantService: RestaurantService){}

    @Post()
    @Roles('ADMIN')
    create(@Body() request: RestaurantRequest) {
        return this.restaurantService.create(request);
    }

    @Get()
    @Roles('ADMIN', 'USER')
    findAll() {
        return this.restaurantService.findAll();
    }

    @Get(':id')
    @Roles('ADMIN', 'USER')
    findOne(@Param('id') id: string) {
        return this.restaurantService.findOne(id);
    }

    @Patch(':id')
    @Roles('ADMIN')
    update(@Param('id') id: string, @Body() request: RestaurantRequest) {
        return this.restaurantService.update(id, request);
    }

    @Delete(':id')
    @Roles('ADMIN')
    delete(@Param('id') id: string) {
        return this.restaurantService.delete(id);
    }
}