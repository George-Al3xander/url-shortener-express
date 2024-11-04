import { ValidationError } from "class-validator";
import { Request } from "express";

export const convertSnakeToCamel = (key: string): string => {
    const split = key.split("_");
    return (
        split[0].toLowerCase() +
        split
            .slice(1)
            .map((w) => w[0] + w.substring(1).toLowerCase())
            .join("")
    );
};

export const getCurrentURL = ({
    protocol,
    hostname,
    socket: { localPort },
}: Request): string => `${protocol}://${hostname}:${localPort}`;

export const simplifyValidationErrs = (
    validationErrors: ValidationError[],
): { message: string } => {
    const errObj = validationErrors[0];

    if (!errObj.constraints) return { message: "Something went wrong" };
    else {
        const firstKey = Object.keys(errObj.constraints)[0];
        return { message: errObj.constraints[firstKey] };
    }
};
