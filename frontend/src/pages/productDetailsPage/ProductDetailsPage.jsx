import { useParams } from "react-router-dom";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import ProductDetails from "../../components/products/ProductDetails";
import SuggestedProduct from "../../components/products/SuggestedProduct";
import { useEffect, useState } from "react";
import {  useSelector } from "react-redux";

const ProductDetailsPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");
  const allProducts = useSelector((state) => state.product.allproducts);

  useEffect(() => {
    const product = allProducts.find((item) => item._id === productName);
    setData(product);
  }, [productName, allProducts]);

  return (
    <div>
      <Header />
      {data && <ProductDetails data={data} />}
      {data && <SuggestedProduct data={data} />}
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
