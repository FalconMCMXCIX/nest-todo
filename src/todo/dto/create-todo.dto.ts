import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTodoDto {

  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
