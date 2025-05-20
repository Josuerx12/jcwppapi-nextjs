import { api } from "@/lib/api.config";
import { User, UserSecret } from "@/types/user.type";

export class UserService {
  static async getAll(): Promise<User[]> {
    try {
      const res = await api.get("/users/");
      return res.data.payload;
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
        throw error.response.data.message;
      }

      console.log(error);
      throw error;
    }
  }

  static async requestPasswordReset({ login }: { login: string }) {
    try {
      const res = await api.post("/auth/request-reset-password", { login });
      return res.data;
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
        throw error.response.data.message;
      }

      console.log(error);
      throw error;
    }
  }

  static async resetPassword({
    code,
    newPassword,
  }: {
    code: string;
    newPassword: string;
  }) {
    try {
      const res = await api.post("/auth/reset-password", { code, newPassword });
      return res.data;
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
        throw error.response.data.message;
      }

      console.log(error);
      throw error;
    }
  }

  static async changePassword({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }) {
    try {
      const res = await api.post("/users/change-password", {
        oldPassword,
        newPassword,
      });
      return res.data;
    } catch (error: any) {
      if (error.response) {
        throw error.response.data.message;
      }

      console.log(error);
      throw error;
    }
  }

  static async updateUser({
    userId,
    name,
    email,
    document,
  }: {
    userId: string;
    name: string;
    email: string;
    document: string;
  }) {
    try {
      const res = await api.put(`/users/${userId}`, {
        name,
        email,
        document,
      });
      return res.data.data;
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
        throw error.response.data.message;
      }

      console.log(error);
      throw error;
    }
  }

  static async getUserSecret(): Promise<UserSecret> {
    try {
      const res = await api.get(`/users/user-secret`);
      return res.data.data;
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
        throw error.response.data.message;
      }

      console.log(error);
      throw error;
    }
  }

  static async renewUserSecret(): Promise<{
    message: string;
    data: UserSecret;
  }> {
    try {
      const res = await api.post(`/users/refresh-user-secret`);
      return res.data;
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
        throw error.response.data.message;
      }

      console.log(error);
      throw error;
    }
  }
}
