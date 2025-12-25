import { NextFunction, Request, Response } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request go through function middleware ... ');
  next();
}
