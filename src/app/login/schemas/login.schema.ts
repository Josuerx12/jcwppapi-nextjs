import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ message: "E-mail deve ser informado." })
    .email({ message: "Deve ser informado um e-mail valido!" }),
  password: z.string({ message: "Senha deve ser informada para fazer login." }),
});

export type loginFormType = z.infer<typeof loginSchema>;
