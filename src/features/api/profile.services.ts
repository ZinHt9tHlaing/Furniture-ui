import authApiClient from "@/api/clients/authClient";
import type { GetUserInfoResponse } from "../types/responses/profile.response.types";
import { profileEndpoints } from "@/config/constants/endpoints";
import type {
  ChangEmailRequest,
  ChangeNameRequest,
  ChangePasswordRequest,
} from "../types/requests/profile.request.types";
import type { BaseMessageResponse } from "../types/responses/base.response";

const ProfileService = {
  getUserInfo: async () => {
    const response = await authApiClient.get<GetUserInfoResponse>(
      profileEndpoints.getUserInfo
    );

    const userInfo = response.data?.userInfo;
    if (userInfo?.image?.image_url) {
      // add cachebuster to prevent image caching issue on cloudinary
      // If a Profile image URL contains a query string, append a timestamp parameter to prevent browser caching.
      const separator = userInfo.image.image_url.includes("?") ? "&" : "?";
      userInfo.image.image_url = `${userInfo.image.image_url}${separator}cb=${new Date().getTime()}`;
    }

    return response.data;
  },

  uploadProfile: async (image: FormData) => {
    const response = await authApiClient.patch<BaseMessageResponse>(
      profileEndpoints.uploadProfile,
      image,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  changeName: async (request: ChangeNameRequest) => {
    const response = await authApiClient.put<BaseMessageResponse>(
      profileEndpoints.changeName,
      request
    );
    return response.data;
  },

  changEmail: async (request: ChangEmailRequest) => {
    const response = await authApiClient.put<BaseMessageResponse>(
      profileEndpoints.changeEmail,
      request
    );
    return response.data;
  },

  changePassword: async (request: ChangePasswordRequest) => {
    const response = await authApiClient.put<BaseMessageResponse>(
      profileEndpoints.changePassword,
      request
    );
    return response.data;
  },
};

export default ProfileService;
