import {
  BanknotesIcon,
  ShoppingCartIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Card from "../../components/Dashboard/Card";

import { useProductContext } from "../../context/ProductContext";

import { useUserContext } from "../../context/USerContext";
import { useAdminContext } from "../../context/AdminContext";
import Bar from "../../components/Dashboard/Bar";
import Chart from "../../components/Dashboard/Chart";

function Dashboard() {
  const { products, getPendingProducts, getTotalSales } = useProductContext();
  const { users } = useUserContext();
  const { dispatch } = useAdminContext();

  
  
  const totalProducts = products.length;
  const userCount = users.length;
  const totalSales = getTotalSales();
  const pendingProducts = getPendingProducts()
  
  

  return (
    <section>
      <div className="flex items-center gap-6 mt-2 mb-4">
        <div className=" w-full">
          <Card
            title={"Total Sales"}
            count={`${totalSales} MMK`}
            icon={BanknotesIcon}
            note={"MMK"}
          />
        </div>
        <div
          onClick={() => dispatch({ type: "changekey", payload: "4" })}
          className=" w-full"
        >
          <Card
            title={"Active Users"}
            count={userCount}
            icon={UserGroupIcon}
            note={"user"}
          />
        </div>
        <div
          onClick={() => dispatch({ type: "changekey", payload: "2" })}
          className=" w-full"
        >
          <Card
            title={"Total Products"}
            count={totalProducts}
            icon={ShoppingCartIcon}
            note={"items"}
          />
        </div>
        <div
          onClick={() => dispatch({ type: "changekey", payload: "2" })}
          className=" w-full"
        >
          <Card
            title={"Pending Products"}
            count={pendingProducts}
            icon={ShoppingCartIcon}
            note={"pending"}
          />
        </div>
      </div>
      <Chart products={products} />
      <Bar products={products} />
    </section>
  );
}

export default Dashboard;
