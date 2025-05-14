import { SetMetadata } from "@nestjs/common";
import { Role } from "../roles.enum";



//This is a custom decorator for setting required roles on a route handler or controller 
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);