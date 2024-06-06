import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import ProductDelete from "../../components/productManage/ProductDelete";
import {
  getProducts,
  loadProducts,
  updateEditProductId,
  updateTabKey,
} from "../../store/slices/productSlice";

function Products() {
  const { products, isLoading } = useSelector(getProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts());

  }, [dispatch]);

  function uploadHandler(id) {
    dispatch(updateEditProductId(id, "2"));
    dispatch(updateTabKey("2"));
  }

  function editHandler(id) {
    
    dispatch(updateEditProductId(id, "1"));
    dispatch(updateTabKey("2"));
  }

 

  return (
    <section>
      <h1 className=" text-3xl font-semibold my-3  text-blue-500">
        Products List
      </h1>
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="relative overflow-x-auto shadow-xl sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center ">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Sell Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {(products?.length || 0 ) > 0 ? (
                <>
                  {products?.map((product) => (
                    <tr className="bg-white border-b " key={product._id}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left"
                      >
                        {product.name}
                      </th>
                      <td className="px-6 py-4">{product.category}</td>
                      <td className="px-6 py-4">
                        {moment(product.createdAt).format("L")}
                      </td>
                      <td className="px-6 py-4">
                        {product.status === "pending" && (
                          <span className=" bg-yellow-400 text-xs p-1 rounded-md text-white">
                            {product.status}
                          </span>
                        )}{" "}
                        {product.status === "approve" && (
                          <span className="bg-green-400 text-xs p-1 rounded-md text-white">
                            {product.status}
                          </span>
                        )}
                        {product.status === "reject" && (
                          <span className="bg-red-400 text-xs p-1 rounded-md text-white">
                            {product.status}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          className="font-medium text-green-600 hover:underline me-4"
                          onClick={() => {
                            uploadHandler(product._id);
                          }}
                        >
                          Upload
                        </button>
                        <button
                          type="button"
                          className="font-medium text-blue-600 hover:underline me-4"
                          onClick={() => {
                            editHandler(product._id);
                          }}
                        >
                          Edit
                        </button>
                        <ProductDelete
                          productId={product._id}
                          fetchProducts={() => {}}
                        />
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <p>No proudcts added yet.</p>
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Products;
