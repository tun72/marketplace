import { Form, Input, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, register } from "../services/apiUser";

export default function AuthForm({ isLogin }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  async function handelFinish(values) {
    try {
      setIsLoading(true);
      let data;
      let render;

      if (isLogin) {
        data = await login(values);
        render = "/";
      } else {
        data = await register(values);
        render = "/login";
      }

      if (data.isSuccess) {
        message.success(data.message);
        navigate(render);
      }
    } catch (err) {
      console.log(err.response.data.message);
      message.error(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <section className="w-full h-[100vh] py-[10rem]">
      <h2 className="text-center text-2xl text-sky-600 font-bold">
        {isLogin ? "Login Your Account" : "Register New Account"}
      </h2>
      <Form
        className="max-w-3xl mx-auto mt-4"
        onFinish={handelFinish}
        name="validateOnly"
        layout="vertical"
        //   onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {!isLogin && (
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <button
            type="submit"
            className="bg-sky-600 shadow-md w-full text-lg font-bold rounded-md text-white px-2 py-2"
          >
            {isLoading ? "Loading..." : isLogin ? "Login" : "Register"}
          </button>
        </Form.Item>

        <Form.Item>
          <p className="text-base">
            Don't have an account?
            <Link
              className="text-sky-600"
              to={`${!isLogin ? "/login" : "/register"}`}
            >
              {!isLogin ? "login" : "register now"}
            </Link>
          </p>
        </Form.Item>
      </Form>
    </section>
  );
}
