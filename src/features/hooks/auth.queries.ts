import type { LoginRequest } from "../types/requests/auth.request.types";
import AuthService from "../api/auth.services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const userQueryKeys = {
  userInfo: ["user-info"] as const,
  authCheck: ["auth-check"] as const,
};

export const useLoginMutation = () =>
  useMutation({
    mutationFn: (request: LoginRequest) => AuthService.login(request),
  });

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => AuthService.logout(),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: userQueryKeys.userInfo,
      });
      await queryClient.invalidateQueries({
        queryKey: userQueryKeys.authCheck,
      });
    },
  });
};

export const useAuthCheckQuery = (enabled = true) => {
  return useQuery({
    queryKey: userQueryKeys.authCheck,
    queryFn: () => AuthService.authCheck(),
    retry: false,
    enabled,
  });
};
