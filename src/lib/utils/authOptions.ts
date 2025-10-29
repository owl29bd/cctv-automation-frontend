import authService from "@/lib/services/auth.service";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  try {
    const res = await authService.refreshAccessToken(token.tokens.refreshToken);

    token.tokens = res.tokens;

    return token;
  } catch (error) {
    console.error("Error refreshing token");
    return {} as JWT;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { email, password } = credentials;

        try {
          const res = await authService.signin({ email, password });

          return { ...res.user, ...res };
        } catch (error) {
          return null;
        }
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    //   httpOptions: {
    //     timeout: 10000,
    //   },
    //   async profile(profile: GoogleProfile) {
    //     const user = {
    //       oAuthId: profile.sub,
    //       email: profile.email,
    //       firstName: profile.given_name ?? profile.name,
    //       lastName: profile.family_name ?? profile.name,
    //       profileImage: profile.picture,
    //     };

    //     const res = await authService.googleSignin(user);

    //     return { ...res.user, ...res };
    //   },
    // }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        token.user = user.user;
        token.tokens = user.tokens;
      }
      if (session) {
        token.user = session.user;
        token.tokens = session.tokens;
      }

      if (Date.now() < token.tokens?.expiresIn) return token;

      return await refreshToken(token);
    },

    async session({ token, session }) {
      if (token.user) session.user = token.user;

      if (token.tokens) session.tokens = token.tokens;

      return session;
    },
  },
};
