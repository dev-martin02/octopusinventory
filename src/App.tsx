import { useState } from "react";
import { DisplayProduct } from "./components/diplayProduct";
import { useStore } from "./store/store";
import { Plus, Search } from "lucide-react";

function App() {
  const { updateNewProductMode, newProductMode } = useStore();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <body className="bg-blue-200 flex flex-col h-dvh items-center gap-3">
        <header className="bg-white shadow-md p-4 w-full">
          <div className="container mx-auto flex flex-col gap-4 md:flex-row md:gap-0 justify-between items-center">
            <h1 className="text-2xl font-bold text-sky-600">
              Product Management
            </h1>
            <div className="flex items-center gap-1">
              <label className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search products"
                  className="py-2 pl-10 pr-4 w-full border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </label>

              <button
                onClick={() => updateNewProductMode(!newProductMode)}
                className="bg-sky-500 hover:bg-sky-600 text-white flex items-center py-2 px-4 rounded "
              >
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </button>
            </div>
          </div>
        </header>
        <DisplayProduct />
      </body>
    </>
  );
}

export default App;
