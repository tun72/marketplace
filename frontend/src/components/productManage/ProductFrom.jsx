import {
  EllipsisHorizontalIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/solid";
import { Checkbox, Col, Form, Input, Row, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { addProduct } from "../../services/apiProduct";
import { useState } from "react";

function ProductFrom() {
  const [isLoading, setIsLoading] = useState(false);

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
      const data = await addProduct(values);
      if (data.isSuccess) {
        form.resetFields();
        message.success(data.message);
      }
    } catch (err) {
      console.log(err);
      message.error(err?.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <section>
      <h1 className="text-3xl font-semibold my-2">What you want to sell?</h1>
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
              Sell Product
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