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
}
