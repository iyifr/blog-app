import { client , urlFor , PortableText} from '../../lib/sanity' ;
import Navbar from '../../components/Navbar' ; 
import Head from "next/head"

function Post({post}) {
    
 return <>
 <Head >
    <title>Yabx || Post</title>
    <meta name="description" content= {post.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
 </Head>

    <main>
        <Navbar />
        <div className='space-y-5'>
             <div className = "" >
            { post[0]?.mainImage && (<img src= {urlFor(post[0]?.mainImage).url()}
                alt = "main picture" 
                className='max-w-[100%] max-h-[60%] object-cover'/>
                )}
             </div>

            <article className = "max-w-3xl lg:max-w-5xl mx-auto p-5">
                <h1 className = "text-4xl text-bold mt-10 mb-3">{post[0].title}</h1>
                <h2 className='text-xl font-light text-gray-500 mb-2'>{post[0].description}</h2>
                
                <div className='space-y-3 flex items-center space-x-2'>
                    <img src= {urlFor(post[0]?.author.image).url()} 
                     alt= "author" 
                     className='rounded-lg w-10 h-10 object-cover mt-3'  />
                     <p className='font-thin text-gray-500  text-sm'>Blog post by 
                     <span className='text-emerald-500 mx-1'>{post[0].author.name}</span>
                     - Published at {new Date(post[0]._createdAt).toLocaleString()}
                     </p>
                </div>

                <div className= "mt-10">
                    {post[0].body && <PortableText value={post[0].body} />}
                </div>
            </article>    
            
            <hr className='max-w-2xl mx-auto border border-orange-500 mb-5 mt-5'></hr>
            
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
