import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TableRequest } from "src/common/dto/request/table-request.dto";
import { TableFilterRequest } from "src/common/dto/request/table-filter.request";

@Injectable()
export class TableService {
    constructor(private prisma: PrismaService) {}

    create(request: TableRequest) {
        return this.prisma.table.create({ data: request });
    }

    getAvailableTables(request: TableFilterRequest) {
        const { restaurantId, status } = request;

        const data: { restaurantId: string; status?: any } = { restaurantId }

        if (status && Array.isArray(status)) {
            data.status = { in: status };
        } else if (status) {
            data.status = status;
        }


        return this.prisma.table.findMany({ where: data });
    }

    findOne(id: string) {
        return this.prisma.table.findUnique({ where: { id } });
    }

    update(id: string, request: TableRequest) {
        return this.prisma.table.update({ where: { id }, data: request });
    }

    delete(id: string) {
        return this.prisma.table.delete({ where: { id } });
    }
}