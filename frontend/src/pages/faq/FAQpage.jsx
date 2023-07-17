import { useEffect } from "react"
import Footer from "../../components/layout/Footer"
import Header from "../../components/layout/Header"
import Faq from "./Faq"
const FAQpage = () => {

  useEffect(()=>{
    window.scrollTo(0,0);
  })
  return (
    <div>
        <Header activeHeading={5}/>
        <Faq/>
        <Footer/>
    </div>
  )
}
export default FAQpage