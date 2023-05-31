import { useParams } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import ProductDetails from "../../components/products/ProductDetails";
import SuggestedProduc from "../../components/products/SuggestedProduct.jsx"
import { useEffect, useState } from "react";
import { productData } from "../../static/data";

const ProductDetailsPage = () => {
  const { name } = useParams();
  const [data, setData] = useState();
  const productName = name.replace(/-/g, " ");


  useEffect(() => {
    const data =productData.find((item) => item.name === productName);
    setData(data);
  }, [name]);
  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      {data && <SuggestedProduc data={data} />}
      <Footer />
    </div>
  );
};
export default ProductDetailsPage;
