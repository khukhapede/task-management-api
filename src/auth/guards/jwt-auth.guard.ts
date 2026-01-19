import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    // Custom error messages based on different scenarios
    if (err || !user) {
      if (info?.name === 'TokenExpiredError') {
        throw new UnauthorizedException(
          'Your session has expired. Please login again.',
        );
      }
      if (info?.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token. Please login again.');
      }
      if (info?.message === 'No auth token') {
        throw new UnauthorizedException('Please provide authentication token.');
      }

      // Default unauthorized message
      throw new UnauthorizedException('Please login to access this resource.');
    }

    return user;
  }
}
