import '@/styles/globals.css'
import { Layout } from '@/components'; //we will be passing the current component page the user is accessing to the Layout component by using the children prop in Layout

export default function App({ Component, pageProps }) {
  return (
    <Layout>
     <Component {...pageProps} />
    </Layout>
  )
}
