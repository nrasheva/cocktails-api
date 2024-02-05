import { Role } from 'src/constants/role.enum';

export type User = {
  email: string;
  password: string;
  roles: Role[];
};
