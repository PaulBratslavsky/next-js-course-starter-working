"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { registerUserService } from "@/app/data/services";

const schema = z.object({
  username: z.string().min(3).max(20, {
    message: "Username must be between 3 and 20 characters",
  }),
  password: z.string().min(6).max(100, {
    message: "Password must be between 6 and 100 characters",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export async function registerUserAction(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }

  const response = await registerUserService(validatedFields.data);
  const responseData = await response.json();

  if (!response.ok && responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      message: "Failed to Register.",
    };
  } else {
    cookies().set("jwt", responseData.jwt);
    redirect("/blog");
  }
}

export async function logoutAction() {
  cookies().delete("jwt");
  return { ok: true };
};


