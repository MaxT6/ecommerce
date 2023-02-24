import { Toaster } from 'react-hot-toast';

import '@/styles/globals.css'


import { Layout } from '@/components'; //we will be passing the current component page the user is accessing to the Layout component by using the children prop in Layout
import { StateContext } from '@/context/StateContext';
 


export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}
