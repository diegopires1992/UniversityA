import { CreateStudentUseCase } from './useCases/create-student.usecase';
import { Body, Controller, Get, Post, Query, UsePipes } from "@nestjs/common";
import { CreateStudentSchemaDTO } from './schemas/create-user.schema';
import { IStudentRepository } from './repositories/student.repository';
import { FilterTermDTO } from './useCases/dto/student.dto';

@Controller('student')
// @UsePipes(new CreateStudenValidationPipe())
export class StudentController {

    constructor(private readonly createStudentUseCase: CreateStudentUseCase, private readonly studentRepository: IStudentRepository) { }

    @Post('')
    async create(@Body() data: CreateStudentSchemaDTO) {
        return await this.createStudentUseCase.execute(data);
    }

    @Get('/all')
    async getAllStudents(
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: string = "10"
    ) {
        const offset = (page - 1) * parseInt(pageSize);
        const result = await this.studentRepository.findAllWithPagination(offset, parseInt(pageSize));

        return result;
    }

    @Get('/search')
    async searchStudents(
        @Query('term') term: string,
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: string = "10"
    ) {
        const filters: FilterTermDTO = { term };

        const offset = (page - 1) * parseInt(pageSize);
        const result = await this.studentRepository.findByFiltersWithPagination(filters, offset, parseInt(pageSize));

        return result;
    }
}