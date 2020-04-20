import { Response, Request, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Error('Token is not provided');
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    throw new Error('Token is not provided');
  }

  const match = verify(token, authConfig.privateKey);

  if (!match) {
    throw new Error('Token does not match');
  }

  next();
};
