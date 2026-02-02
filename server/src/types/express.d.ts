import type {IJwtPayload} from "./JwtPayload.js";

declare global {
    namespace Express {
        interface Request {
            user?: IJwtPayload;
        }
    }
}