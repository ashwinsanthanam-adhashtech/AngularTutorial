export class GenericResponse {
    status: String = '';
    message: String = '';
    payload: any = null;
    
    constructor(response: GenericResponse) {
        this.message = response.message;
        this.payload = response.payload;
        this.status = response.status;
    }

    get isSuccess(): boolean {
        return this.message == 'Success';
    } 
}