import { CreateStudenDTO, FilterStudenDTO, FilterTermDTO, StudenCreatedDTO } from "../useCases/dto/student.dto";

export abstract class IStudentRepository {
    abstract findByStudent(data: FilterStudenDTO): Promise<StudenCreatedDTO | null>;
    abstract save(data: CreateStudenDTO): Promise<StudenCreatedDTO | null>;
    abstract findAllWithPagination(offset: number, pageSize: number): Promise<CreateStudenDTO[]>;
    abstract findByFiltersWithPagination(filters: FilterTermDTO, offset: number, pageSize: number): Promise<CreateStudenDTO[]>;
    abstract findById(id: string): Promise<CreateStudenDTO | null>;
    abstract updateById(id: string, data: Partial<CreateStudenDTO>): Promise<CreateStudenDTO | null>;
    abstract deleteById(id: string): Promise<CreateStudenDTO | null>
}