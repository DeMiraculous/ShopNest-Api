import {
    BadRequestException,
    CallHandler,
    ExecutionContext,
    HttpException,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import * as Sentry from '@sentry/core';
import { Scope } from '@sentry/node';
import { Request } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Nest.js interceptor which helps in sending all application exceptions to a centralized error logging service.
 */
@Injectable()
export class ErrorLoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((exception) => {
                console.log(exception);
                const request: Request = context.switchToHttp().getRequest();

                // RETHROW EXCEPTION
                return throwError(
                    () => {
                        if (exception instanceof BadRequestException) {
                            return new HttpException(
                                {
                                    statusCode: exception?.getStatus(),
                                    message: 'Bad Request Exception',
                                    validationErrors:
                                        (exception.getResponse() as any)?.message ||
                                        'Invalid request data provided',
                                    timestamp: new Date().toISOString(),
                                    route: request.path,
                                    method: request.method,
                                },
                                exception?.getStatus(),
                            );
                        } else {
                            let message =
                                exception?.message ||
                                exception?.detail ||
                                'Something went wrong';

                            if (!exception.status || exception.status === 500) {
                                message = 'Something went wrong';

                                if (process.env.NODE_ENV === 'development') {
                                    console.log(exception);
                                }

                                // CAPTURE ERROR IN SENTRY
                                Sentry.captureException(exception, (scope) => {
                                    scope.setExtra('request', {
                                        url: request.url,
                                        body: JSON.stringify(request.body),
                                        headers: request.headers,
                                    });
                                    return scope;
                                });
                            }

                            return new HttpException(
                                {
                                    statusCode: exception?.status,
                                    message,
                                    timestamp: new Date().toISOString(),
                                    route: request.path,
                                    method: request.method,
                                },
                                exception?.status || 500,
                            );
                        }
                    },

                    // exception,
                );
            }), // RETHROW EXCEPTION
        );
    }
}
