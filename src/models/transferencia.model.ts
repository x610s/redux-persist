
export interface TransferenciaResponse {
    id:             number;
    fecha:          Date | string;
    monto:          number;
    observacion:    string;
    cuenta_destino: string;
    user_id:        number;
    user:           User | null;
}

export interface TrasnferenciaCreate {
    fecha:          Date | string;
    monto:          number;
    observacion:    string;
    cuenta_destino: string;
    user_id:        number;
}

export interface TrasnferenciaEdit extends TrasnferenciaCreate {
    id: number;
}

export interface User {
    id:   number;
    name: string;
}

