import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {

    errors: any;
    constructor() { }


    handleError(errors) {

        if (errors.graphQLErrors) {

            errors.graphQLErrors.map((extensions, message, debugMessage) => {

                if (extensions['category'] === 'validation') {
                    this.errors = extensions['extensions'].validation;
                } else {
                    this.errors = extensions['debugMessage'];
                }
            }
            );
        }

        if (errors.networkError) {
            console.log(`[Network error]: ${errors.networkError}`);
            return errors.networkError;
        }
        if (errors.operation) {
            console.log(`[Operation error]: ${errors.operation}`);
            return errors.operation;
        }
        if (errors.response) {
            console.log(`[Response error]: ${errors.response}`);
            return errors.response;
        }

        return this.errors;
    }
}
