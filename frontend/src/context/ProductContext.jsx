import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { getAllProducts } from "../services/apiAdmin";

const initialState = {
  products: [],
  currentPage: 1,
  totalPages: 0,
  totalProducts: 0,
  isLoading: false,
 
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: action.payload };
    case "rejected":
      return { ...state, error: action.payload };
    case "products/page":
      return { ...state, currentPage: action.payload };
    case "products/loaded":
      return {
        ...state,
        products: [...action.payload.products],
        currentPage: action.payload.currentPage,
        totalProducts: action.payload.totalProducts,
      };
    default:
      return { ...state };
  }
}
const ProductContext = createContext();
export function ProductProvider({ children }) {
  const [{ products, currentPage, totalProducts, isLoading, error }, dispatch] =
    useReducer(reducer, initialState);

  const fetchProducts = useCallback(
    async function fetchProducts() {
      try {
        dispatch({ type: "loading", payload: true });
        const data = await getAllProducts(currentPage);
        dispatch({ type: "products/loaded", payload: data });
      } catch (err) {
        return dispatch({ type: "rejected", payload: err.message });
      } finally {
        dispatch({ type: "loading", payload: false });
      }
    },
    [currentPage]
  );

  useEffect(
    function () {
      fetchProducts();
    },
    [fetchProducts]
  );

  function getPendingProducts() {
    return products.filter((product) => product.status === "pending").length;
  }

  function getTotalSales() {
    return products.reduce((prev, product) => {
      return prev + Number(product.price);
    }, 0);

  }

  return (
    <ProductContext.Provider
      value={{
        products,
        currentPage,
        totalProducts,
        isLoading,
        error,
        getPendingProducts,
        getTotalSales,
        fetchProducts,
        dispatch,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);

  if (!context)
    throw new Error("Product context is use outSide of the components");
  return context;
}
