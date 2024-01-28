"use server";
import qs from "qs";
import { flattenAttributes } from "@/app/utils";
import { cookies } from "next/headers";
const baseUrl = process.env.STRAPI_URL ?? "http://localhost:1337";
const ITEMS_PER_PAGE = 3;

// learn more about generic types
// take the generic type T and return a promise of type T
async function fetchData(url: string) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const flattenedData = flattenAttributes(data);
    return flattenedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}

export async function getGlobalData() {
  const query = qs.stringify({
    populate: [
      "topNav.logoText",
      "topNav.navItems",
      "topNav.cta",
      "footer.socialLinks",
    ],
  });
  return await fetchData(`${baseUrl}/api/global?${query}`);
}

export async function getHomePageData() {
  const query = qs.stringify({
    populate: {
      blocks: {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          feature: {
            populate: true,
          },
          link: {
            populate: true,
          },
        },
      },
    },
  });
  return await fetchData(`${baseUrl}/api/home-page?${query}`);
}

export async function getPostsData(queryString?: string, currentPage?: number) {
  const query = qs.stringify({
    populate: {
      category: { populate: true },
      image: { fields: ["url", "alternativeText"] },
      author: { populate: { image: { fields: ["url", "alternativeText"] } } },
    },
    sort: ["createdAt:desc"],
    filters: {
      $or: [
        { title: { $contains: queryString } },
        { description: { $contains: queryString } },
        { content: { $contains: queryString } },
      ],
    },
    pagination: {
      pageSize: ITEMS_PER_PAGE,
      page: currentPage,
    },
  });
  return await fetchData(`${baseUrl}/api/posts?${query}`);
}

// define expected output by slug
export async function getPostsBySlug(slug: string) {
  const query = qs.stringify({
    filters: { slug: slug },
    populate: {
      category: { populate: true },
      image: { fields: ["url", "alternativeText"] },
      author: { populate: { image: { fields: ["url", "alternativeText"] } } },
    },
  });
  return await fetchData(`${baseUrl}/api/posts?${query}`);
}

export async function getCommentsByPostId(id: number) {
  const query = qs.stringify({
    filters: { post: id },
    populate: {
      user: {
        fields: ["username", "id"],
      },
    },
  });
  return await fetchData(`${baseUrl}/api/comments?${query}`);
}

export async function getUserMeLoader() {
  const url = `${baseUrl}/api/users/me?`;
  const authToken = cookies().get("jwt")?.value;
  if (!authToken) return { ok: false, data: null };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-cache",
    });
    const data = await response.json();
    if (data.error && authToken) cookies().delete("jwt");
    return { ok: true, data: data };
  } catch (error) {
    console.log(error);
  }
  return { ok: false, data: null };
}
