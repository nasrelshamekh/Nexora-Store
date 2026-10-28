import { z } from "zod"

export const verifyCodeSchema = z.object({
  resetCode: z.string().min(6, "Code must be at least 6 characters"),
})

export type VerifyCodeFormType = z.infer<typeof verifyCodeSchema>
