import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RestaurantRequest } from "src/common/dto/request/restaurant-request.dto";

@Injectable()
export class RestaurantService {
    
    constructor(private readonly prisma: PrismaService) {}

    create(request: RestaurantRequest) {
        return this.prisma.restaurant.create({ data: request });
    }

    findAll() {
        return this.prisma.restaurant.findMany();
    }

    findOne(id: string) {
        return this.prisma.restaurant.findUnique({ where: { id } });
    }

    update(id: string, request: RestaurantRequest) {
        return this.prisma.restaurant.update({ where: { id }, data: request });
    }

    delete(id: string) {
        return this.prisma.restaurant.delete({ where: { id } });
    }
    
}