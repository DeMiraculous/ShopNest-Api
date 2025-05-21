import { Transform } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";

/**
 * Enum for sort order
 */
enum  SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}
/**
 * DTO for pagination
 */
export class PaginationDto {
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  per_page?: number = 25;

  @IsInt()
  @Transform(({ value }) => parseInt(value))
  page?: number = 1;

  @IsString()
  @IsOptional()
  sortBy?: string = 'created_at';

  @IsEnum(SortOrder)
  @IsOptional()
  sortOrder?: SortOrder = SortOrder.DESC;
}

/**
 * The PageInfo type is used to represent pagination data
 */
export type PageInfo = {
  total: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
};
/**
 * The PaginatedRecordsDto type is used to represent paginated records
 */
export class PaginatedRecordsDto<T> {
  data: Array<T>;
  pageInfo: PageInfo;
}