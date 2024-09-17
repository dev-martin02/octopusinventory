import React, { useState } from "react";
import { deleteProduct, updateProduct } from "../api/supeAPI";
import { useStore } from "../store/store";
import { X, Edit, Trash2 } from "lucide-react";

interface ProductApi {
  brand: string;
  category: string;
  created_at: string;
  description: string;
  id: number;
  inventory_count: number;
  name: string;
  price: string;
}

export default function OneProduct() {
  const { oneProduct, setOneProductMode } = useStore();
  const [editMode, setEditMode] = useState(false);
  const [productObj, setProductObj] = useState<ProductApi>({
    brand: "",
    category: "",
    created_at: "",
    description: "",
    id: 0,
    inventory_count: 0,
    name: "",
    price: "",
  });
  const { name, price, inventory_count, id, brand, category } = oneProduct;

  async function deleteThisProduct(id: number) {
    const question = prompt("Do you want to delete this product?");
    if (question?.toLowerCase() === "yes") {
      const response = await deleteProduct(id);
      console.log(response); // send an alert
      window.location.reload();
      return;
    }
    return null;
  }

  function editInputMode(value: boolean) {
    setEditMode(value);
    setProductObj(oneProduct);
  }

  function handleInputValue(
    destination: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setProductObj((prevState) => ({
      ...prevState,
      [destination]: event.target.value,
    }));
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-75 backdrop-blur-sm overflow-y-auto p-4">
      <div className="bg-white relative rounded-lg shadow-xl max-w-md w-full p-6">
        <button
          onClick={() => setOneProductMode(false)}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          <X size={20} />
        </button>

        <figure className="my-6 w-full h-56 bg-gray-200 rounded-lg overflow-hidden">
          <img src="" alt="" className="w-full h-full object-cover" />
        </figure>

        {editMode ? (
          <form className="space-y-4">
            {Object.entries(productObj).map(([key, value]) => {
              if (
                key !== "id" &&
                key !== "created_at" &&
                key !== "description"
              ) {
                return (
                  <label key={key} className="block">
                    <span className="text-gray-700 text-sm font-semibold">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </span>
                    <input
                      type={key === "inventory_count" ? "number" : "text"}
                      name={key}
                      value={value}
                      onChange={(e) => handleInputValue(key, e)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </label>
                );
              }
              return null;
            })}
            <div className="flex justify-end space-x-2 mt-6">
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                type="submit"
                onClick={() => updateProduct(productObj, productObj.id)}
              >
                Submit
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            {[
              { label: "Name", value: name },
              { label: "Brand", value: brand },
              { label: "Category", value: category },
              { label: "Price", value: price },
              { label: "Inventory Count", value: inventory_count },
            ].map((field) => (
              <div key={field.label} className="border-b border-gray-200 pb-2">
                <span className="text-sm text-gray-500">{field.label}</span>
                <p className="text-gray-900 font-medium">{field.value}</p>
              </div>
            ))}
            <div className="flex justify-end space-x-2 mt-6">
              <button
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => editInputMode(true)}
              >
                <Edit size={16} className="mr-2" />
                Edit
              </button>
              <button
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={() => deleteThisProduct(id)}
              >
                <Trash2 size={16} className="mr-2" />
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
