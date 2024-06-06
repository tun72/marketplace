import { useState } from "react";
import { deleteProduct } from "../../services/apiProduct";
import { useDispatch } from "react-redux";
import { loadProducts } from "../../store/slices/productSlice";

function ProductDelete({ productId }) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  async function deleteHandler() {
    try {
      setIsLoading(true);
      const data = await deleteProduct(productId);
      if (data.isSuccess) {
        dispatch(loadProducts());
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
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
