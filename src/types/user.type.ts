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
  isTempPass: boolean;
  role: UserRoles;
  createdAt: Date;
  updatedAt: Date;
};

export type UserSecret = {
  userSecretId: string;
  userId: string;
  secret: string;
  createdAt: Date;
  updatedAt: Date;
};
