import {
  ForgotPasswordReq,
  GoogleSigninReq,
  ResetPasswordReq,
  SigninReq,
  SigninRes,
  SignupReq,
} from "@/lib/dtos/auth.dto";
import httpClient, { httpClientWithoutToken } from "@/lib/utils/httpClient";

import { APIUrl } from "@/lib/constants/url.config";

class AuthService {
  async signin(data: SigninReq) {
    const res = await httpClient.post<SigninRes>(APIUrl.auth.signin(), data);

    return res.data;
  }

  async signup(data: SignupReq) {
    const res = await httpClient.post<SigninRes>(APIUrl.auth.signup(), data);

    return res.data;
  }

  async signout() {
    await httpClient.post(APIUrl.auth.signout());
  }

  async forgotPassword(data: ForgotPasswordReq) {
    await httpClient.post(APIUrl.auth.forgotPassword(), data);
  }

  async resetPassword(resetToken: string, data: ResetPasswordReq) {
    await httpClient.put(APIUrl.auth.resetPassword(resetToken), data);
  }

  async refreshAccessToken(refreshToken: string) {
    const res = await httpClientWithoutToken.post<SigninRes>(
      APIUrl.auth.refreshToken(),
      {
        token: refreshToken,
      },
    );

    return res.data;
  }

  async googleSignin(data: GoogleSigninReq) {
    const res = await httpClient.post<SigninRes>(
      APIUrl.auth.googleSignUp(),
      data,
    );

    return res.data;
  }
}

const authService = new AuthService();

export default authService;
