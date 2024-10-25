import { NextFunction, Request, Response, Router } from "express";

export default interface IUrlController {
    router: Router;
    generateId(req: Request, res: Response, next: NextFunction): void;
    redirectById(req: Request, res: Response, next: NextFunction): void;
}
