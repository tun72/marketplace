import {
  BellAlertIcon,
  ChartBarIcon,
  SwatchIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Tabs } from "antd";
import Dashboard from "./Dashboard";
import Users from "./Users";
import Notification from "./Notification";
import General from "../profile/General";
import Products from "./Products";
import { useAdminContext } from "../../context/AdminContext";
import { ProductProvider } from "../../context/ProductContext";
import { UserProvider } from "../../context/USerContext";

function Admin() {
  const { activeTabKey, dispatch } = useAdminContext();
  const items = [
    {
      key: "1",
      label: (
        <span className="flex items-start gap-2">
          <ChartBarIcon width={20} />
          Dashboard
        </span>
      ),
      children: <Dashboard />,
    },
    {
      key: "2",
      label: (
        <span className="flex items-start gap-2">
          <SwatchIcon width={20} />
          Manage Products
        </span>
      ),
      children: <Products />,
    },
    {
      key: "3",
      label: (
        <span className="flex items-start gap-2">
          <UsersIcon width={20} />
          Manage Users
        </span>
      ),
      children: <Users />,
    },
    {
      key: "4",
      label: (
        <span className="flex items-start gap-2">
          <BellAlertIcon width={20} />
          Notifications
        </span>
      ),
      children: <Notification />,
    },
    {
      key: "5",
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
    dispatch({ type: "changekey", payload: key });
  }

  return (
    <ProductProvider>
      <UserProvider>
        <Tabs
          activeKey={activeTabKey}
          onChange={(key) => onChangeHandler(key)}
          items={items}
          tabPosition="left"
          size="large"
        />
      </UserProvider>
    </ProductProvider>
  );
}

export default Admin;
