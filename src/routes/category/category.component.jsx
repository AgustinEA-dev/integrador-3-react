import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Toaster } from "sonner";

import ProductCard from "../../components/product-card/product-card.component";
import Footer from "../../components/footer/footer.component";

import { CategoriesContext } from "../../contexts/categories.context";

import "./category.styles.scss";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <Toaster position="bottom-center" richColors />
      <div className="category-products-container">
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
      <Footer />
    </>
  );
};

export default Category;
