import { IsString, IsInt, Min } from 'class-validator';

export class CreateCartDto {
  @IsString()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;
}
