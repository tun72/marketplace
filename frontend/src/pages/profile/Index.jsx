import { Tabs, message } from "antd";
import {
  BellAlertIcon,
  SquaresPlusIcon,
  SwatchIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useCallback, useState } from "react";
import ProductManage from "./ProductManage";
import Products from "./Products";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  reset,
  updateTabKey,
} from "../../store/slices/productSlice";
import General from "./General";
import Notification from "./Notification";
import { getAllNoti } from "../../services/apiNotification";

function Index() {
  const { activeTabKey, editProductId } = useSelector(getProducts);
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const [manageTabKey, setManageTabKey] = useState("1");

  const loadNotification = useCallback(async function () {
    try {
      const data = await getAllNoti();

      if (data.isSuccess) {
        setNotifications(data.noti);
      }
    } catch (e) {
      console.log(e);
      message.error(e.message);
    }
  }, []);

  const items = [
    {
      key: "1",
      label: (
        <span className="flex items-start gap-2">
          <SwatchIcon width={20} />
          Products
        </span>
      ),
      children: <Products activeTabKey={activeTabKey} />,
    },
    {
      key: "2",
      label: (
        <span className="flex items-start gap-2">
          <SquaresPlusIcon width={20} />
          Manage Product
        </span>
      ),
      children: (
        <ProductManage
          manageTabKey={manageTabKey}
          setActiveTabKey={activeTabKey}
        />
      ),
    },
    {
      key: "3",
      label: (
        <span className="flex items-start gap-2">
          <BellAlertIcon width={20} />
          Notifications
        </span>
      ),
      children: (
        <Notification
          loadNotification={loadNotification}
          notifications={notifications}
        />
      ),
    },
    {
      key: "4",
      label: (
        <span className="flex items-start gap-2">
          <UserIcon width={20} />
          Profile
        </span>
      ),
      children: <General />,
    },
  ];

  function onChangeHandler(key) {
    // setActiveTabKey(key);

    if (editProductId && activeTabKey === "2") {
      const sure = window.confirm("Are You Sure?");
      if (sure) {
        return dispatch(reset());
      }
    } else {
      return dispatch(updateTabKey(key));
    }
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
