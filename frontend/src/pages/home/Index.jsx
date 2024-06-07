import { useEffect, useState } from "react";

import { getPublicProducts } from "../../services/apiPublic";
import { RotatingLines } from "react-loader-spinner";
import Card from "../../components/home/Card";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../store/slices/loaderSlice";
import Hero from "../../components/home/Hero";
import Filter from "../../components/home/Filter";
import { Pagination } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
function Index() {
  const isProcessing = useSelector((state) => state.reducer.loader.isLoading);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = searchParams.get("page");

  useEffect(() => {
    async function fetchProducts() {
      try {
        dispatch(setIsLoading(true));
        const data = await getPublicProducts(page);

        console.log(data);
        if (data.isSuccess) {
          setProducts(data.products);
          setCurrentPage(data.currentPage);
          setTotal(data.totalProducts);
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setIsLoading(false));
      }
    }

    fetchProducts();
  }, [dispatch, page]);

  function handlePagination(page) {
    console.log(page);
    navigate(`/?page=${page}`);
  }
  return (
    <section>
      <Hero setProducts={setProducts} />
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
          <div className=" grid lg:grid-cols-3 gap-4 max-w-6xl mx-auto grid-cols-1">
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
            <Pagination
              defaultPageSize={6}
              current={currentPage}
              total={total}
              onChange={handlePagination}
            />
          </div>
          <div className="my-10 text-sm font-medium text-center text-blue-600">
            Make with love by ttm X code Hub@2023
          </div>
        </>
      )}
    </section>
  );
}

export default Index;
