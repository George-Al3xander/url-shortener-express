import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import e from "express";

import { IMiddleware } from "@/common";

export class ValidateMiddleware implements IMiddleware {
    constructor(private classToValidate: ClassConstructor<object>) {}

    execute({ body }: e.Request, res: e.Response, next: e.NextFunction): void {
        const instance = plainToInstance(this.classToValidate, body);

        validate(instance).then((errs) => {
            if (errs.length > 0) {
                res.status(500).send(errs);
            } else {
                next();
            }
        });
    }
}
