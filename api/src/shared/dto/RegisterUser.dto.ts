import { IsArray, IsNotEmpty ,IsStrongPassword} from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    STE:String
    @IsNotEmpty()
    Manager:string
    @IsNotEmpty()
    NUM:String
    @IsNotEmpty()
    ICE:String
    @IsArray()
    Coords:[number,number]
    @IsStrongPassword()
    Password:string
}