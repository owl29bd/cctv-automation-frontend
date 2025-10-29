import { Gender } from "../enums/gender.enum";
import { Role } from "../enums/role.enum";
import { UserStatus } from "../enums/status.enum";

export type UserRes = BaseResponse & {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: Gender;
  role: Role;
  status: UserStatus[];
};
