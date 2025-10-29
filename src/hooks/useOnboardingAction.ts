"use client";

import onboardingService from "@/lib/services/onboarding.service";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function useOnboardingAction() {
  const session = useSession();

  const parentOnboardingMutation = useMutation({
    mutationFn: onboardingService.parentOnboarding,
    onSuccess: (data) => {
      session.update(data);
    },
  });

  const tutorOnboardingMutation = useMutation({
    mutationFn: onboardingService.tutorOnboarding,
    onSuccess: (data) => {
      session.update(data);
    },
  });

  const studentOnboardingMutation = useMutation({
    mutationFn: onboardingService.studentOnboarding,
    onSuccess: (data) => {
      session.update(data);
    },
  });

  return {
    parentOnboardingMutation,
    tutorOnboardingMutation,
    studentOnboardingMutation,
  };
}
