import {
  ParentOnboardingReq,
  StudentOnboardingReq,
  TeacherOnboardingReq,
} from "@/lib/dtos/onboarding.dto";

import { APIUrl } from "@/lib/constants/url.config";
import { SigninRes } from "@/lib/dtos/auth.dto";
import httpClient from "@/lib/utils/httpClient";

class OnboardingService {
  async parentOnboarding(data: ParentOnboardingReq) {
    const res = await httpClient.post<SigninRes>(
      APIUrl.onboarding.parent(),
      data,
    );

    return res.data;
  }

  async tutorOnboarding(data: TeacherOnboardingReq) {
    data.firstName = data.firstName.trim();
    data.lastName = data.lastName.trim();

    const res = await httpClient.post<SigninRes>(
      APIUrl.onboarding.teacher(),
      data,
    );

    return res.data;
  }

  async studentOnboarding(data: StudentOnboardingReq) {
    const res = await httpClient.post<SigninRes>(
      APIUrl.onboarding.student(),
      data,
    );

    return res.data;
  }
}

const onboardingService = new OnboardingService();

export default onboardingService;
