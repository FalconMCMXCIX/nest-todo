import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTodoDto {


  id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
