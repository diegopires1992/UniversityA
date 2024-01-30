import { CreateStudentUseCase } from './useCases/create-student.usecase';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes } from "@nestjs/common";
import { CreateStudentSchemaDTO } from './schemas/create-user.schema';
import { IStudentRepository } from './repositories/student.repository';
import { FilterTermDTO } from './useCases/dto/student.dto';

@Controller('student')
export class StudentController {

    constructor(private readonly createStudentUseCase: CreateStudentUseCase, private readonly studentRepository: IStudentRepository) { }


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

    @Get(':id')
    async getStudentById(@Param('id') id: string) {
        const result = await this.studentRepository.findById(id);
        return result;
    }

    @Post('')
    async create(@Body() data: any) {
        return await this.createStudentUseCase.execute(data);
    }
    @Patch(':id')
    async updateStudentById(@Param('id') id: string, @Body() data: Partial<CreateStudentSchemaDTO>) {
        const result = await this.studentRepository.updateById(id, data);
        return result;
    }

    @Delete(':id')
    async deleteStudentById(@Param('id') id: string) {
        const result = await this.studentRepository.deleteById(id);
        return result;
    }
}