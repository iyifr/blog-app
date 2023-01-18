import '../styles/globals.css'
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/700.css";
import NextNProgress from 'nextjs-progressbar'

export default function App({ Component, pageProps }) {
  return <>
  <NextNProgress color = "#ffa500"/>
  <Component {...pageProps} />
  </> 
}
