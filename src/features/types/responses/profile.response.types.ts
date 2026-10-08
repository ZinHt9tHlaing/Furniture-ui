export interface Image {
  image_url: string | null;
  public_id: string | null;
  order: number | 0;
}

export interface GetUserInfoResponse {
  userInfo: {
    id: string | number;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    phone: string | number;
    role: string;
    image?: Image | null;
    status: string;
    created_at: string;
    updated_at: string;
  };
}
