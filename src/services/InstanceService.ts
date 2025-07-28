import { api } from "@/lib/api.config";
import { Instance } from "@/types/instance.type";

export class InstanceService {
  static async connectOrCreate(
    data: CreateOrConnectInstanceInput
  ): Promise<CreateOrConnectInstanceOutput> {
    try {
      const res = await api.post("/instance/create", data);
      return res.data;
    } catch (error: any) {
      if (error.response) {
        throw error.response.data.message;
      }

      throw error;
    }
  }

  static async delete(id: string) {
    try {
      await api.delete("/instance/" + id);
      return;
    } catch (error: any) {
      if (error.response) {
        throw error.response.data.message;
      }

      throw error;
    }
  }

  static async getAll(): Promise<GetAllInstanceOutput> {
    try {
      const res = await api.get("/instance/");
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

  static async sendMessage(
    sessionId: string,
    number: string,
    message: string,
    secret: string
  ) {
    try {
      const res = await api.post(
        `/instance/${sessionId}/send-text`,
        {
          number,
          message,
        },
        {
          headers: {
            secret: secret,
          },
        }
      );
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

export type CreateOrConnectInstanceInput = {
  sessionId?: string;
};

export type CreateOrConnectInstanceOutput = Instance;

export type GetAllInstanceOutput = {
  instances: Instance[];
};
