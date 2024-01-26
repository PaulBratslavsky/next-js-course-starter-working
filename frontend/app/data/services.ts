interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
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
