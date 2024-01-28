import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { randomUUID } from "crypto";

type ParamStudent = {
    id: string;
};

type BodyStudent = {
    id: string;
};

@Controller('student')
export class StudentController {
    @Get('/:id')
    helloStudent(@Param() params: ParamStudent) {
        return 'ok studentddasads' + params.id;
    }

    @Get('/all')
    findAllStudent(@Query() queries: any) {
        return 'ok student' + JSON.stringify(queries);
    }
    @Post('/create')
    create(@Body() data: BodyStudent) {
        console.log("data", data);

        return {
            ...data,
            id: randomUUID(),
        };
    }
}