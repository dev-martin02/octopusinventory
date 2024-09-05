import supabase from "../config/supabase";
export async function getAllProducts() {
  const { data, error } = await supabase.from("products").select();
  if (error) throw error;

  return data;
}

export async function addNewProduct(formData: {}) {
  const response = await supabase.from("products").insert(formData);
  const {error} = response
    if(error){
      console.log(error)
      throw error
    }
  console.log(response);
}

export async function fetchOneProduct(id: number) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching row:", error);
    return null;
  }

  return data;
}

export async function deleteProduct(id: number) {
  const response = await supabase
  .from("products")
  .delete()
  .eq("id", id);
  return response;
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
  // image_urls: [string];
}


export async function updateProduct( value: productApi, id:number){
  const data = await supabase
  .from('products')
  .update(value)
  .eq('id', id)
  console.log(data)
  return data
}

