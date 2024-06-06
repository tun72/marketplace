import {
  EllipsisHorizontalIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/solid";
import { Checkbox, Col, Form, Input, Row, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  addProduct,
  getOldProduct,
  updateProduct,
} from "../../services/apiProduct";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadProducts,
  reset,
  updateEditProductId,
  updateTabKey,
} from "../../store/slices/productSlice";

function ProductFrom() {
  const [isLoading, setIsLoading] = useState(false);
  const { editProductId, activeTabKey } = useSelector(
    (state) => state.reducer.product
  );
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const options = [
    {
      value: "clothing_and_fashion",
      label: "Clothing and Fashion",
    },
    {
      value: "electronics_and_gadgets",
      label: "Electronics and Gadgets",
    },
    {
      value: "home_and_furniture",
      label: "Home and Furniture",
    },
    {
      value: "beauty_and_personal_care",
      label: "Beauty and Personal Care",
    },
    {
      value: "books_and_media",
      label: "Books and Media",
    },
    {
      value: "sports_and_fitness",
      label: "Sports and Fitness",
    },
    {
      value: "toys_and_games",
      label: "Toys and Games",
    },
  ];
  const checkBoxOptions = [
    {
      label: "Accessories",
      value: "Accessories",
    },
    {
      label: "Warranty",
      value: "Warranty",
    },
    {
      label: "Vocher",
      value: "Vocher",
    },
  ];

  async function onFinishHandler(values) {
    try {
      setIsLoading(true);
      let data;
      if (editProductId) {
        data = await updateProduct(editProductId, values);
      } else {
        data = await addProduct(values);
      }

      if (data.isSuccess) {
        form.resetFields();
        dispatch(reset());
        dispatch(loadProducts());

        message.success(data.message);
      }
    } catch (err) {
      console.log(err);
      message.error(err?.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function getOldProductData() {
      try {
        const data = await getOldProduct(editProductId);
        if (data.isSuccess) {
          message.success("Edit mode on!!");

          form.setFieldsValue(data.product);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        message.error(err.message);
      }
    }

    if (editProductId) {
      getOldProductData();
    } else {
      form.resetFields();
    }
  }, [editProductId, form]);

  

  return (
    <section>
      <h1 className="text-3xl font-semibold my-2">
        {editProductId ? "Update Product" : "What you want to sell?"}
      </h1>
      <Form layout="vertical" onFinish={onFinishHandler} form={form}>
        <Form.Item
          name="name"
          label="Product Name"
          rules={[
            {
              required: true,
              message: "Product name must contains.",
            },
          ]}
        >
          <Input placeholder="product name ..." />
        </Form.Item>
        <Form.Item
          name="description"
          label="Product Description"
          rules={[
            {
              required: true,
              message: "Description must contains.",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="price"
              label="Price"
              rules={[
                {
                  required: true,
                  message: "Price must contains.",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="category"
              label="Choose a category"
              rules={[
                {
                  required: true,
                  message: "Category must choose.",
                },
              ]}
            >
              <Select options={options} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="usedFor"
              label="Used for"
              rules={[
                {
                  required: true,
                  message: "Product's used time must write.",
                },
              ]}
            >
              <Input placeholder="eg, 3 months ago" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name="details" label="This product is have">
          <Checkbox.Group options={checkBoxOptions} />
        </Form.Item>
        <button
          type="submit"
          className=" font-medium text-lg text-center py-1 rounded-md bg-blue-500 text-white flex items-center gap-2 justify-center w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            "Loading"
          ) : (
            <>
              <SquaresPlusIcon width={30} />
              {editProductId ? "Update Product" : " Sell Product"}
            </>
          )}

          {isLoading && (
            <EllipsisHorizontalIcon width={30} className="animate-pin" />
          )}
        </button>
      </Form>
    </section>
  );
}

export default ProductFrom;
