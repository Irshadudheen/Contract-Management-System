import { CustomError } from "./custom-error";

export class EmailInUseError extends CustomError {
    reason ='Email is already in use';
    statusCode = 409;
    constructor() {
        super('Email is already in use');
        Object.setPrototypeOf(this, EmailInUseError.prototype);
    }
    serializeErrors(){
        return [{message:this.message}];
    }
}