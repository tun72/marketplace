import { TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, reset } from "../../store/slices/productSlice";
import {
  deleteProductImage,
  getImages,
  uploadImages,
} from "../../services/apiProduct";
import { setIsLoading as setUploadLoading } from "../../store/slices/loaderSlice";
import { message } from "antd";

function Upload() {
  const [images, setImages] = useState([]);
  const [savedImages, setSaveImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadingUploadImage = useSelector(
    (state) => state.reducer.loader.isLoading
  );

  const dispatch = useDispatch();
  const { editProductId } = useSelector(getProducts);

  useEffect(() => {
    async function getSaveImages() {
      try {
        setIsLoading(true);
        const data = await getImages(editProductId);
        setSaveImages([...data.images]);
      } catch (err) {
        message.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getSaveImages();
  }, [editProductId, dispatch]);

  async function submitImagesHandler(e) {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      console.log(images[i].img);
      formData.append("product_images", images[i].img);
    }

    try {
      dispatch(setUploadLoading(true));
      const data = await uploadImages(formData, editProductId);

      if (data.isSuccess) {
        dispatch(reset());
        message.success(data.message);
      }
    } catch (err) {
      console.log(err);
      message.error(err.message);
    } finally {
      dispatch(setUploadLoading(false));
    }
  }

  function onChangeHandler(e) {
    const seletedImages = e.target.files;

    const seletedImagesArray = Array.from(seletedImages);

    const previewImagesArray = seletedImagesArray.map((img, index) => {
      return {
        preview: URL.createObjectURL(img),
        img,
        id: Date.now() + Math.random() * 1e9,
      };
    });

    setImages((prev) => prev.concat(previewImagesArray));
  }

  function handelDeleteImage(id) {
    setImages((prevImages) => prevImages.filter((img) => img.id !== id));
  }

  async function handelCloudImageDelete(image) {
    setSaveImages((prev) => prev.filter((e) => e !== image));
    try {
      const data = await deleteProductImage(editProductId, image);
      if (data.isSuccess) {
        message.success("Image Successfully deleted!");
      }
    } catch (err) {
      console.log(err);
      message.error(err.message);
    }
  }
  return (
    <section>
      <h1 className=" text-2xl font-bold mb-4 text-blue-600">
        Upload your product's images here.
      </h1>
      <div className="mt-2">
        <h1 className="text-base font-medium mb-2">Saved images in cloud.</h1>
        {!isLoading ? (
          <div className="flex gap-2 mb-6 flex-wrap">
            {savedImages.map((img) => (
              <div className="basis-1/6 h-32 relative" key={img}>
                <img
                  src={img}
                  alt={""}
                  className="w-full h-full object-cover rounded-md"
                />
                <TrashIcon
                  width={20}
                  height={20}
                  className=" absolute z-20 bottom-2 right-3 text-white cursor-pointer"
                  onClick={() => {
                    handelCloudImageDelete(img);
                  }}
                />
              </div>
            ))}

            {!isLoading && savedImages.length <= 0 && (
              <p className="text-red-600 text-sm mb-5">
                no images are not saved.
              </p>
            )}
          </div>
        ) : (
          <p className="text-blue-600 text-xl mb-5">Loading...</p>
        )}
      </div>
      <form
        method="post"
        encType="multipart/form-data"
        onSubmit={submitImagesHandler}
      >
        <label
          htmlFor="upload"
          className="p-2 rounded-md border-dashed border-2 border-blue-600 font-medium my-3 text-blue-600 cursor-pointer"
        >
          Upload from device
        </label>
        <input
          type="file"
          hidden
          id="upload"
          name="product_images"
          multiple
          accept="image/png,image/jpeg,image/jpg"
          onChange={onChangeHandler}
        />
        <div className="flex gap-2 mt-4 flex-wrap">
          {!!images.length &&
            images.map((img) => (
              <div className="basis-1/6 h-32 relative" key={img.id}>
                <img
                  src={img.preview}
                  alt={img.id}
                  className="w-full h-full object-cover rounded-md"
                />
                <TrashIcon
                  width={20}
                  height={20}
                  className=" absolute z-20 bottom-2 right-3 text-white cursor-pointer"
                  onClick={() => {
                    handelDeleteImage(img.id);
                  }}
                />
              </div>
            ))}
        </div>
        {!!images.length && (
          <button
            disabled={loadingUploadImage}
            className="block my-4 text-white bg-blue-600 rounded-md px-3 py-2 font-medium"
          >
            {loadingUploadImage ? "Loading" : "update"}
          </button>
        )}
      </form>
    </section>
  );
}

export default Upload;
