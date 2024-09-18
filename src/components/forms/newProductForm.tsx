import { FormEvent, useState } from "react";
import { useStore } from "../../store/store";
// import { addProductAPI } from "../../api/productsAPI";
import { addNewProduct } from "../../api/supeAPI";
import { AlertMessage } from "../alert/alertMessage";
import { uploadImg } from "../../api/productsAPI";
import { X } from "lucide-react";

export default function NewProductForm() {
  const { newProductMode, updateNewProductMode } = useStore();

  const [loadingState, setLoadingState] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  async function handleForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const objValues: { [key: string]: FormDataEntryValue } = {};

    for (const [key, value] of formData.entries()) {
      objValues[key] = value;
    }

    const response = await uploadImg(formData);
    objValues["image_logo"] = response;

    console.log(objValues);

    try {
      setLoadingState(true);
      // Make the API call
      await addNewProduct(objValues);
      // Set success message
      setAlertContent("success");
    } catch (error) {
      // Handle the error properly
      if (error instanceof Error) {
        console.log(error);
        setAlertContent(error.message);
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        setAlertContent((error as { message: string }).message);
      } else {
        setAlertContent("An unknown error occurred.");
      }
    } finally {
      // Manage loading state and display message timing
      setTimeout(() => setLoadingState(false), 500);
      setTimeout(() => setDisplayMessage(true), 900);
      setTimeout(() => setDisplayMessage(false), 5000);
    }
  }

  return (
    <>
      {newProductMode && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex flex-col items-center justify-center">
          {displayMessage && <AlertMessage message={alertContent} />}

          <div className="relative w-full max-w-lg bg-white rounded-lg shadow-xl h-auto overflow-y-auto">
            {loadingState && (
              <div className="absolute inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            )}
            <button
              onClick={() => updateNewProductMode(!newProductMode)}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              <X size={20} />
            </button>
            <form onSubmit={handleForm} className="p-6 space-y-4 ">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Add New Product
              </h2>
              <label className="input input-bordered flex items-center gap-2">
                <span className="w-24">Name</span>
                <input
                  type="text"
                  className="grow"
                  placeholder="Name"
                  name="name"
                  required
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <span className="w-24">Brand</span>
                <input
                  type="text"
                  className="grow"
                  name="brand"
                  placeholder="Brand"
                  required
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <span className="w-24">Category</span>
                <input
                  type="text"
                  className="grow"
                  name="category"
                  placeholder="Category"
                  required
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <span className="w-24">Inventory</span>
                <input
                  type="number"
                  className="grow"
                  name="inventory_count"
                  placeholder="Inventory count"
                />
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <span className="w-24">Price</span>
                <input
                  type="number"
                  className="grow"
                  name="price"
                  placeholder="Price"
                  step="0.01"
                />
              </label>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Upload Image</span>
                </label>
                <input
                  type="file"
                  name="image_logo"
                  className="file-input file-input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label" htmlFor="textArea">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-32 w-full resize-none "
                  placeholder="Description"
                  name="description"
                  id="textArea"
                  required
                ></textarea>
              </div>
              <button
                className="btn bg-sky-500 w-full mt-6 text-white hover:bg-sky-600"
                type="submit"
              >
                {" "}
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
