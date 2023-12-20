import NextImage, { ImageProps } from "next/image";

import { Image } from "@/lib/zod/paragraph";
import { absoluteUrl } from "@/lib/drupal/absolute-url";

interface MediaImageProps extends Partial<ImageProps> {
  media: Image["field_image"];
}

export function MediaImage({
  media,
  width,
  height,
  ...props
}: MediaImageProps) {
  const image = media?.field_media_image;

  if (!image) {
    return null;
  }

  return (
    <NextImage
      src={absoluteUrl(image.uri.url)}
      width={width || image.resourceIdObjMeta.width}
      height={height || image.resourceIdObjMeta.height}
      alt={image.resourceIdObjMeta.alt || "Image"}
      title={image.resourceIdObjMeta.title}
      className="h-auto max-w-full object-cover"
      {...props}
      data-aos="fade"
    />
  );
}
