import { z } from "zod";

// Regex para telefone, permitindo com ou sem pontos e traços
const phoneRegex = /^\(?\d{2}\)?\s?\d{5}-?\d{4}$/;

// Regex para CPF e CNPJ, permitindo com ou sem pontos, barra e traços
const documentRegex =
  /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{11}|\d{14})$/;

export const SignUpSchema = z.object({
  name: z
    .string({ message: "Nome é obrigatório." })
    .min(3, "Nome muito curto."),
  email: z
    .string({ message: "E-mail deve ser informado." })
    .email({ message: "Deve ser um e-mail válido." }),
  phone: z
    .string({ message: "Número de telefone deve ser informado." })
    .regex(phoneRegex, "Telefone inválido. Ex: (99) 99999-9999 ou 99999999999"),
  documentType: z.enum(["CPF", "CNPJ"], {
    required_error: "Tipo de documento é obrigatório",
  }),
  document: z
    .string({ message: "Número do documento deve ser informado." })
    .regex(documentRegex, "Documento inválido. Ex: CPF ou CNPJ."),
  password: z
    .string({ message: "Senha deve ser informada." })
    .min(6, { message: "Senha deve conter pelo menos 6 caracteres." }),
});

export type SignUpType = z.infer<typeof SignUpSchema>;
