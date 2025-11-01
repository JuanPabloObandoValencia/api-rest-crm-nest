import { IsNotEmpty, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsInt()
    @IsNotEmpty()
    statusId: number;

    @IsInt()
    @IsNotEmpty()
    priorityId: number;

    @IsInt()
    @IsNotEmpty()
    projectId: number;

    @IsInt()
    @IsNotEmpty()
    assignedTo: number;

    @IsString()
    @IsOptional()
    dueDate?: string;
}
