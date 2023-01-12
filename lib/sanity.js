import Image from "next/image";
import {createClient} from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import { config } from "./config";
import GetImage from "../utils/getImage";

if (!config.projectId) {
  throw Error(
    "The Project ID is not set. Check your environment variables."
  );
}
export const urlFor = source =>
  createImageUrlBuilder(config).image(source);

export const imageBuilder = source =>
  createImageUrlBuilder(config).image(source);



// Barebones lazy-loaded image component
 const ImageComponent = ({ value }) => {
  // const {width, height} = getImageDimensions(value)
  return (
    <Image
      {...GetImage(value)}
      blurDataURL={GetImage(value).blurDataURL}
      className= 'object-contain'
      sizes="(max-width: 800px) 100vw, 800px"
      alt={value.alt || " "}
      loading="lazy"
    />
  );
};



export const client = createClient(config);

