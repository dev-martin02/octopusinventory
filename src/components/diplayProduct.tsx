import { useStore } from "../store/store";
import { fetchOneProduct, getAllProducts } from "../api/supeAPI";
import { useEffect, useState } from "react";
import NewProductForm from "./forms/newProductForm";
import ProductSkeleton from "./loading/ProductSkeleton";
import OneProduct from "./oneProduct";

interface productApi {
  brand: string;
  category: string;
  created_at: string;
  description: string;
  id: number;
  inventory_count: number;
  name: string;
  price: string;
  image_urls: [string];
  image_logo: string;
}

export function DisplayProduct() {
  const {
    loadingProducts,
    setLoadingProducts,
    setOneProduct,
    oneProductMode,
    setOneProductMode,
  } = useStore();
  const [productsData, setProductsData] = useState<productApi[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        const results = await getAllProducts();
        setProductsData(results);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, [setLoadingProducts]);

  async function getOneProduct(id: number) {
    await fetchOneProduct(id).then((row) => setOneProduct(row));
    setOneProductMode(true);
  }
  return (
    <div className="w-11/12 p-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 bg-slate-50 rounded-md ">
      {loadingProducts ? (
        <>
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </>
      ) : (
        <>
          {productsData.map(
            ({
              name,
              inventory_count,
              description,
              price,
              id,
              category,
              image_logo,
            }) => (
              <div className="relative bg-sky-100 shadow-xl h-64 pt-12 mt-12">
                <figure className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <img src={image_logo} className="h-24 w-24 object-contain" />
                </figure>
                <div className="w-full px-4">
                  <h2 className="font-bold text-xl mb-4">{name}</h2>

                  <div className="flex justify-between items-center content-center ">
                    <span className="text-lg">{category}</span>

                    {/* Stock banner  */}
                    <div className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      <span className="font-semibold">{inventory_count}</span>{" "}
                      in stock{" "}
                    </div>
                  </div>

                  <p className="mt-2">{description}</p>
                  <p className="mt-2 text-lg font-semibold">${price}</p>
                  <div className="flex justify-end mt-4">
                    <button
                      className="border border-blue-400 text-white bg-blue-400 rounded-md px-2 py-1"
                      onClick={() => getOneProduct(id)}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
          {oneProductMode && <OneProduct />}
        </>
      )}
      <NewProductForm />
    </div>
  );
}
