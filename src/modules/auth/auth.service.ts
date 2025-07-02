import { Injectable } from "@nestjs/common";
import { AuthRequest } from "src/common/dto/request/auth-request.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt"
import { UserWithoutPassword } from "src/interfaces/user.interface";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService
    ) {

    }

    authenticate(request: AuthRequest): string {
        console.log(request)

        return ""
    }

    async validateUser(email: string, password: string): Promise<UserWithoutPassword | null> {
        const user = await this.prismaService.user.findUnique({
            where: { email },
            include: {
            roles: true,
            reservations: true
            }
        });

        if (!user) {
            return null
        };

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return null
        }

        const { password: _, ...result } = user
        return result
    }

}