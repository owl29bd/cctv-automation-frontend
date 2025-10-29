import { Gender } from "../enums/gender.enum";
import { Role } from "../enums/role.enum";
import { UserStatus } from "../enums/status.enum";

export type UserRes = BaseResponse & {
  firstName: string;
  lastName: string;
  // name: string;
  email: string;
  // profileImage: string;
  phone: string;
  gender: Gender;
  role: Role;
  status: UserStatus[];
};

export type UserResV2SI = BaseResponse & {
  firstName: string;
  lastName: string;
  // name: string;
  email: string;
  // profileImage: string;
  phone: string;
  gender: Gender;
  role: string;
  status: UserStatus[];
};

export type MemberRes = BaseResponse & {
  name: string;
  role: string;
};

export type GroupRes = BaseResponse & {
  groupName: string;
  groupType: string;
  groupLeader: UserRes;
  groupMembers: UserRes[];
};

export type CreateGroupReq = {
  groupName: string;
  groupType: string;
  groupLeader: string;
  groupmembers: string[];
};
