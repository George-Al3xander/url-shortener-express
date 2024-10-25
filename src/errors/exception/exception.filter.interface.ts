import { NextFunction, Request, Response } from "express";

import HTTPError from "@/errors/http-error";

export default interface IExceptionFilter {
    catch: (
        error: Error | HTTPError,
        req: Request,
        res: Response,
        next: NextFunction,
    ) => void;
}