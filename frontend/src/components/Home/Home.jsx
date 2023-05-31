import Header from '../../components/layout/Header';
import Hero from "../Route/Hero/Hero"
import Categories from '../Route/categories/Categories';
import BestDeals from '../Route/bestDeals/BestDeals'
import FeaturedProducts from '../Route/featuredProductss/FeaturedProducts';
import Events from '../Route/events/Events';
import Sponserd from '../Route/sponserd/Sponserd';
import Footer from '../layout/Footer';
const Home = () => {
  return (
    <div>
        <Header activeHeading ={1}/>
        <Hero/>
        <Categories/>
        <BestDeals/>
        <Events/>
        <FeaturedProducts/>
        <Sponserd/>
        <Footer/>
    </div>
  )
}
export default Home