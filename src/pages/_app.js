import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Promo from "@/components/Promo";
import Suscribe from "@/components/Suscribe";
import { AppProvider } from "@/context/AppContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return<div className="overflow-hidden">
  <AppProvider>
    <div className="flex flex-col-reverse lg:flex-col">
    <Promo/>
    <Navbar/>
    </div>
      
    <Component {...pageProps} />
    <Suscribe/>
    <Footer/>
  </AppProvider>
  </div>
  
}
