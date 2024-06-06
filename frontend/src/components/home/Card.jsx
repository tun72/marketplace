import { Link } from "react-router-dom";
import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookMark } from "@heroicons/react/24/solid";
import { message } from "antd";
import { useSelector } from "react-redux";
import { getUser } from "../../store/slices/userSlice";
function Card({ product }) {
    const user = useSelector(getUser);
  function ProductStatusHandler(id) {}
  console.log(user);
  return (
    <div className={`basis-1/4 bg-white p-4 rounded-lg`}>
      {product.images[0] ? (
        <Link to={`/products/${product._id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-52 object-cover rounded-lg"
          />
        </Link>
      ) : (
        <Link to={`/products/${product._id}`}>
          <img
            src={
              "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
            }
            alt={product.name}
            className="w-full h-52 rounded-lg"
          />
        </Link>
      )}

      <p className=" text-white text-xs bg-blue-600 rounded-lg p-1 w-fit font-medium my-2">
        {product.category.toUpperCase().replaceAll("_", " ")}
      </p>
      <div className="flex items-center justify-between">
        <Link to={`/products/${product._id}`}>
          <p className=" text-xl font-bold text-gray-700">{product.name}</p>
        </Link>
        {!user?.userId && (
          <>
            {false ? (
              <BookmarkSlashIcon
                className="w-6 h-8 text-blue-600 cursor-pointer"
                onClick={() => {
                  ProductStatusHandler(product._id);
                }}
              />
            ) : (
              <>
                {false ? ( //isProductSaved(product)
                  <BookMark
                    className="w-6 h-8 text-blue-600 cursor-pointer"
                    onClick={() =>
                      message.warning("Product is already saved !!")
                    }
                  />
                ) : (
                  <BookmarkIcon
                    className="w-6 h-8 text-blue-600 cursor-pointer"
                    onClick={() => {
                      ProductStatusHandler(product._id);
                    }}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
      <p className="text-gray-500 mb-2">{product.description.slice(0, 80)}</p>
      <hr />
      <p className=" text-xl font-semibold mt-2 text-right">
        {product.price} Kyats
      </p>
    </div>
  );
}

export default Card;
