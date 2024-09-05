import { FormEvent, useState } from "react";
import { useStore } from "../../store/store";
// import { addProductAPI } from "../../api/productsAPI";
import { addNewProduct } from "../../api/supeAPI";
import {AlertMessage } from "../alert/alertMessage";
import { uploadImg } from "../../api/productsAPI";

export default function NewProductForm() {
  const { newProductMode, updateNewProductMode } = useStore();

  const [loadingState, setLoadingState] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(true)
  const [alertContent, setAlertContent] = useState('') 

  async function handleForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const objValues: { [key: string]: FormDataEntryValue } = {};

    for (const [key, value] of formData.entries()) {
      objValues[key] = value;
    }

    const response = await uploadImg(formData)
    objValues['image_logo'] = response

    console.log(objValues)

    try {
      setLoadingState(true);
      // Make the API call
      await addNewProduct(objValues);
      // Set success message
      setAlertContent('success');

    } catch (error) {
      // Handle the error properly
      if (error instanceof Error) {
        console.log(error)
        setAlertContent(error.message);
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        setAlertContent((error as { message: string }).message);
      } else {
        setAlertContent('An unknown error occurred.');
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
        <div className="ring-2 absolute backdrop-blur-sm bg-black/30 flex flex-col items-center inset-0 justify-center ">
          {displayMessage && <AlertMessage message={alertContent} /> }
          {loadingState && (
            <div className="ring-2 absolute backdrop-blur-sm bg-black/30 flex items-center inset-0 justify-center ">
              <span className="loading loading-spinner loading-xs"></span>
            </div>
          )}
          <button
            onClick={() => updateNewProductMode(!newProductMode)}
            className="btn absolute top-0 left-2"
          >
            Close
          </button>
          <form
            onSubmit={handleForm}
            className="w-11/12 h-4/6 bg-white p-5 rounded-md flex flex-col gap-3 " >
            {/* // ? class grow ? */}
            <label className="input input-bordered flex items-center gap-2">
              Name
              <input
                type="text"
                className="grow"
                placeholder="Name"
                name="name"
                required
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Brand
              <input type="text" name="brand" placeholder="brand" required />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              Category
              <input
                type="text"
                name="category"
                placeholder="category"
                required
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              Inventory Count
              <input
                type="text"
                name="inventory_count"
                placeholder="inventory count"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              Price
              <input type="text" name="price" placeholder="price" />
            </label>

            <label>
              Upload Image
              <input type="file" name="image_logo" />
            </label>

            <label className="flex flex-col">
              Description
              <textarea
                className="textarea textarea-bordered"
                placeholder="description"
                name="description"
                required
              ></textarea>
            </label>

            <button className="btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
}
