"use client";
import { CldImage as NextCldImage, CldImageProps } from "next-cloudinary";

export const CldImage = (props: CldImageProps) => {
  return <NextCldImage {...props} />;
};
