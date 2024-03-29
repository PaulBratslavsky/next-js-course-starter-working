"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  registerUserService,
  loginUserService,
  createCommentService,
} from "@/app/data/services";
import { revalidatePath } from "next/cache";

const schemaRegister = z.object({
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
  const validatedFields = schemaRegister.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Register.",
    };
  }

  const response = await registerUserService(validatedFields.data);
  const responseData = await response.json();

  if (!response.ok && responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Register.",
    };
  } else {
    cookies().set("jwt", responseData.jwt);
    redirect("/blog");
  }
}

const schemaLogin = z.object({
  identifier: z
    .string()
    .min(3, {
      message: "Identifier must have at least 3 or more characters",
    })
    .max(20, {
      message: "Please enter a valid username or email address",
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must have at least 6 or more characters",
    })
    .max(100, {
      message: "Password must be between 6 and 100 characters",
    }),
});

export async function loginUserAction(prevState: any, formData: FormData) {
  const validatedFields = schemaLogin.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Login.",
    };
  }

  const response = await loginUserService(validatedFields.data);
  const responseData = await response.json();

  if (!response.ok && responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Login.",
    };
  } else {
    cookies().set("jwt", responseData.jwt);
    redirect("/blog");
  }
}

const schemaComment = z.object({
  comment: z
    .string()
    .min(3, {
      message: "Comment must be between 3 and 144 characters",
    })
    .max(144, {
      message: "Comment must be between 3 and 144 characters",
    }),
});

interface CommentParams {
  postId: number;
  userId: number;
  slug: string;
}

export async function createCommentAction(
  params: CommentParams,
  prevState: any,
  formData: FormData
) {
  const jwt = cookies().get("jwt")?.value;
  if (!jwt) redirect("/login");

  const validatedFields = schemaComment.safeParse({
    comment: formData.get("comment"),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      zodErrors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to create comment.",
    };
  }

  const dataToSend = {
    data: {
      comment: validatedFields.data.comment,
      post: params.postId,
      user: params.userId,
    },
  };

  const response = await createCommentService(dataToSend, jwt);
  const responseData = await response.json();
  if (!response.ok && responseData.error) {
    return {
      ...prevState,
      strapiErrors: responseData.error,
      zodErrors: null,
      message: "Failed to Register.",
    };
  } else {
    revalidatePath("/blog/" + params.slug);
    return {
      ...prevState,
      message: "Comment created successfully.",
      zodErrors: null,
      strapiErrors: null,
      data: responseData,
    };
  }
}

export async function logoutAction() {
  cookies().delete("jwt");
  return { ok: true };
}
