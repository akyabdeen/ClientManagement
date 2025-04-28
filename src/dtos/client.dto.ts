import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateClientDTO {
    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsString()
    public phone: string;

    @IsNotEmpty()
    @IsString()
    public email: string;

    @IsNotEmpty()
    @IsInt()
    @IsIn([999, 998])
    public deal_type: number;

    @IsOptional()
    @IsString()
    public notes: string;
    
    @IsNotEmpty()
    @IsInt()
    public status: number;
}

export class UpdateClientDTO {
    @IsOptional()
    @IsString()
    public name: string;

    @IsOptional()
    @IsString()
    public phone: string;

    @IsOptional()
    @IsString()
    public email: string;

    @IsOptional()
    @IsInt()
    @IsIn([999, 998])
    public deal_type: number;

    @IsOptional()
    @IsString()
    public notes: string;
    
    @IsOptional()
    @IsInt()
    public status: number;
}