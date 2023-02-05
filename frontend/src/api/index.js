const { default: axiosInstance } = require('../utils/axios');

export const createAsset = async (body) => {
  const res = await axiosInstance.post('/assets', body);
  return res;
};
export const createExpenseCategory = async (body) => {
  const res = await axiosInstance.post('/expense_heads', body);
  return res;
};
export const createTransaction = async (body) => {
  const res = await axiosInstance.post('/transactions', body);
  return res;
};
export const getAllTransactions = async () => {
  const res = await axiosInstance.get('/transactions');
  return res;
};
export const getAllExpenseCategories = async () => {
  const res = await axiosInstance.get('/expense_heads');
  return res;
};
export const getAllAssets = async () => {
  const res = await axiosInstance.get('/assets');
  return res;
};
