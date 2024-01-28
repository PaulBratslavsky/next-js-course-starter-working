import Hero from "@/app/components/Hero";
import Features from "@/app/components/Features";
import { getHomePageData } from "@/app/data/loaders";

export default async function HomeRoute() {
  const data = await getHomePageData();

  if (!data?.blocks) return <p>No items found.</p>;
  const { blocks } = data;

  return blocks.map((block: any, index: number) =>
    blocksRenderer(block, index)
  );
}

function blocksRenderer(block: any, index: number) {
  switch (block.__component) {
    case "layout.hero":
      return <Hero key={index} data={block} />;
    case "layout.features-list":
      return <Features key={index} data={block} />;
    default:
      return null;
  }
}
