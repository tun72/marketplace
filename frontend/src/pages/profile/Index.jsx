import { Tabs } from "antd";
import {
  BellAlertIcon,
  SquaresPlusIcon,
  SwatchIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import ProductManage from "./ProductManage";
function Index() {
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [manageTabKey, setManageTabKey] = useState("1");
  const items = [
    {
      key: "1",
      label: (
        <span className="flex items-start gap-2">
          <SwatchIcon width={20} />
          Products
        </span>
      ),
      children: <></>,
    },
    {
      key: "2",
      label: (
        <span className="flex items-start gap-2">
          <SquaresPlusIcon width={20} />
          Manage Product
        </span>
      ),
      children: <ProductManage manageTabKey={manageTabKey} />,
    },
    {
      key: "3",
      label: (
        <span className="flex items-start gap-2">
          <BellAlertIcon width={20} />
          Notifications
        </span>
      ),
      children: <></>,
    },
    {
      key: "4",
      label: (
        <span className="flex items-start gap-2">
          <UserIcon width={20} />
          Profile
        </span>
      ),
      children: <></>,
    },
  ];

  function onChangeHandler(key) {
    setActiveTabKey(key);
  }
  return (
    <section>
      <Tabs
        activeKey={activeTabKey}
        onChange={(key) => onChangeHandler(key)}
        items={items}
        tabPosition="left"
        size="large"
      />
    </section>
  );
}

export default Index;
