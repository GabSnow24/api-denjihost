import { Prisma } from '@prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {
  id?: string;
  cellphone: string;
  username: string;
  email: string;
  password: string;
  admin: boolean;
  hostings?: Prisma.HostingUncheckedCreateNestedManyWithoutUserInput;



}
