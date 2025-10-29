export const APIUrl = {
  base: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
  auth: {
    signin: () => "/auth/login",
    signup: () => "/auth/register",
    socialSignin: () => "/auth/social-signin",
    googleSignUp: () => "/auth/google-login",
    googleApiSignin: () => "https://www.googleapis.com/oauth2/v3/userinfo",
    signout: () => "/auth/logout",
    refreshToken: () => "/auth/refresh-token",
    forgotPassword: () => "/auth/forgot-password",
    resetPassword: (token: string) => "/auth/reset-password/" + token,
  },
  userManagement: {
    get: () => "/user-management",
    getById: (id: string) => "/user-management/" + id,
    createUser: () => "/user-management/create",
    updateUser: (id: string) => "/user-management/update/" + id,
    deleteUser: (id: string) => "/user-management/" + id,
    getUsersByRole: (role: string) => "/user-management/getUsersByRole/" + role,
  },
};

export const RouteUrls = {
  dashboard: { index: "/dashboard" },
  auth: {
    signin: "/auth/signin",
    signup: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password/[token]",
  },
  admin: {
    dashboard: {
      index: "/admin/dashboard",
    },
    userManagement: {
      index: "/admin/user-management",
    },
  },
  serviceProvider: {
    dashboard: {
      index: "/service-provider/dashboard",
    },
  },
  administrator: {
    dashboard: {
      index: "/administrator/dashboard",
    },
  },
};
