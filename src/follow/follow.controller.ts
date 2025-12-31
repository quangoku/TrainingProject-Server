import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post('/:userId')
  @UseGuards(JwtAuthGuard)
  toggle(@Param('userId', ParseIntPipe) userId: number, @Req() req) {
    return req.user;
  }
}
