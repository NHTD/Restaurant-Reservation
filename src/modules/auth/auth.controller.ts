import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthRequest } from "src/common/dto/request/auth-request.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller("v1/auth")
export class AuthController {
    constructor(private readonly authService:AuthService) {}

    @UseGuards(AuthGuard("local"))
    @Post("/login")
    login(
         @Body() request: AuthRequest
    ) {
        try {
            return this.authService.authenticate(request)
        } catch (error) {
            console.log("Error: ", error)
        }
    }
}