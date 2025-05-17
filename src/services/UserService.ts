import { api } from "@/lib/api.config";
import { User } from "@/types/user.type";

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
}
