import { Body, Controller, Post } from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { UserService } from './user.service';
import { UserRequest } from 'src/common/dto/request/user-request.dto';

@Controller("v1/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(
    @Body(new ValidationPipe()) request: UserRequest
  ): any {
    try {
      return 1
    } catch (error) {
      console.log("Errors: ", error)
    }
  }
}
