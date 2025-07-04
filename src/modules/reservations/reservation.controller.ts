import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ReservationService } from "./reservation.service";
import { ReservationRequest } from "src/common/dto/request/reservation-request.dto";
import { Roles } from "../auth/role.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";

@Controller("v1/reservation")
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}

    @Post()
    @Roles('ADMIN', 'USER')
    create(@Body() request: ReservationRequest) {
        return this.reservationService.create(request);
    }

    @Patch(':id')
    @Roles('ADMIN', 'USER')
    update(@Param('id') id: string, @Body() request: ReservationRequest) {
        return this.reservationService.update(id, request);
    }

    @Delete(':id')
    @Roles('ADMIN', 'USER')
    delete(@Param('id') id: string) {
        return this.reservationService.delete(id);
    }
    
    @Get('/check')
    @Roles('ADMIN', 'USER')
    checkAvailability(@Query() request: ReservationRequest) {
        return this.reservationService.checkAvailability(request);
    }

    @Get('/history/:userId')
    @Roles('ADMIN')
    getHistory(@Param('userId') userId: string) {
        return this.reservationService.getUserHistory(userId);
    }
}