import { BaseModel } from "./base";

interface UserCount {
  following: number;
  post: number;
  follower: number;
}

interface UserInfo {
  name: string;
  content: string;
  url: string;
  etc: string;
}

export interface User extends BaseModel {
  count: UserCount;
  info: UserInfo;
}

export const UserTableFields = [
  "name",
  "content",
  "url",
  "etc",
  "following",
  "post",
  "follower",
];
