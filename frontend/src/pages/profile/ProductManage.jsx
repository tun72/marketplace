import { Tabs } from "antd";
import ProductFrom from "../../components/productManage/ProductFrom";
import Upload from "../../components/productManage/Upload";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  updateManageTabKey,
  updateTabKey,
} from "../../store/slices/productSlice";

function ProductManage() {
  const { editProductId, manageTabKey } = useSelector(getProducts);
  const dispatch = useDispatch();
  console.log(manageTabKey);
  const items = [
    {
      key: "1",
      label: "Product Details",
      children: <ProductFrom />,
    },
    editProductId
      ? {
          key: "2",
          label: "Upload",
          children: <Upload />,
        }
      : null,
  ];
  return (
    <section>
      <Tabs
        activeKey={manageTabKey}
        items={items}
        onChange={(key) => dispatch(updateManageTabKey(key))}
      />
    </section>
  );
}

export default ProductManage;
