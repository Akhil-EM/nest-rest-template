import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { responseFormatter } from 'src/common/utils/respose-formatter';
import { log } from '../utils/log';

@Catch() // This will catch all exceptions
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception:any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : 500; // Default to 500 for unhandled exceptions

    
    
    if (status === 404) {
      return responseFormatter(
        response,
        status,
        'fail',
        "requested resource not exist"
      );
    }
    
    log('exception', 'error',"============== exception ============");
    console.log(exception);
    log('exception', 'error',"=====================================");
    return responseFormatter(
      response,
      status,
      'error',
     'Internal server error',
      null,
      {
        message: exception.message,
        stack: exception.stack.replace(/\n/g, ""),
      }
    );
  }
}
