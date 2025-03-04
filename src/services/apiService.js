import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
  });


  // Customer APIs
export const getCustomers = () => api.get('/customers');
export const createCustomer = (customerData) => api.post('/customers/createCustomer', customerData);
export const updateCustomer = (id, customerData) => api.put(`/customers/${id}`, customerData);
export const deleteCustomer = (id) => api.delete(`/customers/${id}`);


// Invoice APIs
export const getInvoices = () => api.get('/invoices/getInvoices');
export const createInvoice = (invoiceData) => api.post('/invoices/createInvoice', invoiceData);
export const updateInvoice = (id, invoiceData) => api.put(`/invoices/updateInvoice/${id}`, invoiceData);
export const deleteInvoice = (id) => api.delete(`/invoices/deleteInvoice/${id}`);



// Dashboard API
export const getDashboardData = () => api.get('/dashboard/sales');

// Settings API
export const updateUserProfile = (userData) => api.put('/settings/updateUser', userData);
export const updateCompanySettings = (companyData) => api.put('/settings/updateCompany', companyData);
export const importData = (companyData) => api.post('/settings/importData', companyData);
export const backupData = () => api.get('/settings/backupData');

export default api;