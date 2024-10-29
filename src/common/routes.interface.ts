import { NextFunction, Request, Response, Router } from "express";

import { IMiddleware } from "@/common";

export interface IRoute {
    path: string;
    func: (req: Request, res: Response, next: NextFunction) => void;
    method: keyof Pick<Router, "get" | "put" | "post" | "delete" | "patch">;
    middlewares?: IMiddleware[];
}
