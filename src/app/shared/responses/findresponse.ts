export interface RESTSuccess {
    message?: string;
    resourceId?: number | string;
}

export interface FindResponse<T> {
    data: T[];
}

export interface FindOneResponse<T> {
    data: T;
}
