import { IsNotEmpty, IsString } from "class-validator";

export class CrateUserDto{
    @IsNotEmpty()
    @IsString()
    username:string;

    @IsNotEmpty()
    @IsString()
    password:string
}