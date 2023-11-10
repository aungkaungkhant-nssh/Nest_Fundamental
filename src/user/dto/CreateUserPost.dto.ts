import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserPost{
    @IsNotEmpty()
    @IsString()
    title:string;

    @IsNotEmpty()
    @IsString()
    description:string


}