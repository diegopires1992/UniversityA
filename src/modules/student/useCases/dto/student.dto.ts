export type CreateStudenDTO = {
    name: string;
    email: string;
    ra: string;
    cpf: string;
}

export type StudenCreatedDTO = {
    id: string;
    createAT: Date;
} & CreateStudenDTO


export type FilterStudenDTO = {
    name?: string;
    email?: string;
    ra?: string;
    cpf?: string;
}

export type FilterTermDTO = {
    term: string;
}


