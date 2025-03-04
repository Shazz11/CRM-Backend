import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SaveIcon from '@mui/icons-material/Save';
import BillingTable from '../components/BillingTable';
import {createCustomer, createInvoice} from '../services/apiService'

function Billing() {
    const [selectedRows, setSelectedRows] = useState([]); // Store selected row indices
    const [rows, setRows] = useState([]); 
    const [totalAmount, setTotalAmount] = useState(0);
    const [formData, setFormData] = useState({ 
        name: '', 
        number: '', 
        products: [],
        total: ''
    });

    const [newProduct, setNewProduct] = useState({ 
        product: '', 
        price: '', 
        quantity: '', 
        gst: '',
    });

    const handleProductChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const calculateProductTotal = ({ price, quantity, gst }) => {
        price = parseFloat(price) || 0;
        quantity = parseFloat(quantity) || 0;
        gst = parseFloat(gst) || 0;
        
        let subtotal = price * quantity;
        let gstAmount = (subtotal * gst) / 100;
        return parseFloat((subtotal + gstAmount).toFixed(2));
    };

    const handleAddProduct = () => {
        if ( !formData.name  || !formData.number || !newProduct.product || !newProduct.price || !newProduct.quantity) {
            alert('Please fill all product details before adding!');
            return;
        }
    
        let productTotal = calculateProductTotal(newProduct);
        let newProductData = { 
            ...newProduct, 
            total: productTotal 
        };
    
        setRows(prevRows => {
            const updatedRows = [...prevRows, newProductData];
            const newTotalAmount = updatedRows.reduce((acc, item) => acc + item.total, 0); // Corrected total amount
    
            setTotalAmount(newTotalAmount); // Update total amount correctly
    
            setFormData(prev => ({
                ...prev,
                products: updatedRows, 
                total: newTotalAmount // Use new totalAmount, not old state
            }));
    
            return updatedRows;
        });
    
        setNewProduct({ product: '', price: '', quantity: '', gst: '' });
    };
    

    const handleDelete = () => {
        setRows((prevRows) => {
            const updatedRows = prevRows.filter((_, index) => !selectedRows.includes(index));
            
            // Update formData.products also
            setFormData(prev => ({
                ...prev,
                products: updatedRows, // Remove deleted rows
                total: updatedRows.reduce((acc, item) => acc + item.total, 0) // Recalculate total
            }));
    
            return updatedRows;
        });
    
        setSelectedRows([]); // Clear selection after deletion
    };
    
      
    
    const handleEdit = (index) => {
        // alert('This Feature is Not Availabel!')
        console.log('Click')    
    };

    const handleSubmit = async() => {
        if (rows.length === 0) {
            alert('Please add at least one product before saving!');
            return;
        }

        try{
            await createInvoice(formData)
            console.log(formData);
            setFormData({ name: '', number: '', products: [] });
            setRows([]);
            setTotalAmount(0);
        } catch(error){
            console.log(`Error Creating Invoice: ${error}`)
        }
    };

      // Sample Data
  const products = [
    // { product: 'coffee', price: 50, quantity: 2, gst: 10, total: 110 },
    // { product: 'tea', price: 150, quantity: 1, gst: 18, total: 177 },
    // { product: 'siu', price: 150, quantity: 1, gst: 18, total: 177 },
  ];

  // Handle individual row selection
  const handleRowSelect = (index) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((i) => i !== index); // Unselect
      } else {
        return [...prevSelected, index]; // Select
      }
    });
    console.log(index)
  };

    // Handle "Select All" checkbox
    const handleSelectAll = () => {
      if (isAllSelected) {
        setSelectedRows([]); // Unselect all
      } else {
        setSelectedRows(data.map((_, index) => index)); // Select all
      }
    }; 

    return (
        <div className="bg-white rounded-lg w-full">
            <form className="grid grid-cols-2 gap-4">
                <TextField fullWidth label="Customer Name" name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                <TextField fullWidth label="Mobile Number" name="number" value={formData.number} onChange={(e) => setFormData({...formData, number: e.target.value})} required type="tel" />
                <TextField fullWidth label="Product Name" name="product" value={newProduct.product} onChange={handleProductChange} required />
                <TextField fullWidth label="Product Price" name="price" value={newProduct.price} onChange={handleProductChange} required type="number" />
                <TextField fullWidth label="Quantity" name="quantity" value={newProduct.quantity} onChange={handleProductChange} required type="number" />
                <TextField fullWidth label="GST %" name="gst" value={newProduct.gst} onChange={handleProductChange} required type="number" />

                <div className="col-span-2 flex justify-center gap-4 mt-4">
                    <Button variant="contained" startIcon={<AddCircleIcon />} onClick={handleAddProduct}>Add Product</Button>
                    <Button variant="contained" startIcon={<SaveIcon />} color="success" onClick={handleSubmit}>Save Bill</Button>
                </div>
            </form>

            {/* <TableComponent data={rows} onDelete={handleDelete} onEdit={handleEdit} heading={`Total Amount: ₹${totalAmount} `} selectedRows={selectedRows} setSelectedRows={setSelectedRows} handleRowSelect={handleRowSelect} handleSelectAll={handleSelectAll} /> */}
            <BillingTable data={rows} onDelete={handleDelete} onEdit={handleEdit} heading={`Total Amount: ₹${totalAmount} `} selectedRows={selectedRows} setSelectedRows={setSelectedRows} handleRowSelect={handleRowSelect} handleSelectAll={handleSelectAll} />
        </div>
    );
}

export default Billing;
