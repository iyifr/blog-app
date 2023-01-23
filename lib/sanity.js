import {createClient} from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import { config } from "./config";
import { PortableText as PortableTextComponent } from "@portabletext/react";
import GetImage from "../utils/getImage";
import Image from "next/image";
//import getYouTubeId from 'get-youtube-id';
//import LiteYouTubeEmbed from 'react-lite-youtube-embed'
// import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'



if (!config.projectId) {
  throw Error(
    "The Project ID is not set. Check your environment variables."
  );
}
export const urlFor = source =>
  createImageUrlBuilder(config).image(source);

export const imageBuilder = source =>
  createImageUrlBuilder(config).image(source);





export const client = createClient(config); 

