import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import ProductDetails from "../../components/products/ProductDetails";
import SuggestedProduct from "../../components/products/SuggestedProduct";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");
  const allProducts = useSelector((state) => state.product.allproducts);
  const { allEvents } = useSelector((state) => state.events);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  console.log(eventData);

  useEffect(() => {
    if (eventData !== null) {
      const product = allEvents.find((item) => item._id === productName);
      setData(product);
    } else {
      const product = allProducts.find((item) => item._id === productName);
      setData(product);
    }
  }, [productName, allProducts, allEvents]);

  return (
    <div>
      <Header />
      {data && <ProductDetails data={data} />}
      {data && !eventData && <SuggestedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
