import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Navbar from "../components/Navbar"


export default function Home() {
  return (
    <>
      <Head>
        <title>Sonny Blog</title>
        <meta name="description" content="A blog for weird people to feel less.. weird" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />

      </Head>

      <>
        <Navbar />
        <div className='flex flex-col justify-center py-2'>
          <h1 style={{fontSize: "4rem"}}>Iyimide</h1>
        </div>
          
      </>
    </>
  )
}
