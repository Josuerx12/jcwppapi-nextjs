import { api } from "@/lib/api.config";
import { Pagination } from "@/types/pagination.type";
import { PreRegister } from "@/types/pre-register.type";

export class PreRegisterService {
  static async getAll(): Promise<Pagination<PreRegister>> {
    try {
      const res = await api.get("/pre-register/");
      return res.data;
    } catch (error: any) {
      if (error.response) {
        throw error.response.data.message;
      }

      throw error;
    }
  }

  static async approve(id: string): Promise<void> {
    try {
      await api.post("/pre-register/approve", { id });
      return;
    } catch (error: any) {
      if (error.response) {
        throw error.response.data.message;
      }

      throw error;
    }
  }
}
