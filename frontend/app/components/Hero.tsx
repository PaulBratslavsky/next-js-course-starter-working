import Link from "next/link";
import Image from "next/image";

import { getStrapiMedia } from "@/app/utils";

interface HeroProps {
  data: {
    heading: string;
    text: string;
    image: {
      url: string;
      alternativeText: string;
    };
    link: {
      text: string;
      href: string;
    };
  };
}

export default function Hero({ data }: Readonly<HeroProps>) {
  const { heading, text, image, link } = data;
  const imageUrl = getStrapiMedia(image.url);
  return (
    <div className="hero my-12 rounded-lg">
      <div className="hero-content p-0 flex-col lg:flex-row">
        {imageUrl && (
          <Image
            src={imageUrl}
            width={500}
            height={500}
            alt={image.alternativeText}
            className="max-w-sm rounded-lg shadow-2xl"
          />
        )}
        <div className="mx-8">
          <h1 className="text-5xl font-bold">{heading}</h1>
          <p className="py-6">{text}</p>
          <Link href={link.href} className="btn btn-primary">
            {link.text}
          </Link>
        </div>
      </div>
    </div>
  );
}
