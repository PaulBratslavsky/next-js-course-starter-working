import Image from "next/image";
import Comments from "@/app/components/Comments";
import RichText from "@/app/components/RichText";
import { getPostsBySlug } from "@/app/data/loaders";
import { getStrapiMedia, formatDate } from "@/app/utils";

interface ImageProps {
  url: string;
  alternateText: string;
}

interface SinglePostProps {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: ImageProps;
  date: string;
  createdAt: string;
  category: {
    title: string;
  };
  author: {
    name: string;
    role: string;
    image: ImageProps;
  };
  content: string;
}

interface Params {
  params: {
    slug: string;
  };
}

export default async function Post({ params }: Readonly<Params>) {
  const data = await getPostsBySlug(params.slug);
  const singlePost = data.data[0];
  if (!singlePost) return <p>No post found.</p>;

  const { title, description, image, createdAt, author, content, id, slug } =
    singlePost as SinglePostProps;

  const imageUrl = getStrapiMedia(image.url);
  const authorImageUrl = getStrapiMedia(author.image.url);


  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
      <article className="space-y-8 dark:text-gray-50 my-6 col-span-5">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={image.alternateText}
            width={400}
            height={400}
            className="w-full h-96 object-cover rounded-lg"
          />
        )}
        <div className="space-y-6">
          <h1 className="leading-tight text-5xl font-bold ">{title}</h1>
          <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
            <div className="flex items-center md:space-x-2">
              {authorImageUrl && (
                <Image
                  src={authorImageUrl}
                  alt={author.image.alternateText}
                  width={400}
                  height={400}
                  className="w-14 h-14 rounded-full dark:bg-gray-500 dark:border-gray-700"
                />
              )}
              <p className="text-md dark:text-violet-400">
                {author.name} • {formatDate(createdAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="dark:text-gray-100">
          <p>{description}</p>
          <RichText content={content} />
        </div>
      </article>
      <div className="col-span-2">
        <Comments postId={id} slug={slug}/>
      </div>
    </div>
  );
}
