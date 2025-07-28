import axios from "axios";

const API_URL = "http://localhost:8000/api";

const dataProvider = {
  getList: async (resource, page, search, sortBy, order, status, limit) => {
    const params = new URLSearchParams({
      page,
      search,
      sortBy,
      order,
      status,
      limit,
    });

    const response = await axios.get(
      `${API_URL}/${resource}?${params.toString()}`
    );
    return response.data;
  },
  getById: async (resource, id) => {
    const response = await axios.get(`${API_URL}/${resource}/${id}`);
    return response.data;
  },
  create: async (resource, data) => {
    const response = await axios.post(`${API_URL}/${resource}`, data);
    return response.data;
  },
  update: async (resource, id, data) => {
    const response = await axios.put(`${API_URL}/${resource}/${id}`, data);
    return response.data;
  },
  remove: async (resource, id) => {
    const response = await axios.delete(`${API_URL}/${resource}/${id}`);
    return response.data;
  },
};
export const { getList, getById, create, update, remove } = dataProvider;
