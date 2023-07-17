export interface ErrorMessage {
	message: string;
}

export class MyError extends Error {
	constructor(message: string, public readonly statusCode: number) {
        super(message);
        this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}
