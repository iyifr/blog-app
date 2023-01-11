import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from "../components/Navbar";


export default function Home() {
  return (
    <div className='max-w-7xl mx-auto'>
      <Head>
        <title>Yabx</title>
        <meta name="description" content="A blog for weird people to feel less.. weird" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

      </Head>

      <>
        <Navbar />
        <div className='bg-gradient-to-r from-amber-300  via orange-300 to-amber-400 p-5 flex items-center justify-around'>
          <div className=''>
           <h1 className=' text-6xl mx-auto mt-5 mb-5'> Heard.</h1> 
            <h1 className=' text-6xl mx-auto mt-5 mb-5 ml-2'>  Empowered. </h1> 
             <h1 className=' text-6xl mx-auto mt-5 mb-5 ml-7'>  Challenged.</h1> 
            </div>

          <div className='hidden md:inline-flex md:w-48 hover:animate-bounce' > 
            <img src='https://media0.giphy.com/media/9JyVS1drH2NoHu0qVo/giphy.gif' alt='yinyang'/>
          </div>
        </div>
          
      </>
    </div>
  )
}
