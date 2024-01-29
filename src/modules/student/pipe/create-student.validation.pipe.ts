import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { CreateStudenDTO } from "../useCases/dto/student.dto";

@Injectable()
export class CreateStudenValidationPipe implements PipeTransform {
    transform(value: CreateStudenDTO, metadata: ArgumentMetadata) {
        return value
    }

}