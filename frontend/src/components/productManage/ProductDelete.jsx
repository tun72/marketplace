import { useState } from "react";
import { deleteProduct } from "../../services/apiProduct";
import { useDispatch } from "react-redux";
import {
  loadProducts,
  loading as setProductLoading,
} from "../../store/slices/productSlice";
import { message } from "antd";

function ProductDelete({ productId }) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  async function deleteHandler() {
    try {
      setIsLoading(true);
      dispatch(setProductLoading(true));
      const data = await deleteProduct(productId);
      if (data.isSuccess) {
        dispatch(loadProducts());
        message.success("Product was deleted ✅")
      }
    } catch (err) {
      message.err("DELETE FAILED ❌")
    } finally {
      setIsLoading(false);
      dispatch(setProductLoading(false));
    }
  }
  return (
    <button
      type="button"
      className="font-medium text-red-500 hover:underline"
      onClick={deleteHandler}
      disabled={isLoading}
    >
      Delete
    </button>
  );
}

export default ProductDelete;
