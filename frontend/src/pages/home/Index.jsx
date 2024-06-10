import { useCallback, useEffect, useState } from "react";

import { getPublicProducts } from "../../services/apiPublic";
import { RotatingLines } from "react-loader-spinner";
import Card from "../../components/home/Card";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../store/slices/loaderSlice";
import Hero from "../../components/home/Hero";
import Filter from "../../components/home/Filter";
import { Pagination } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSaveProducts } from "../../services/apiProduct";
import { getUser } from "../../store/slices/userSlice";
function Index() {
  const isProcessing = useSelector((state) => state.reducer.loader.isLoading);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  let [searchParams, setSearchParams] = useSearchParams();
  let [savedProducts, setSavedProducts] = useState([]);

  const user = useSelector(getUser);
  const navigate = useNavigate();
  const page = searchParams.get("page");
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const userId = user?.userId || 0;

  const fetchProducts = useCallback(
    async function () {
      try {
        dispatch(setIsLoading(true));

        const fetchArray = [
          getPublicProducts(page, search, category),
          userId ? getSaveProducts() : () => {},
        ];

        const data = await Promise.all(fetchArray);

        if (data[0].isSuccess) {
          setProducts(data[0].products);
          setCurrentPage(data[0].currentPage);
          setTotal(data[0].totalProducts);
        }

        if (data[1].isSuccess) {
          setSavedProducts(data[1].savedProducts);
          console.log(data[1].savedProducts);
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, page, userId, search, category]
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  function handlePagination(page) {
    navigate(
      `/?page=${page} ${search ? "?search=" + search : ""} ${
        category ? "?category=" + category : ""
      }`
    );
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
          {!!products.length && (
            <>
              <div className=" grid lg:grid-cols-3 gap-4 max-w-6xl mx-auto grid-cols-1">
                {products.map((product) => (
                  <Card
                    product={product}
                    key={product._id}
                    fetchProducts={fetchProducts}
                    savedProducts={savedProducts}
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
          {!products.length && (
            <p className="text-red-500 font-bold text-center">
              No Products Found
            </p>
          )}
        </>
      )}
    </section>
  );
}

export default Index;
