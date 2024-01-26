import qs from "qs";
import { flattenAttributes } from "@/app/utils";
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

export function getPostsData(queryString?: string, currentPage?: number) {
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
  return fetchData(`${baseUrl}/api/posts?${query}`);
}

// define expected output by slug
export function getPostsBySlug(slug: string) {
  const query = qs.stringify({
    filters: { slug: slug },
    populate: {
      category: { populate: true },
      image: { fields: ["url", "alternativeText"] },
      author: { populate: { image: { fields: ["url", "alternativeText"] } } },
    },
  });
  return fetchData(`${baseUrl}/api/posts?${query}`);
}
