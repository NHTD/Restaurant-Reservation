import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ReservationRequest } from "src/common/dto/request/reservation-request.dto";

@Injectable()
export class ReservationService {
    constructor(private readonly prisma: PrismaService) {}

    create(request: ReservationRequest) {
        return this.prisma.reservation.create({ data: request });
    }

    update(id: string, request: ReservationRequest) {
        return this.prisma.reservation.update({ where: { id }, data: request });
    }

    delete(id: string) {
        return this.prisma.reservation.delete({ where: { id } });
    }

    checkAvailability(request: ReservationRequest) {
        const { tableId, userId, restaurantId } = request;
        return this.prisma.reservation.findFirst({
            where: {
                tableId,
                userId,
                restaurantId
            },
        });
    }

    getUserHistory(userId: string) {
        return this.prisma.reservation.findMany({
            where: { userId },
            include: { table: true, restaurant: true },
        });
    }

}