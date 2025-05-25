import { z } from "zod";

export const forgotPasswordSchema = z.object({
  login: z
    .string({ message: "Informe um CPF, CNPJ ou e-mail válido." })
    .min(3, "Informe um CPF, CNPJ ou e-mail válido."),
});

export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>;
