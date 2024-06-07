import { useCallback, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../../services/apiPublic";
import { Form, Input, message } from "antd";
import { setIsLoading } from "../../store/slices/loaderSlice";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../store/slices/userSlice";
import { formatDistanceToNow } from "date-fns";
import { getBids, placeABid } from "../../services/apiProduct";

function ProductDetail() {
  const { isLoading } = useSelector((state) => state.reducer.loader);
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [bids, setBids] = useState([]);
  const [isPlaced, setIsPlaced] = useState(false);
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const { productId } = useParams();

  const fetchProduct = useCallback(
    async function fetchProduct() {
      try {
        dispatch(setIsLoading(true));
        const data = await getProductDetail(productId);

        setProduct((prev) => {
          return { ...data };
        });
      } catch (err) {
        console.log(err);
        message.error(err.message);
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [dispatch, productId]
  );

  const fetchBids = useCallback(
    async function () {
      try {
        const data = await getBids(productId);
        if (data.isSuccess) {
          setBids(data.bids);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [productId]
  );

  useEffect(() => {
    fetchProduct();
    fetchBids();
  }, [fetchProduct, fetchBids]);

  async function onFinishHandler(values) {
    const bid = {
      text: values.message,
      phone_number: values.phone,
      sellerId: product.userId._id,
      productId: product._id,
    };

    try {
      setIsPlaced(true);
      const data = await placeABid(bid);
      if (data.isSuccess) {
        message.success(data.message);
        form.resetFields();
        fetchBids();
        console.log(form);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsPlaced(false);
    }
  }

  return (
    <section
      className={`flex  mb-20 flex-wrap ${
        isLoading
          ? "items-center justify-center"
          : "items-start justify-between"
      }`}
    >
      {isLoading ? (
        <RotatingLines
          strokeColor="#3b82f6"
          strokeWidth="5"
          animationDuration="0.75"
          width="50"
          visible={isLoading}
        />
      ) : (
        <>
          {product && product.category && product.userId && (
            <>
              <div className="lg:w-1/3 w-full">
                {product && product.images && product.images.length > 0 ? (
                  <>
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                      className="w-full h-96 object-cover object-center rounded-xl overflow-hidden"
                    />
                    <div className="flex items-center gap-3 mt-3 flex-wrap">
                      {product.images.map((i, index) => (
                        <div
                          key={index}
                          className={`border-2 overflow-hidden border-blue-400 rounded-lg p-2 ${
                            selectedImage === index && "border-dashed"
                          }`}
                        >
                          <img
                            src={i}
                            alt={product.name}
                            className=" w-24 h-24 object-cover cursor-pointer"
                            onClick={() => setSelectedImage(index)}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={
                        "https://img.freepik.com/free-vector/abstract-simple-background_53876-99863.jpg"
                      }
                      alt={product.name}
                      className="w-full h-96 object-fill object-center rounded-xl overflow-hidden"
                    />
                    <p className=" font-medium my-2 text-red-600">
                      This product does not include images.
                    </p>
                  </>
                )}
              </div>
              <div className="lg:w-2/3 lg:px-20 w-full py-10 lg:py-0">
                <div className=" flex justify-between">
                  <div className=" w-3/4">
                    <h1 className=" text-4xl font-bold my-1">{product.name}</h1>
                    <p className=" text-gray-500 font-medium leading-6 mb-4">
                      {product.description}
                    </p>
                  </div>
                  <ArrowLeftIcon
                    width={30}
                    height={30}
                    className="text-blue-600 cursor-pointer"
                    onClick={() => navigate(-1)}
                  />
                </div>
                <hr />
                <h1 className="text-2xl font-semibold my-2">Infomations</h1>
                <div className="flex justify-between mb-4">
                  <div className=" font-medium space-y-2">
                    <p>Price</p>
                    <p>Category</p>
                    <p>Used for</p>
                  </div>
                  <div className=" text-gray-600 space-y-2 text-right">
                    <p>{product.price} Kyats</p>
                    <p>{product.category.toUpperCase().replaceAll("_", " ")}</p>
                    <p>{product.usedFor}</p>
                  </div>
                </div>
                <hr />
                <div className=" mb-4">
                  <h1 className="text-2xl font-semibold my-2">Details</h1>
                  {product.details.map((d, i) => (
                    <div className="flex justify-between" key={i}>
                      <div className=" font-medium space-y-2">
                        <p>{d}</p>
                      </div>
                      <div className=" text-gray-600 space-y-2">
                        <p>Include</p>
                      </div>
                    </div>
                  ))}
                </div>
                <hr />
                <h1 className="text-2xl font-semibold my-2">
                  Seller Infomation
                </h1>
                <div className="flex justify-between mb-4">
                  <div className=" font-medium space-y-2">
                    <p>Name</p>
                    <p>E-mail</p>
                  </div>
                  <div className=" text-gray-600 space-y-2 text-right">
                    <p>{product.userId.name}</p>
                    <p>{product.userId.email}</p>
                  </div>
                </div>
                <hr />
                <h1 className="text-2xl font-semibold my-2">Place Your Bids</h1>
                {user?.userId && user?.userId !== product.userId._id && (
                  <div className=" mb-10">
                    <Form onFinish={onFinishHandler} layout="vertical" form={form}>
                      <Form.Item
                        name="message"
                        label="Text"
                        rules={[
                          {
                            required: true,
                            message: "Message must contains.",
                          },
                          {
                            min: 3,
                            message: "Message must have 3 characters.",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input placeholder="write something ..."></Input>
                      </Form.Item>
                      <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                          {
                            required: true,
                            message: "Phone number must contains.",
                          },
                          {
                            min: 3,
                            message: "Phone number must have 3 characters.",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input
                          type="number"
                          placeholder="phone number ..."
                        ></Input>
                      </Form.Item>
                      <div className=" text-right mb-3">
                        <button className=" text-white font-medium text-base px-2 py-1 rounded-md bg-blue-600">
                          {isPlaced && "Submitting Message ..."}
                          {!isPlaced && "Submit Message"}
                        </button>
                      </div>
                    </Form>
                  </div>
                )}
                {!user?.userId && (
                  <p className=" font-medium text-red-600 mb-1">
                    <Link to={"/login"} className=" underline">
                      Login
                    </Link>{" "}
                    or{" "}
                    <Link to={"/register"} className="underline">
                      Register
                    </Link>{" "}
                    to bid this product.
                  </p>
                )}
                {user?.userId === product.userId._id && (
                  <p className=" font-medium text-red-600 mb-2">
                    You are the product seller / owner. You can't placed bid.
                  </p>
                )}
                <hr />
                <h1 className="text-2xl font-semibold my-2">Recent Bids</h1>

                {bids.length === 0 ? (
                  <p className=" my-2 font-medium text-red-600">
                    Not bids are not placed yet.
                  </p>
                ) : (
                  <div>
                    {bids.map((bid) => (
                      <div
                        className=" mb-4 bg-white px-2 py-4 rounded-lg"
                        key={bid._id}
                      >
                        <h5 className=" font-medium text-base">
                          {bid.buyerId.name}
                        </h5>
                        <p className=" text-xs text-gray-400">
                          {formatDistanceToNow(new Date(bid.createdAt))} ago
                        </p>
                        <p className=" text-gray-600 text-sm font-medium">
                          {bid.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}

export default ProductDetail;
