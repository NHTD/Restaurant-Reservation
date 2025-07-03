import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequest } from 'src/common/dto/request/user-request.dto';
import { UserUpdateRequest } from 'src/common/dto/request/user-update-request.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/role.decorator';
import { Public } from '../auth/public.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller("v1/user")
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
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
  @Roles('USER')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Roles('USER')
  update(
    @Param('id') id: string, 
    @Body(new ValidationPipe()) data: Partial<UserUpdateRequest>
  ) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
