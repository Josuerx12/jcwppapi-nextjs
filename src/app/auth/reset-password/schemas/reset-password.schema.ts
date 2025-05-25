import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    code: z.string().min(3, "Código obrigatório."),
    newPassword: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    confirmPassword: z.string().min(6, "Confirme sua senha."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormType = z.infer<typeof resetPasswordSchema>;
