import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthRequest } from "src/common/dto/request/auth-request.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { RolesGuard } from "./roles.guard";
import { Public } from "./public.decorator";
import { RefreshTokenRequest } from "src/common/dto/request/refresh-token.dto";

@Controller("v1/auth")
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuthController {
    constructor(private readonly authService:AuthService) {}

    @Post("/login")
    @Public()
    login(
         @Body() request: AuthRequest
    ) {
        try {
            return this.authService.authenticate(request)
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    @Post('/refresh-token')
    @Public()
    refreshToken(@Body() refreshToken: RefreshTokenRequest) {
        return this.authService.refreshAccessToken(refreshToken);
    }

}