import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequest } from 'src/common/dto/request/user-request.dto';
import { UserUpdateRequest } from 'src/common/dto/request/user-update-request.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller("v1/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(
    @Body(new ValidationPipe()) request: UserRequest
  ): any {
    try {
      return this.userService.create(request)
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body(new ValidationPipe()) data: Partial<UserUpdateRequest>
  ) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
