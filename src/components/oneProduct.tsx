import { useState } from "react";
import { deleteProduct, updateProduct } from "../api/supeAPI";
import { useStore } from "../store/store";

interface productApi {
  brand: string;
  category: string;
  created_at: string;
  description: string;
  id: number;
  inventory_count: number;
  name: string;
  price: string;
  // image_urls: [string];
}


export default function OneProduct() {
  const { oneProduct, setOneProductMode  } = useStore();
  const [editMode, setEditMode ] = useState(false);
  const [productObj, setProductObj] = useState<productApi>({
    brand: '',
    category: '',
    created_at: '',
    description: '',
    id: 0,
    inventory_count: 0,
    name: '',
    price: '',
    // image_urls: ['']
  });
      const { name, price, inventory_count, id, brand, category } = oneProduct;

  async function deleteThisProduct(id: number) {
    const question = prompt("do you want to delete this product?");
    if (question?.toLocaleLowerCase() === "yes") {
      const response = await deleteProduct(id);
      console.log(response); // send an alert
      window.location.reload();
      return;
    }

    return null;
  }


  function editInputMode(value:boolean){
    setEditMode(value)
    setProductObj(oneProduct)
    }

  function handleInputValue(destination:string,event: React.ChangeEvent<HTMLInputElement> ){
    setProductObj(prevState => ({...prevState, [destination]: event.target.value}))
  }

  console.log(productObj)
  return (
    <div className="ring-2 fixed flex flex-col items-center inset-0 backdrop-blur-sm ">
      <button className="btn" onClick={() => setOneProductMode(false)}>Close</button>
      <figure className="ring-2 w-72 h-60">
        <img src="" alt="" />
      </figure>
      <div className="flex flex-col gap-4  bg-white">
        {editMode ? (
          <form className="flex flex-col gap-3 ">

            <label className="input input-bordered flex items-center gap-2" > Name: 
              <input type="text" name="name" value={productObj.name} onChange={(e) => handleInputValue("name", e) }/>
            </label>

            <label className="input input-bordered flex items-center gap-2" > Brand: 
              <input type="text" name="brand" value={productObj.brand} onChange={(e) => handleInputValue("brand", e) } />
            </label>

            <label className="input input-bordered flex items-center gap-2" > Category: 
              <input type="text" name="category" value={productObj.category} onChange={(e) => handleInputValue("category", e) }/>
            </label>

            <label className="input input-bordered flex items-center gap-2" > Price: 
              <input type="text" name="price" value={productObj.price} onChange={(e) => handleInputValue("price", e) } />
            </label>

            <label className="input input-bordered flex items-center gap-2" > Inventory Count: 
              <input type="text" name="inventory_count" value={productObj.inventory_count} onChange={(e) => handleInputValue("inventory_count", e) } />
            </label>

            <button className="btn" type="submit" onClick={() => updateProduct(productObj, productObj.id,)}> Submit</button>
            <button className="btn" onClick={() => setEditMode(false)}>Cancel</button>
          </form> ) : (
            <div className="w-80 flex flex-col gap-2">
              <fieldset className="ring-2">
                <legend className=" bg-white">Name</legend>
                {name}
              </fieldset>
              <fieldset className="ring-2">
                <legend className=" bg-white">Brand</legend>
                {brand}
              </fieldset>
              <fieldset className="ring-2">
                <legend className=" bg-white">Category</legend>
                {category}
              </fieldset>
              <fieldset className="ring-2">
                <legend className=" bg-white">Price</legend>
                {price}
              </fieldset>
              <fieldset className="ring-2">
                <legend className=" bg-white">Inventory Count</legend>
                {inventory_count}
              </fieldset>
              <button className="btn" onClick={() => editInputMode(true)}>Edit</button>
              <button className="btn" onClick={() => deleteThisProduct(id)}>Delete</button>
            </div>
          )}
      </div>
    </div>
  );
}
