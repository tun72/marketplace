import { Pagination, message } from "antd";
import moment from "moment";

import { manageProducts } from "../../services/apiAdmin";
import { useState } from "react";
import { useProductContext } from "../../context/ProductContext";

function Products() {
  const {
    products,
    error,
    dispatch,
    currentPage,
    totalProducts,
    pendingProducts,
    fetchProducts,
  } = useProductContext();

 

  const [isLoadingManage, setIsLoadingManage] = useState(false);
  if (error) {
    message.error(error);
    dispatch({ type: "rejected", payload: "" });
  }

  function changePage(page) {
    dispatch({ type: "products/page", payload: page });
  }

  async function handelManageProduct(id, key) {
    try {
      setIsLoadingManage(true);
      const data = await manageProducts(id, key);
      if (data.isSuccess) {
        message.success(data.message);
        fetchProducts();
      }
    } catch (err) {
      message.error(err.message);
    } finally {
      setIsLoadingManage(false);
    }
  }

  return (
    <section>
      <h1 className=" text-3xl font-semibold my-2">Products List</h1>
      {pendingProducts ? (
        <p className="text-blue-500 font-bold">Loading...</p>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                  Seller
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
              {products.map((product) => (
                <tr className="bg-white border-b " key={product._id}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left"
                  >
                    {product.name}
                  </th>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{product.userId.name}</td>
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
                    {product.status === "approve" ? (
                      <button
                        disabled={isLoadingManage}
                        type="button"
                        className="font-medium text-blue-600 hover:underline me-4"
                        onClick={() => {
                          handelManageProduct(product._id, "rollback");
                        }}
                      >
                        Roll Back
                      </button>
                    ) : (
                      <button
                        disabled={isLoadingManage}
                        type="button"
                        className="font-medium text-blue-600 hover:underline me-4"
                        onClick={() => {
                          handelManageProduct(product._id, "approve");
                        }}
                      >
                        Approve
                      </button>
                    )}
                    {product.status === "reject" ? (
                      <button
                        disabled={isLoadingManage}
                        type="button"
                        className="font-medium text-red-600 hover:underline me-4"
                        onClick={() => {
                          handelManageProduct(product._id, "rollback");
                        }}
                      >
                        Roll Back
                      </button>
                    ) : (
                      <button
                        disabled={isLoadingManage}
                        type="button"
                        className="font-medium text-red-600 hover:underline me-4"
                        onClick={() => {
                          handelManageProduct(product._id, "reject");
                        }}
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!pendingProducts && !products.length && (
            <p>No proudcts added yet.</p>
          )}
        </div>
      )}

      <div className="flex justify-end my-10">
        <Pagination
          current={currentPage}
          total={totalProducts}
          onChange={changePage}
          defaultPageSize={8}
        />
      </div>
    </section>
  );
}

export default Products;
