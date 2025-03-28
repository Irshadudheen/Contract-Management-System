import axiosInstance from "../utils/axiosInstance";
export const getContractById = async (contractId)=>{
  const { data } = await axiosInstance.get(`/contract/${contractId}`);
  return data;
}
export const getContracts = async (currentPage,searchTerm) => {
  console.log(currentPage,"the current page in getControct")
  const { data } = await axiosInstance.get(`/contract/?currentPage=${currentPage}&&search=${searchTerm}`);
  return data;
};

export const createContract = async (contractData) => {
  const { data } = await axiosInstance.post('/contract', contractData);
  return data;
};

export const updateContractStatus = async (contractId, status) => {
  const { data } = await axiosInstance.patch(`/contract`, { contractId, status });
  return data;
};
