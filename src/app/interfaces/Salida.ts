export interface Salida {
    content:          Content[];
    pageable:         Pageable;
    last:             boolean;
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}

export interface Content {
    idSalida:       number;
    horaSalida:     Date;
    destino:        string;
    dniPatron:      string;
    idBarco:        number;
}

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}


export interface SalidaData{
    idSalida:       number;
    horaSalida:     string;
    destino:        string;
    dniPatron:      string;
    idBarco:        number;
}
