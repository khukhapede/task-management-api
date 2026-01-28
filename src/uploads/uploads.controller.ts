import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request,
  BadRequestException,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../config/multer.config';
import { UploadsService } from './uploads.service';
import { UsersService } from '../users/users.service';
import { TasksService } from 'src/tasks/tasks.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { Response } from 'express';
import { join } from 'path';

@Controller('uploads')
@UseGuards(JwtAuthGuard)
export class UploadsController {
  constructor(
    private readonly uploadsService: UploadsService,
    private readonly usersService: UsersService,
    private readonly tasksService: TasksService,
  ) {}

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar', multerConfig))
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Save filename to database
    await this.usersService.updateAvatar(req.user.id, file.filename);

    return {
      message: 'Avatar uploaded successfully',
      filename: file.filename,
      url: `/uploads/avatars/${file.filename}`,
    };
  }

  @Post('attachment/:taskId')
  @UseInterceptors(FileInterceptor('attachment', multerConfig))
  async uploadAttachment(
    @UploadedFile() file: Express.Multer.File,
    @Param('taskId') taskId: string,
    @Request() req,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Save filename to database
    await this.tasksService.updateAttachment(
      taskId,
      req.user.id,
      file.filename,
    );

    return {
      message: 'Attachment uploaded successfully',
      filename: file.filename,
      url: `/uploads/attachments/${file.filename}`,
    };
  }

  @Get(':folder/:filename')
  async serveFile(
    @Param('folder') folder: string,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    const filePath = join(process.cwd(), 'uploads', folder, filename);
    return res.sendFile(filePath);
  }
}
