import {createClient} from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import { config } from "./config";
import { PortableText as PortableTextComponent } from "@portabletext/react";
import GetImage from "../utils/getImage";
import Image from "next/image";


if (!config.projectId) {
  throw Error(
    "The Project ID is not set. Check your environment variables."
  );
}
export const urlFor = source =>
  createImageUrlBuilder(config).image(source);

export const imageBuilder = source =>
  createImageUrlBuilder(config).image(source);

const ImageComponent = ({value}) => {
  return <Image 
  {...GetImage(value)}
  style = {{ maxWidth: "100%", height: "auto" , marginBottom: '1.3rem'}}
  className = "object-fit mt-10"
  alt = {value.alt || " "}
  loading="lazy"
  />
}
  

const components = {
  types: {
    image: ImageComponent,
    code: props => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre> )
  },
 block : {
  h1: ({children}) => <h1 className = "text-2xl font-bold my-9">{children}</h1>,
  h2: ({children}) => <h2 className = "text-xl font-bold mb-5 mt-5">{children}</h2>,
  li: ({children}) => <li className = "ml-4 list-disc">{children}</li>
 } , 

  marks: {
    center: props => (
      <div className="text-center">{props.children}</div>
    ),
    highlight: props => (
      <span className="font-bold text-brand-primary">
        {props.children}
      </span>
    ),
    link: props => (
      <a href={props?.value?.href} className= "text-blue-500 hover:underline">
        {props.children}
      </a>
    )
  }
};

export const PortableText = props => (
  <PortableTextComponent components={components} {...props} />
);

export const client = createClient(config);

