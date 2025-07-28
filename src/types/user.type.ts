export enum UserRoles {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER = "SUPER",
}

export type User = {
  id: string;
  name: string;
  document: string;
  email: string;
  isTempPass: boolean;
  role: UserRoles;
  createdAt: Date;
  updatedAt: Date;
};

export type UserSecret = {
  id: string;
  userId: string;
  secret: string;
  createdAt: Date;
  updatedAt: Date;
};
