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
