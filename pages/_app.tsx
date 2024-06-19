import "bootstrap/dist/css/bootstrap.css"; //Import Bootstrap CSS
import '../styles/globals.css'
import basicDetai from '../styles/basicDetail.module.css'
import { store } from '../store'
import { Provider } from 'react-redux'
import '../styles/Fonts.css'
import type { AppProps } from 'next/app'
import { PersistGate } from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
if (typeof window !== "undefined") {
  // console.log("This is client side window")
  //Enable Bootstrap JS Functions
  require("bootstrap/dist/js/bootstrap.bundle.min.js");
}

let persistor=persistStore(store)
console.log(persistor,'persisitions')
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <Component {...pageProps} />
      {/* </PersistGate> */}
    </Provider>

  )
}

export default MyApp
