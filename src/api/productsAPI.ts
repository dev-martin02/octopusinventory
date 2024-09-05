import axios from "axios";
const API_URL = "http://localhost:3000/";

export const getAllProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const addProductAPI = async (formData: FormData) => {
  try {
    axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("There was an error:", error);
    throw error;
  }
};

export const uploadImg = async (formData: FormData) => {
  try{
  const response = await axios.post(`${API_URL}uploadImage`, formData,  {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    console.log(response)
    return response.data.image_logo
  } catch(error) {
    console.log('There was an error:', error);
    throw error
  }
}