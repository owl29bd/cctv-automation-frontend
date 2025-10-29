import { Role } from "@/lib/enums/role.enum";
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import { UserStatus } from "../enums/status.enum";

export interface UserAuth extends DefaultUser {
  firstName: string;
  lastName: string;
  profileImage: string;
  role: Role;
  status: UserStatus[];
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

declare module "next-auth" {
  interface User {
    user: UserAuth;
    tokens: Tokens;
  }

  interface Session extends DefaultSession {
    user: UserAuth;
    tokens: Tokens;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: UserAuth;
    tokens: Tokens;
  }
}
