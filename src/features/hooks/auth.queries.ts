import type { LoginRequest } from "../types/requests/auth.request.types";
import AuthService from "../api/auth.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const authQueryKeys = {
  all: ["auth"] as const,
  user: () => [...authQueryKeys.all, "user"] as const,
  check: () => [...authQueryKeys.all, "check"] as const,
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: LoginRequest) => AuthService.login(request),
    onSuccess: async () => {
      // Re-trigger the auth check so app transitions from unauthenticated to authenticated
      await queryClient.invalidateQueries({
        queryKey: authQueryKeys.all,
      });
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      // Clear the entire React Query cache to purge sensitive data
      queryClient.clear();
    },
  });
};

export const useAuthCheckQuery = (enabled = true) => {
  return useQuery({
    queryKey: authQueryKeys.check(),
    queryFn: AuthService.authCheck,
    retry: false,
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes: avoids spamming endpoint on tab switches
    refetchOnWindowFocus: false,
  });
};
