import { DisplayProduct } from "./components/diplayProduct";
import { useStore } from "./store/store";

function App() {
  const { updateNewProductMode, newProductMode } = useStore();

  return (
    <>
      <body className="bg-sky-300 flex flex-col h-dvh items-center gap-3">
        <header>
          <button
            className="btn relative"
            onClick={() => updateNewProductMode(!newProductMode)} > 
            + Add Product
          </button>
          <input type="text" placeholder="Search" className="input"/>
        </header>
        <DisplayProduct />
      </body>
    </>
  );
}

export default App;
