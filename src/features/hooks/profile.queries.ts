import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProfileService from "../api/profile.services";
import type {
  ChangEmailRequest,
  ChangeNameRequest,
  ChangePasswordRequest,
} from "../types/requests/profile.request.types";

export const profileQueryKeys = {
  all: ["user"] as const,
  profile: () => [...profileQueryKeys.all, "profile"] as const,
  info: () => [...profileQueryKeys.profile(), "info"] as const,
};

export const useGetUserInfoQuery = (enabled = true) => {
  return useQuery({
    queryKey: profileQueryKeys.info(),
    queryFn: () => ProfileService.getUserInfo(),
    retry: false,
    enabled,
  });
};

export const useUploadProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (image: FormData) => ProfileService.uploadProfile(image),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: profileQueryKeys.profile(),
      });
    },
  });
};

export const useChangeNameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: ChangeNameRequest) =>
      ProfileService.changeName(request),

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: profileQueryKeys.info(),
      });
    },
  });
};

export const useChangEmailMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: ChangEmailRequest) =>
      ProfileService.changEmail(request),

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: profileQueryKeys.info(),
      });
    },
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (request: ChangePasswordRequest) =>
      ProfileService.changePassword(request),
  });
};
