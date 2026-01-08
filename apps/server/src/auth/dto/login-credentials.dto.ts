import { ApiProperty } from '@nestjs/swagger';

export class LoginCredentialsDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email',
  })
  email: string;
  @ApiProperty({ example: 'password123', description: 'Mật khẩu' })
  password: string;
}
