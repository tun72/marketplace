import { formatDistanceToNow } from "date-fns";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function Notification({ notifications, getNoti }) {

  useEffect(() => {
    getNoti();
  }, [getNoti]);

  return (
    <section>
      <h1 className="text-3xl font-semibold my-2">Notifications</h1>
      <div className=" max-w-3xl">
        {notifications?.length === 0 && (
          <p className=" text-red-600 font-medium my-5">
            No notifications yet.
          </p>
        )}
        {notifications &&
          notifications.map((noti) => (
            <div key={noti._id} className=" bg-white mb-4 rounded-lg p-4">
              <p className=" text-sm font-medium text-gray-500">
                {formatDistanceToNow(new Date(noti.createdAt))} ago ...
              </p>
              <h4 className=" text-xl font-bold my-2 ">{noti.title}</h4>
              <p className=" text-base font-medium text-gray-600">
                {noti.message}
              </p>
              <p className=" font-medium text-gray-600 my-2">
                Contact Number -{" "}
                <span className=" tracking-wide">{noti.phoneNumber}</span>
              </p>
              <hr />
              <div className="flex justify-end">
                <Link
                  to={`/products/${noti.productId}`}
                  className=" text-blue-600 font-medium my-2 underline"
                >
                  View bids
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default Notification;
