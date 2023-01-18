import { client , urlFor , PortableText} from '../../lib/sanity' ;
import Navbar from '../../components/Navbar' ; 
import Head from "next/head";
import {useForm , SubmitHandler} from "react-hook-form" ; 
import { useState } from 'react';

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

 return <>
 <Head >
    <title>Yabx || Post</title>
    <meta name="description" content= {post.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
 </Head>

    <main>
        <Navbar />
        
             <div className = "mx-auto" >
            { post[0]?.mainImage && (<img src= {urlFor(post[0]?.mainImage).url()}
                alt = "main picture" 
                className=' md:max-w-[90%]  lg:hidden mx-auto object-cover'/>
                )}
             </div>

            <article className = "lg:max-w-5xl mx-auto px-10 lg:px-5 md:px-20">
                <h1 className = "lg:text-5xl md:text-4xl md:mb-4 lg:mb-6 text-3xl text-bold mt-10 mb-3">{post[0].title}</h1>
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
                    {post[0].body && <PortableText value={post[0].body} />}
                </div>
            </article>    
            
            <hr className='max-w-2xl mx-auto border border-orange-500 mb-3 mt-5'></hr>
                        {
                submitted ? <p className='text-green-500 font-bold text-xl'>Thanks! , your comment has been submitted </p>
       :  <form onSubmit= {handleSubmit(onSubmit)} className='flex flex-col p-5 mt-5 mb-5 max-w-2xl mx-auto'>
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
                    focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-orange-400' placeholder='JohnAppleseed304@gmail.com' type = "email"></input>
                    
                {
                    errors.email && (<span className='text-red-500 text-sm mx-3'> Your email is required*</span>)
                }
                </label>

                 <label className='block mb-5 mt-3'>
                    <span className='text-gray-600'>Comment</span>
                    <textarea {...register("comment", {required: true})} className='shadow border rounded py-2 px-3 form-textarea mt-2 block w-full 
                    focus:ring-2 mx-3 focus:ring-opacity-50 focus:ring-orange-400 focus:outline-none' type = "text"  rows= {8}/>
                    {
                    errors.comment && (<span className='text-red-500 text-sm'>Comment is required sha*</span>)
                }
                </label>

                <input type = "submit" className='shadow cursor-pointer hover:bg-teal-500 duration hover:duration-500 block w-full mt-3 p-2 rounded-lg bg-orange-500 text-slate-100' />

            </form>     }     
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
        fallback: true,  
     };
}

export default Post
