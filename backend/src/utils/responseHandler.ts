import { Request, Response, NextFunction } from "express";

export type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export function sendSuccess<T>(
  res: Response,
  data: T,
  count?: number
): void {
  res.json({
    success: true,
    count: count ?? (Array.isArray(data) ? data.length : 1),
    data,
  });
}

export function handleAsyncRoute(
  handler: AsyncRequestHandler
): AsyncRequestHandler {
  return (req, res, next) => handler(req, res, next).catch(next);
}
