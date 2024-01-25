import qs from "qs";
import { flattenAttributes } from "@/app/utils";
const baseUrl = process.env.STRAPI_URL ?? "http://localhost:1337";

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

export function getGlobalData() {
  const query = qs.stringify({
    populate: [
      "topNav.logoText",
      "topNav.navItems",
      "topNav.cta",
      "footer.socialLinks",
    ],
  });
  return fetchData(`${baseUrl}/api/global?${query}`);
}

export function getHomePageData() {
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
  return fetchData(`${baseUrl}/api/home-page?${query}`);
}

export function getPostsData() {
  const query = qs.stringify({
    populate: {
      category: { populate: true },
      image: { fields: ["url", "alternativeText"] },
      author: { populate: { image: { fields: ["url", "alternativeText"] } } },
    },
  });
  return fetchData(`${baseUrl}/api/posts?${query}`);
}
