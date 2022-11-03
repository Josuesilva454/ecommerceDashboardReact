import api from "./api";

export const findAllCategory = async () => {
    return await api.get("api/category");
}

export const createCategory = async (Category) => {
    return await api.post("api/category", Category);
}

export const updateCategory= async(Category) => {
    return await api.put("api/category", Category);
}

export const deleteCategoryById = async(id) => {
    return await api.delete(`api/category/${id}`);
}