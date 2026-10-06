export interface BaseMessageResponse<T = void> {
  message: string;
  data?: T;
}