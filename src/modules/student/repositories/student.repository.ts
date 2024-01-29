import { CreateStudenDTO, FilterStudenDTO, FilterTermDTO, StudenCreatedDTO } from "../useCases/dto/student.dto";

export abstract class IStudentRepository {
    abstract findByStudent(data: FilterStudenDTO): Promise<StudenCreatedDTO | null>;
    abstract save(data: CreateStudenDTO): Promise<StudenCreatedDTO | null>;
    abstract findAllWithPagination(offset: number, pageSize: number): Promise<StudenCreatedDTO[]>;
    abstract findByFiltersWithPagination(filters: FilterTermDTO, offset: number, pageSize: number): Promise<StudenCreatedDTO[]>;
}