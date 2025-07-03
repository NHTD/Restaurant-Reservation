import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRequest } from 'src/common/dto/request/user-request.dto';
import { UserUpdateRequest } from 'src/common/dto/request/user-update-request.dto';
import { ApiResponse } from 'src/common/dto/response/api-response';
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: UserRequest) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return ApiResponse.error(null, "Email has existed");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const userRole = await this.prisma.role.findUnique({
      where: { name: 'USER' },
    });

    if (!userRole) {
      return ApiResponse.error(null, 'Default role "user" not found');
    }

    const response = await this.prisma.user.create({ 
      data: { 
        ...data, 
        password: hashedPassword,
        roles: {
          create: [{
            role: {
              connect: {id: userRole.id}
            }
          }]
        },
      },
      include: {
        roles: {
          include: { role: true }
        }
      },
    });

    return ApiResponse.ok(response, "Register successfully");
  }

  async findAll() {
    const response = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        age: true,
        address: true,
      }
    });

    return ApiResponse.ok(response)
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        age: true,
        address: true,
      }
    });
    if (!user) {
      return ApiResponse.error(null, "User not found");
    }
    return ApiResponse.ok(user, "Get user successully");
  }

  async update(id: string, data: Partial<UserUpdateRequest>) {
    if (data.email) {
      const existedUser = await this.prisma.user.findFirst({
        where: {
          email: data.email,
          NOT: {
            id, 
          },
        },
      });

      if (existedUser) {
        return ApiResponse.error(null, "Email has existed", HttpStatus.CONFLICT);
      }
    }

    const response = await this.prisma.user.update({
      where: { id },
      data,
    });

    return ApiResponse.ok(response, "Update successfully");
  }


  async remove(id: string) {
    await this.prisma.user.delete({ where: { id } })

    return ApiResponse.ok("Delete successfully")
  }
}
