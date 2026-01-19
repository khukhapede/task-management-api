import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const currentUser = req.user;
    if (currentUser.id !== id && currentUser.role !== 'admin') {
      throw new ForbiddenException('You can only delete your own account');
    }
    console.log(currentUser);
    return this.usersService.remove(id);
  }

  @Get('admin/all-with-passwords')
  @UseGuards(RolesGuard)
  @Roles('admin')
  adminGetAllUsers() {
    return this.usersService.findAll();
  }
}
