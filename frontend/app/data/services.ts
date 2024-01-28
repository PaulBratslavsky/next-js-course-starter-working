interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
}

interface LoginUserProps {
  identifier: string;
  password: string;
}


interface CommentProps {
  data: {
    comment: string;
    post: number;
    user: number;
  };
}

export async function registerUserService(userData: RegisterUserProps) {
  const baseUrl = process.env.STRAPI_URL ?? "http://localhost:1337";
  const url = baseUrl + "/api/auth/local/register";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    return response;
  } catch (error) {
    console.error("Registration Service Error:", error);
    throw new Error(
      "Oops! Something went wrong during the registration process."
    );
  }
}

export async function loginUserService(userData: LoginUserProps) {
  const baseUrl = process.env.STRAPI_URL ?? "http://localhost:1337";
  const url = baseUrl + "/api/auth/local";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
      cache: "no-cache",
    });

    return response;
  } catch (error) {
    console.error("Login Service Error:", error);
    throw new Error("Oops! Something went wrong during the login process.");
  }
}

export async function createCommentService(
  commentData: CommentProps,
  jwt: string
) {
  const baseUrl = process.env.STRAPI_URL ?? "http://localhost:1337";
  const url = baseUrl + "/api/comments";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + jwt,
      },
      body: JSON.stringify(commentData),
      cache: "no-cache",
    });

    return response;
  } catch (error) {
    console.error("Login Service Error:", error);
    throw new Error("Oops! Something went wrong during the login process.");
  }
}
