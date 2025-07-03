import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthRequest } from "src/common/dto/request/auth-request.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt"
import { UserWithoutPassword } from "src/interfaces/user.interface";
import { JwtService } from "@nestjs/jwt";
import { JwtUserInterface } from "src/interfaces/jwt-user.interface";
import { RefreshTokenRequest } from "src/common/dto/request/refresh-token.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ) {

    }
    
    async authenticate(request: AuthRequest) {
        const user = await this.prismaService.user.findUnique({
            where: { email: request.email },
            include: { roles: { include: { role: true } } }
        });

        if (!user || !(await bcrypt.compare(request.password, user.password))) {
            throw new UnauthorizedException('Email or password is incorrect');
        }

        const payload = {
            sub: user.id,
            email: user.email,
            roles: user.roles.map(r => r.role.name),
        }

        const tokens = await this.generateTokens(payload);
        await this.updateRefreshToken(user.id, tokens.refreshToken);

        return tokens
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

    async refreshAccessToken(refreshTokenRequest: RefreshTokenRequest) {
        try {
            const payload: JwtUserInterface = await this.jwtService.verifyAsync<JwtUserInterface>(refreshTokenRequest.refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            const user = await this.prismaService.user.findUnique({
                where: { id: payload.sub }
            });

            console.log(user)

            if (!user || !user.refreshToken) {
                throw new UnauthorizedException('Invalid credentials');
            }

            const isMatch = await bcrypt.compare(refreshTokenRequest.refreshToken, user.refreshToken);
            if (!isMatch) {
                throw new UnauthorizedException('Refresh token mismatch');
            }

            const newTokens = await this.generateTokens({
                sub: user.id,
                email: user.email,
                roles: payload.roles,
            });

            await this.updateRefreshToken(user.id, newTokens.refreshToken);

            return newTokens;
        } catch {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedToken = await bcrypt.hash(refreshToken, 10);
        await this.prismaService.user.update({
            where: { id: userId },
            data: { refreshToken: hashedToken }
        });
    }

    async generateTokens(user: JwtUserInterface) {
        const payload = { sub: user.sub, email: user.email, roles: user.roles };

        const accessToken = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: process.env.JWT_ACCESS_EXPIRATION,
        });

        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: process.env.JWT_REFRESH_EXPIRATION,
        });

        return { accessToken, refreshToken };
    }

}