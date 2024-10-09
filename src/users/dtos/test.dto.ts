import { Expose } from 'class-transformer';

export class TestDto {
  @Expose()
  id: number;
  @Expose()
  email: string;
  @Expose()
  password: string;
}
