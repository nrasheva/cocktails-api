import { Role } from 'src/constants/role.enum';

export type User = {
  id: string;
  email: string;
  password: string;
  roles: Role[];
};
