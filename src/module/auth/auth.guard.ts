import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC_KEY } from "./skip-auth.decorator";
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) { }

    /**
     * Get the JWT token from the request header and verify it
     * @param context
     * @returns
     */
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
    //     try {
    //         // @TODO: Uncomment this when core backend service JWT payload is updated to include user roles
    //         const payload = await this.jwtService.verifyAsync(token, {
    //             secret: process.env.JWT_SECRET, //@TODO: Move to env
    //         });
    //         // 💡 We're assigning the payload to the request object here
    //         // so that we can access it in our route handlers
    //         request['user'] = payload;
    //     } catch {
    //         throw new UnauthorizedException('Invalid or Expired Token');
    //     }
        return true;
     }
    /**
   * Get the JWT token from the request header
   * @param request
   * @returns
   */
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? []; //extracts the authorization header from the request(optional) and splits it by a space e.g splits "Bearer <TOKEN>" into ["Bearer", "abc123"] assigning type to bearer and token to abc123"
        return type === 'Bearer' ? token : undefined; //tenary opeator, if type is equal to bearer return token else return undefined
    }
}