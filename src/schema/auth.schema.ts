import * as z from "zod"

export const registerSchema = z.object({
    name: z.string().min(1, "Name is required").min(3, "Min 3 characters"),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required").min(6, "Min Length is 6"),
    rePassword: z.string().min(1, "Confirm password is required"),
    phone: z.string().min(1, "Phone Number is required").regex(/^01[0125][0-9]{8}$/, "Phone number must be a valid Egyptian mobile number (e.g. 01012345678)")
}).refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Password and RePassword must match"
})

export type registerSchemaType = z.infer<typeof registerSchema>

export const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required").min(6, "Min Length is 6"),
})

export type loginSchemaType = z.infer<typeof loginSchema>
