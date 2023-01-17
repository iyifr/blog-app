import Head from 'next/head'
import { client , urlFor} from '../lib/sanity';
import Navbar from "../components/Navbar";
import Link from 'next/link';




export default function Home({posts}) {
  
  return (
    <div className='max-w-8xl mx-auto'>
      <Head>
        <title>Yabx</title>
        <meta name="description" content="A blog for weird people to feel less.. weird" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

      </Head>

      <>
        <Navbar />
        <div className='bg-gradient-to-r from-green-400 to-blue-500 p-4 flex justify-around 
          md:text-7xl text-4xl lg:text-7xl sm:text-4xl space-x-3 -mt-6'>
          <div className=''>
           <h1 className=' mt-5 mb-5 text-slate-900'> Heard.</h1> 
            <h1 className=' mt-5 mb-5 ml-5 text-slate-900'>  Empowered. </h1> 
             <h1 className=' mt-5 mb-5 ml-11 text-slate-900'>  Invigorated.</h1> 
            </div>

          <div className=' inline-flex hover:animate-bounce cursor-pointer' > 
            <img src='https://media0.giphy.com/media/9JyVS1drH2NoHu0qVo/giphy.gif' alt='yinyang' className='object-contain w-36  lg:w-48'/>
          </div>
        </div>
          
      </>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-7 p-2 md:p-6 mt-8'>
        {
          posts.map(post => {
            return <Link key={post._id} href = {`/posts/${post.slug.current}`}>
              <div className = "group cursor-pointer border rounded-lg overflow-hidden">
               <img src= {urlFor(post?.mainImage).url()}
                alt = "main picture" 
                className='w-full h-60 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200 ease-in-out'/>
                <div className='flex space-y-2 justify-between p-5 bg-white'>

                <div>
                  <h1 className='text-slate-800 text-3xl font-bold mb-3'>{post.title}</h1>
                  <p className='text-xs'>{post.description} by {post.author.name}</p>
                </div>
                  
                  <img src= {urlFor(post.author.image).url()} 
                  alt = "author image "
                  className = "w-12 h-12 rounded-full" />

              </div>

              </div>

              
              </Link>
            })
        }
      </div>
    </div>
  )

 
}

   export const getServerSideProps = async ()=> {
     const query = `*[_type == "post"] {
        _id ,
        title,
      author-> {
        name ,
        image
      },
          description , 
          mainImage,
          slug
      }`;
      const posts = await client.fetch(query);
      
      return {
        props : {
           posts 
        },

      }
  }