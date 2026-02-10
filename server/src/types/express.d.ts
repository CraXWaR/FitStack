import type {IJwtPayload} from "./JwtPayload.type.js";

declare global {
    namespace Express {
        interface Request {
            user?: IJwtPayload;
        }
    }
}