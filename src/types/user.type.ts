export enum UserRoles {
  USER = "user",
  ADMIN = "admin",
  SUPER = "super",
}

export type User = {
  userId: string;
  name: string;
  document: string;
  email: string;
  password: string;
  isTempPass: boolean;
  role: UserRoles;
  code: string;
  createdAt: Date;
  updatedAt: Date;
};
