import axios from "axios";

const API_URL = "http://localhost:3000/api/contract";

export const getContracts = async () => {
  const { data } = await axios.get(`${API_URL}`);
  return data;
};

export const createContract = async (clientName) => {
  const { data } = await axios.post(`${API_URL}/create`, { clientName });
  return data;
};

export const updateContractStatus = async (contractId, status) => {
  const { data } = await axios.put(`${API_URL}/update`, { contractId, status });
  return data;
};
