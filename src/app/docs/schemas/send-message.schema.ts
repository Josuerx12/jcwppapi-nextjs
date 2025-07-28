import { z } from "zod";

export const sendMessageSchema = z.object({
  sessionId: z.string().min(3, "ID da instância obrigatório"),
  secret: z.string().min(3, "Token secreto obrigatório"),
  number: z.string().min(10, "Número obrigatório"),
  message: z.string().min(1, "Mensagem obrigatória"),
});

export type SendMessageFormType = z.infer<typeof sendMessageSchema>;
