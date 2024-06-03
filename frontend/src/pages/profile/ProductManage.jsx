import { Tabs } from "antd";
import ProductFrom from "../../components/productManage/ProductFrom";

function ProductManage({ manageTabKey }) {
  const items = [
    {
      key: "1",
      label: "Product Details",
      children: <ProductFrom />,
    },
  ];
  return (
    <section>
      <Tabs defaultActiveKey={manageTabKey} items={items} />
    </section>
  );
}

export default ProductManage;
