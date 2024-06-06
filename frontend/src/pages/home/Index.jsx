
import { useEffect, useState } from "react";

import { getPublicProducts } from "../../services/apiPublic";
import { RotatingLines } from "react-loader-spinner";
import Card from "../../components/home/Card";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../store/slices/loaderSlice";
import Hero from "../../components/home/Hero";
import Filter from "../../components/home/Filter";
function Index() {
  const isProcessing = useSelector((state) => state.reducer.loader.isLoading);
  const dispatch  = useDispatch()
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        dispatch(setIsLoading(true));
        const products = await getPublicProducts();
        setProducts(products);
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setIsLoading(false));
      }
    }

    fetchProducts();
  }, [dispatch]);
  return (
    <section>
      <Hero setProducts={setProducts}  />
      <Filter setProducts={setProducts} />
      {isProcessing ? (
        <div className=" flex items-center justify-center">
          <RotatingLines
            strokeColor="#3b82f6"
            strokeWidth="5"
            animationDuration="0.75"
            width="50"
            visible={isProcessing}
          />
        </div>
      ) : (
        <>
          <div className=" grid grid-cols-3 gap-4 max-w-6xl mx-auto">
            {products.map((product) => (
              <Card
                product={product}
                key={product._id}
                // savedProducts={savedProducts}
                // getAllProducts={getAllProducts}
              />
            ))}
          </div>
          <div className=" flex mt-5 my-10 justify-end max-w-6xl mx-auto">
            {/* <Pagination
              current={currentPage}
              total={totalPages * 6}
              onChange={handlePagination}
            /> */}
          </div>
          <div className="my-10 text-sm font-medium text-center text-blue-600 pb-10">
            Make with love by ttm X code Hub@2023
          </div>
        </>
      )}
    </section>
  );
}

export default Index;
