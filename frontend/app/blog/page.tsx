import BlogList from "@/app/components/BlogList";
import Pagination from "@/app/components/Pagination";
import Search from "@/app/components/Search";

import { getPostsData } from "@/app/data/loaders";

interface SearchParams {
  searchParams?: {
    page?: string;
    query?: string;
  };
}

export default async function BlogRoute({
  searchParams,
}: Readonly<SearchParams>) {
  const query = searchParams?.query ?? "";
  const currentPage = Number(searchParams?.page) || 1;

  const data = await getPostsData(query, currentPage);

  if (!data.data) return <p>No posts found.</p>;

  return (
    <div>
      <Search />
      <BlogList data={data.data} />
      <Pagination totalPages={data.meta.pagination.pageCount} />
    </div>
  );
}
