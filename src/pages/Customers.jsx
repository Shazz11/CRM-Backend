import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import TableComponent from '../components/TableComponent';
import {getCustomers, createCustomer, deleteCustomer, updateCustomer} from '../services/apiService'

function Customers() {
    const [customerForm, setCustomerForm] = useState({ name: '', number: '', address: '' });
    const [selectedRows, setSelectedRows] = useState([]);
    const [customers, setCustomers] = useState([])

    const isAllSelected = selectedRows.length === customers.length;

    // Fetch data
    useEffect(() => {
      getCustomers()
        .then(response => {
          console.log("Fetched Data:", response.data); // Debugging
          setCustomers(response.data || []); // Ensure it's an array
        })
        .catch(error => {
          console.log(`Error fetching customers: ${error}`);
          setCustomers([]); // Set empty array in case of error
        });
    }, []);
    
    // Change 
    const handleChange = (event) => {
      const { name, value } = event.target;
      setCustomerForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    };

    // Select individual row selection
    const handleRowSelect = (id) => {
      setSelectedRows((prevSelected) => {
        if (prevSelected.includes(id)) {
          return prevSelected.filter((selectedId) => selectedId !== id); // Unselect
        } else {
          return [...prevSelected, id]; // Select
        }
      });
      console.log("Selected Rows:", selectedRows);
    };

    //"Select All" checkbox
    const handleSelectAll = () => {
      if (isAllSelected) {
        setSelectedRows([]); // Unselect all
      } else {
        setSelectedRows(customers.map((customer) => customer.id)); // Select all by ID
      }
    };

    // Save 
    const handleSave = async () => {
      if (!customerForm.name || !customerForm.number) {
        alert('Please fill the form');
        return;
      }
    
      try {
        await createCustomer(customerForm); // Send data to backend
        const response = await getCustomers(); // Fetch updated customer list
        setCustomers(response.data); // Update state with fresh data
        setCustomerForm({ name: '', number: '', address: '' }); // Reset form
      } catch (error) {
        console.error('Error creating customer:', error);
      }
    };

    const handleUpdate = async (id, updatedData) => {
  console.log("Updating ID:", id);
  try {
    await updateCustomer(id, updatedData);
    setCustomers(prev =>
      prev.map(cust => (cust.id === id ? { ...cust, ...updatedData } : cust))
    );

    // Exit Edit Mode & Clear Selection
    setEditRowId(null);
    setEditedRow({});
    setSelectedRows([]);
  } catch (error) {
    console.error("Error updating customer:", error);
  }
};
    
    // Delete
    const handleDelete = async () => {
      if (selectedRows.length === 0) {
        alert("Please select at least one customer to delete.");
        return;
      }
    
      try {
        await Promise.all(selectedRows.map((id) => deleteCustomer(id)));
        
        console.log("Deleted successfully, now fetching updated customers...");
    
        // Fetch updated customers list
        const response = await getCustomers();
        console.log("Updated customers list:", response.data);
    
        setCustomers(response.data); 
        setSelectedRows([]); // Clear selection
    
      } catch (error) {
        console.error("Error deleting customers:", error);
      }
    };
  

  return (
    <div>
        <form action="submit" className='flex gap-5 justify-between'>
            <TextField fullWidth label="Customer Name" name="name"  required  value={customerForm.name} onChange={handleChange}/>
            <TextField fullWidth type='tel' label="Mobile Number" name="number" required value={customerForm.number} onChange={handleChange} />
            <TextField fullWidth type='text' label="Address" name="address" value={customerForm.address} onChange={handleChange}/>
            <Button fullWidth variant="contained" startIcon={<SaveIcon />} onClick={handleSave}  >Save </Button>
        </form>

        <TableComponent data={customers} heading={`Customers`} selectedRows={selectedRows} setSelectedRows={setSelectedRows} onDelete={handleDelete} handleRowSelect={handleRowSelect} handleSelectAll={handleSelectAll} handleUpdate={handleUpdate}/>
    </div>
  )
}

export default Customers;
