import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty() // can't be empty
  @IsString() // must be a string
  username?: string;
  @ApiProperty()
  @IsOptional()
  @IsString() // must be a string
  @MinLength(6) // require min length = 6
  password?: string;
}
