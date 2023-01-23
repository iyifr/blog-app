import { client , urlFor} from '../../lib/sanity' ;
import Navbar from '../../components/Navbar' ; 
import Head from "next/head";
import {useForm} from "react-hook-form" ; 
import { useState } from 'react';
import {BsHandThumbsDown , BsHandThumbsUp} from "react-icons/bs";
import PortableText from 'react-portable-text';
import getYoutubeId from 'get-youtube-id'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'



function Post({post}) {
 
 
 const [submitted , setSubmitted] = useState(false)
    const {
        register , handleSubmit ,  formState: { errors},
    } = useForm();
    
    const onSubmit = async (data) => {
        await fetch('/api/createComment' , 
       { method: "POST",
    body: JSON.stringify(data)}).then(() => setSubmitted(true)).catch((error) => console.log(error) , setSubmitted(false))
    };

    const title = post[0].title;
    const imageUrl = urlFor(post[0]?.mainImage).url()

 return <>
 <Head >
    <title>Yabx || {title}</title>
    <meta name="description" content= {post[0].description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://images-platform.99static.com//TNbMwuUlICajzNyWw9Prp2nuNvc=/204x202:755x753/fit-in/500x500/99designs-contests-attachments/96/96205/attachment_96205491" />
        <meta name = "og:title" content = {post ? title : "Blog post on Yabx blog"}/>
        <meta name='og:image' content= {imageUrl}/>
 </Head>

    <main>
        <Navbar />
        
             <div className = "mx-auto" >
            { post[0]?.mainImage && (<img src= {urlFor(post[0]?.mainImage).url()}
                alt = "main picture" 
                className=' md:max-w-[90%] sm:h-[45rem] mx-auto object-cover'/>
                )}
             </div>

            <article className = "lg:max-w-5xl mx-auto px-10 lg:px-5 md:px-20">
                <h1 className = "lg:text-5xl md:text-4xl md:mb-4 lg:mb-6 text-3xl text-bold mt-10 mb-3">{title}</h1>
                <h2 className='text-xl font-light text-gray-500 mb-2'>{post[0].description}</h2>
                
                <div className='space-y-3 flex items-center space-x-2'>
                    <img src= {urlFor(post[0]?.author.image).url()} 
                     alt= "author" 
                     className='rounded-full w-10 h-10 object-cover mt-3'  />
                     <p className='font-thin text-gray-500  text-sm'>Blog post by 
                     <span className='text-emerald-500 mx-1'>{post[0].author.name}</span>
                     - Published at {new Date(post[0]._createdAt).toLocaleString()}
                     </p>
                </div>

                <div className= "mt-10">
                    {post[0].body && <PortableText
                    dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                    projectId = {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
                    content={post[0].body} 
                    serializers= {{
                        h1: ({children}) => <h1 className = "text-4xl font-bold my-9">{children}</h1>,
                        h2: ({children}) => <h2 className = "text-3xl text-zinc-900 font-bold mb-5 mt-5">{children}</h2>,
                        h3: ({children}) => <h2 className = "text-2xl text-zinc-900 font-bold mb-5 mt-5">{children}</h2>,
                        li: ({children}) => <li className = "ml-4 list-disc">{children}</li>,
                        link: ({href , children}) => {
                            <a href= {href} className = "text-blue-500 hover:underline" >{children}</a>
                        } ,
                            em: ({children}) => <em className = "tracking-wide text-xl font-bold italic" 
                            style = {{color: "#ADE628"}}>{children}</em> ,
                            youtube: (props) => {
                                const { url } = {...props}
                                const id = getYoutubeId(url) 
                                return (<div className = "p-5 mx-auto max-w-3xl mt-4 mb-4">
                                    <hr className = 'max-w-3xl mx-auto border border-pink-500 mb-3 mt-3' ></hr>
                                    <LiteYouTubeEmbed id = {id} className = 'mx-auto max-w-2xl'/>
                                    <hr className = 'max-w-3xl mx-auto border border-pink-500 mb-3 mt-3' ></hr>
                                    </div>)
                            }
                     
                    }}/>}
                </div>
            </article>    
            
            <hr className='max-w-2xl mx-auto border border-orange-500 mb-3 mt-5'></hr>
                        {
                submitted ? <div className='flex flex-col p-10 my-10 bg-orange-400 max-w-2xl text-white mx-auto'>
                    <h1 className='font-bold text-2xl'>Thank you for commenting!</h1>
                    <p className=''>Your comment will be shown when it is approved by the moderator</p>

                </div>       :  <form onSubmit= {handleSubmit(onSubmit)} className='flex flex-col p-5 mt-5 mb-5 max-w-2xl mx-auto'>
                <h3 className='text-sm text-orange-500'>What are your thoughts?</h3>
                <h4 className='text-xl text-slate-500 font-bold animate-bounce mt-3'>Leave a comment below!</h4>
                <hr className='py-3 mt-2 border-slate-300'></hr>

                <input {...register("_id")}
                type = "hidden" 
                name = "_id" 
                value={post[0]._id}/>

                <label className='block mb-5 mt-3' >
                    <span className='text-gray-600'>Name</span>
                    <input {...register("name", {required: true})} className='shadow border rounded p-3 lg:mx-3 form-input mt-2 block w-full 
                    focus:outline-none  focus:ring-2 focus:ring-opacity-50 focus:ring-orange-400' placeholder='John Appleseed' type = "text"></input>
                    {
                    errors.name && (<span className='text-red-500 text-sm mx-3'> Your name is required*</span>)
                }
                </label>

                 <label className='block mb-5 mt-3'>
                    <span className='text-gray-600'>Email</span>
                    <input {...register("email", {required: true})} className='shadow border rounded p-3 lg:mx-3 form-input mt-2 block w-full 
                    focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-orange-400' placeholder='kaytranada304@gmail.com' type = "email"></input>
                    
                {
                    errors.email && (<span className='text-red-500 text-sm mx-3'> Your email is required*</span>)
                }
                </label>

                 <label className='block mb-5 mt-3'>
                    <span className='text-gray-600'>Comment</span>
                    <textarea {...register("comment", {required: true})} className='shadow border rounded py-2 px-3 form-textarea mt-2 block w-full 
                    focus:ring-2 mx-1 focus:ring-opacity-50 focus:ring-orange-400 focus:outline-none' type = "text"  rows= {8}/>
                    {
                    errors.comment && (<span className='text-red-500 text-sm'>Leave a comment*</span>)
                }
                </label>

                <input type = "submit" className='shadow cursor-pointer hover:bg-teal-500  duration hover:duration-500 block w-full mt-3 p-2 rounded-lg bg-orange-500 text-slate-100' />

            </form>     }  

             
            <h1 className='font-bold text-2xl dark:text-slate-200 max-w-2xl mx-auto opacity-50 text-center'>COMMENTS</h1>
            
               <div className='flex flex-col mt-5 max-w-2xl lg:max-w-5xl mx-auto'>
               
                { post[0].comments.map(comment => {
                    return <div key={comment.post._id} className= "flex flex-col mx-12">
                    {comment? 
                    <div className='border-b-2 first:mt-4 rounded 
                     shadow-orange-200 shadow-lg mb-4 p-5 cursor hover:animate-pulse'>
                    
                    <h4 className='text-lg uppercase font-bold tracking-wide text-slate-600'>{comment.name}</h4> 
                    <p>{comment.comment}</p>
                    <p className='text-sm text-gray-300 mt-2'>{new Date(comment._createdAt).toLocaleString("En-us")}</p>
                    <div className='flex flex-row space-x-4 mt-3 '>
                         <BsHandThumbsUp className='text-green-500 active:fill-green-200 active:animate-bounce cursor-pointer' role="button"/>
                        <BsHandThumbsDown className='text-red-500 focus:bg-red-500 active:animate-bounce cursor-pointer' />
                       
                    </div>
                    </div>
                

                : "No comments yet"}
                    </div>
                })}
               </div>
            
    </main>
 </>
}

export async function getStaticProps({params}) {
    const query =  `*[_type == "post" && slug.current == $slug] {
  
  _id ,
    _createdAt,
    title , 
    author-> {
      name , 
      image
    },
     "comments" : *[
        _type == "comment" && 
        post._ref == ^._id && 
        approved==true
     ],
    description ,
    mainImage,
    slug,
    body
}`
    const post = await client.fetch(query , {slug: params?.slug})

    if(!post) {
        return {
            notFound
        }
    } 

    return {
        props: {
            post,
        },
        revalidate: 120 , //updates the page every 2 minutes a user spends on the site
    }
}

export async function getStaticPaths() {
    const query = `*[_type == "post"] {
        _id, 
        slug { 
            current
        }
}`
    const allPosts = await client.fetch(query) ; 
     return {
        paths : allPosts?.map(page => ({
            params: {
                slug: page.slug.current
            },
        })) || [] , 
        fallback: "blocking",  
     };
}

export default Post

  