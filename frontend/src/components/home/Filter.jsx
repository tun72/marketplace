import { message } from "antd";

import { useState } from "react";

import { useDispatch } from "react-redux";
import { setIsLoading } from "../../store/slices/loaderSlice";
import { useNavigate } from "react-router-dom";

const Filter = ({ setProducts, getAllProducts }) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");

  const Categories = [
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

  const navigate = useNavigate();
  const categoryHandler = (i) => {
    setSelectedCategory(i);
    navigate("/?category=" + Categories[i].value);
  };

  const clearHandler = () => {
    setSelectedCategory("");
    navigate("/");
  };

  return (
    <div className=" flex items-center gap-3 my-8 max-w-5xl mx-auto flex-wrap justify-center">
      {Categories.map((category, index) => (
        <p
          key={category.value}
          className={`px-2 py-1 rounded-md text-sm cursor-pointer  border border-blue-600 text-blue-600 ${
            index === selectedCategory && "border-dashed bg-blue-100"
          }`}
          onClick={() => categoryHandler(index)}
        >
          {category.label}
        </p>
      ))}
      {selectedCategory !== "" && (
        <button
          type="button"
          className={`px-2 py-1 rounded-md text-sm cursor-pointer  border border-blue-600 text-white bg-blue-600`}
          onClick={clearHandler}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Filter;
