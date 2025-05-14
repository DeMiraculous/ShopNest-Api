import { IsEnum } from "class-validator";
import { Role } from "src/module/auth/roles.enum";

export class PromoteUserDto {
  @IsEnum(Role)
  role: Role;
}