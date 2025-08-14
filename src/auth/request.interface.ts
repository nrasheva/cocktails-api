import { Request } from 'express';

import { User } from 'src/users/users.types';

export interface CustomRequest extends Request {
  user: User;
}
