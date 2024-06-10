import { createSlice } from "@reduxjs/toolkit";
import { getProducts as getProductsAPI } from "../../services/apiProduct";
import { message } from "antd";

const initialState = {
  products: [],
  activeTabKey: "1",
  manageTabKey: "1",
  editProductId: null,
  isLoading: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.products = action.payload;
    },
    addNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    updateTabKey: (state, action) => {
      state.activeTabKey = action.payload;
    },

    updateManageTabKey: (state, action) => {
      state.manageTabKey = action.payload;
    },

    updateEditProductId: {
      prepare(productId, manageKey) {
        return { payload: { productId, manageKey } };
      },
      reducer(state, action) {
        state.editProductId = action.payload.productId;
        state.manageTabKey = action.payload.manageKey;
      },
    },

    reset: (state) => {
      state.activeTabKey = "1";
      state.manageTabKey = "1";
      state.editProductId = null;
      state.isLoading = false;
    },

    loading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export function loadProducts() {
  return async function (dispatch, getState) {
    dispatch({ type: "product/loading", payload: true });
    try {
      const data = await getProductsAPI();

      if (data.isSuccess) {
        dispatch({
          type: "product/addProducts",
          payload: data.products,
        });
      }
    } catch (e) {
      message.error(e.message);
    } finally {
      dispatch({ type: "product/loading", payload: false });
    }
  };
}


export const {
  loading,
  updateTabKey,
  addProducts,
  updateManageTabKey,
  updateEditProductId,
  reset,
} = productSlice.actions;
export const getProducts = (state) => state.reducer.product;
export default productSlice.reducer;
