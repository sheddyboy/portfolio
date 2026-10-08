import { makeRouteHandler } from "@keystatic/next/route-handler";
import config from "../../../../keystatic.config";

// Built on first request instead of at import, so `next build` doesn't require the
// GitHub secrets. In production they must be set, or this route errors when used.
let handler: ReturnType<typeof makeRouteHandler> | undefined;
const getHandler = () => (handler ??= makeRouteHandler({ config }));

export const GET = (req: Request) => getHandler().GET(req);
export const POST = (req: Request) => getHandler().POST(req);
