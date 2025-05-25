"use server";

import { SignUpType } from "@/app/auth/signup/schemas/signup.schema";
import { api } from "@/lib/api.config";

export async function SignUp(data: SignUpType) {
  try {
    await api.post("/auth/pre-register", data);
    return;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data.message;
    }

    throw error;
  }
}
