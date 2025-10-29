import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { RouteRole } from "./lib/enums/role.enum";
import { roleAccessConfig } from "./lib/utils/routes";

function authMiddleware(req: NextRequestWithAuth) {
  const userRole = req.nextauth.token?.user?.role;
  const userStatus = req.nextauth.token?.user?.status;
  const pathname = req.nextUrl.pathname;
  const defaultRedirectUrl = "/dashboard";

  if (userRole === undefined) {
    return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
  }

  if (userRole) {
    const routeRole = RouteRole[userRole as keyof typeof RouteRole];
    if (pathname === "/dashboard") {
      return NextResponse.redirect(
        new URL(`/${routeRole}/dashboard`, req.nextUrl),
      );
    }
    const allowedRoutes =
      roleAccessConfig[routeRole as keyof typeof roleAccessConfig];

    if (
      !allowedRoutes ||
      !allowedRoutes.some((route) => pathname.includes(route))
    ) {
      // return NextResponse.rewrite(new URL("/unauthorized", req.nextUrl));
      return NextResponse.redirect(
        new URL(defaultRedirectUrl, req.nextUrl.origin),
      );
    }
  }
}

export default withAuth(authMiddleware, {
  callbacks: {
    authorized: async ({ token }) => {
      return !!token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
});

export const config = {
  matcher: [
    "/dashboard",
    "/admin/:path*",
    "/analyst/:path*",
    "/deliveryApprover/:path*",
    "/reportApprover/:path*",
    "/uploader/:path*",
    "/investigator/:path*",
    "/si/:path*",
    "/sa/:path*",
    "/user/:path*",
    "/onboarding/:path*",
  ],
};
