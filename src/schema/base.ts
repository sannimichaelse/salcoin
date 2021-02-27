import { Request } from 'express';
import { Schema } from 'joi';

export default class SchemaValidator {
    request: Request;
    schema: Schema;

    constructor(request: Request, schema: Schema) {
        this.request = request;
        this.schema = schema;
    }

    validate(): any {
        const { error, value } = this.schema.validate(this.request.body);
        if (error) {
            return error.message.replace(/[\"]/gi, '');
        } else {
            return null;
        }
    }
}