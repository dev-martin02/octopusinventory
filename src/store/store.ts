import { create } from "zustand";

interface StoreState {
  newProductMode: boolean;
  updateNewProductMode: (result: boolean) => void;
  loadingProducts: boolean;
  setLoadingProducts: (state: boolean) => void;
  oneProduct: productApi;
  setOneProduct: (state: productApi) => void;
  oneProductMode: boolean,
  setOneProductMode: (state: boolean) => void
}

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

const defaultProduct: productApi = {
  brand: "",
  category: "",
  created_at: "",
  description: "",
  id: 0,
  inventory_count: 0,
  name: "",
  price: "",
  image_urls: [""],
  image_logo: ""
};
export const useStore = create<StoreState>((set) => ({
  newProductMode: false,
  updateNewProductMode: (result: boolean) =>
    set({
      newProductMode: result,
    }),

  loadingProducts: false,
  setLoadingProducts: (state: boolean) => set({ loadingProducts: state }),

  oneProduct: defaultProduct,
  setOneProduct: (state: productApi) => set({ oneProduct: state }),

  oneProductMode: false,
  setOneProductMode: (state) => set({oneProductMode: state})
}));
