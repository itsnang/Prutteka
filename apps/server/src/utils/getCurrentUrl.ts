import { Request } from 'express';

const getCurrentUrl = (req: Request) => {
  return new URL(req.protocol + '://' + req.get('host') + req.originalUrl);
};

export default getCurrentUrl;
