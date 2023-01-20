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
  style = {{ marginBottom: '1.3rem'}}
  className = "object-cover mt-10 max-w-xl"
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
  h1: ({children}) => <h1 className = "text-4xl font-bold my-9">{children}</h1>,
  h2: ({children}) => <h2 className = "text-2xl text-blue-200 font-bold mb-5 mt-5">{children}</h2>,
  h3: ({children}) => <h2 className = "text-2xl text-blue-200 font-bold mb-5 mt-5">{children}</h2>,
  li: ({children}) => <li className = "ml-4 list-disc">{children}</li>,
  
 } , 

  marks: {
    center: props => (
      <div className="text-center">{props.children}</div>
    ),
    em: ({children}) => <em className = "tracking-wide text-xl font-bold italic" 
    style = {{color: "#ADE628"}}>{children}</em>,
    highlight: props => (
      <span className="font-bold text-brand-primary">
        {props.children}
      </span>
    ),
    link: ({value, children}) => (
      <a href={value?.href} className= "hover:underline" style = {{color: "blue"}}>
        {children}
      </a>
    )
    
  }
};

export const PortableText = props => (
  <PortableTextComponent components={components} {...props} />
);

export const client = createClient(config);

