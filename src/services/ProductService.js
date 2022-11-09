import api from "./api";

export const findAllProduct = async () => {
    return await api.get("api/product");
}
export const findProductById = async (id) => {
  return await api.get(`/api/product/${id}`);
}

export const createProduct = async (Product) => {
    return await api.post("api/product", Product);
}

export const updateProduct= async(Product) => {
    return await api.put("api/product", Product);
}

export const deleteProductById = async(id) => {
    return await api.delete(`api/product/${id}`);
}