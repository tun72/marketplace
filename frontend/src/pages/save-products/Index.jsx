import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../components/home/Card";
import { setIsLoading } from "../../store/slices/loaderSlice";
import { getSaveProducts } from "../../services/apiProduct";

function Index() {
  const isProcessing = useSelector((state) => state.reducer.loader.isLoading);
  const [savedProducts, setSavedProducts] = useState([]);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const fetchProducts = useCallback(
    async function () {
      try {
        dispatch(setIsLoading(true));
        const data = await getSaveProducts();

        console.log(data);
        if (data.isSuccess) {
          setSavedProducts(data.savedProducts);
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch]
  );
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <section>
      <div className="flex justify-between my-2">
        <h1 className="text-2xl  text-blue-600 font-bold my-4">
          Saved Product List
        </h1>
        <ArrowLeftIcon
          width={30}
          height={30}
          className="text-blue-600 cursor-pointer"
          onClick={() => navigate(-1)}
        />
      </div>
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
        <div className="grid lg:grid-cols-3 gap-4 max-w-6xl mx-auto grid-cols-1">
          {savedProducts && savedProducts.length > 0 && (
            <>
              {savedProducts.map((product) => (
                <Card
                  product={product.productId}
                  key={product._id}
                  saved={true}
                  fetchsavedProducts={fetchProducts}

                  //   getProducts={getProducts}
                />
              ))}
            </>
          )}
        </div>
      )}
      {savedProducts.length === 0 && !isProcessing && (
        <p className=" font-medium text-red-600 my-2">
          No product are not saved yet.
        </p>
      )}
    </section>
  );
}

export default Index;
