import BlogList from "@/app/components/BlogList";
import Pagination from "@/app/components/Pagination";
import Search from "@/app/components/Search";

import { getPostsData } from "@/app/data/loaders";

export default async function AboutRoute() {
  const data = await getPostsData();
  if (!data.data) return<p>No posts found.</p>
  
  return (
    <div>
      <Search />
      <BlogList data={data.data} />
      <Pagination totalPages={5}/>
    </div>
  );
}
