import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, IconButton, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { deleteInvoice, getInvoices, updateInvoice } from '../services/apiService';

function InvoiceTable({ data, setData }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedRow, setEditedRow] = useState({});
  const navigate = useNavigate();

  const isAllSelected = selectedRows.length === data.length;

  if (!Array.isArray(data) || data.length === 0) {
    return <p className="text-center text-gray-500 mt-5">No Data Available</p>;
  }
  const handleRowSelect = (index) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(isAllSelected ? [] : data.map((_, index) => index));
  };

  const handleDelete = async () => {
    if (selectedRows.length === 0) {
      alert("Please select at least one invoice to delete.");
      return;
    }

    try {
      const idsToDelete = selectedRows.map((index) => data[index].id);
      await Promise.all(idsToDelete.map((id) => deleteInvoice(id)));
      
      console.log("Deleted successfully, now fetching updated invoices...");
      const response = await getInvoices();
      console.log("Updated invoices list:", response.data);
      
      setData(response.data);
      setSelectedRows([]);
    } catch (error) {
      console.error("Error deleting invoices:", error);
    }
  };

  const handleEdit = () => {
    if (selectedRows.length > 0) {
      const firstSelectedIndex = selectedRows[0];
      setEditIndex(firstSelectedIndex);
      setEditedRow({ ...data[firstSelectedIndex] });
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditedRow({});
  };

  const handleSaveEdit = async () => {
    try {
      await updateInvoice(editedRow.id, editedRow);
      const response = await getInvoices();
      setData(response.data);
      setEditIndex(null);
      setEditedRow({});
    } catch (error) {
      console.error("Error updating invoice:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRow((prev) => ({ ...prev, [name]: value }));
  };

  const handleView = (invoice) => {
    navigate('/invoice', { state: { invoice } });
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <div className="bg-zinc-700 text-white py-4 px-7 flex justify-between items-center">
        <h2 className="text-xl">Invoices</h2>
        <div>
          <IconButton onClick={handleEdit} disabled={selectedRows.length === 0}>
            <EditIcon className="text-white transition duration-300 ease-in-out active:scale-90 active:text-blue-500" />
          </IconButton>
          <IconButton onClick={handleDelete} disabled={selectedRows.length === 0}>
            <DeleteIcon className="text-white transition duration-300 ease-in-out active:scale-90 active:text-red-500" />
          </IconButton>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox checked={isAllSelected} onChange={handleSelectAll} />
              </TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell>
                    <Checkbox checked={selectedRows.includes(rowIndex)} onChange={() => handleRowSelect(rowIndex)} />
                  </TableCell>

                  {editIndex === rowIndex ? (
                    <>
                      <TableCell>
                        <TextField name="name" value={editedRow.name || ''} onChange={handleInputChange} />
                      </TableCell>
                      <TableCell>
                        <TextField name="number" value={editedRow.number || ''} onChange={handleInputChange} />
                      </TableCell>
                      <TableCell>
                        <TextField name="date" value={editedRow.date || ''} onChange={handleInputChange} />
                      </TableCell>
                      <TableCell>
                        <TextField name="total" value={editedRow.total || ''} onChange={handleInputChange} />
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={handleSaveEdit}>
                          <SaveIcon className="text-green-500" />
                        </IconButton>
                        <IconButton onClick={handleCancelEdit}>
                          <CloseIcon className="text-red-500" />
                        </IconButton>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.number}</TableCell>
                      <TableCell>{formatDate(row.date)}</TableCell>
                      <TableCell>{row.total}</TableCell>
                      <TableCell>
                        <Button variant="outlined" color="primary" size="small" onClick={() => handleView(row)}>
                          View
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No invoices found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default InvoiceTable;































/* ===================================================================================================================================================== 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, IconButton, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

function InvoiceTable({ data, setData }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedRow, setEditedRow] = useState(null);
  const navigate = useNavigate();

  const isAllSelected = selectedRows.length === data.length;

  const handleRowSelect = (index) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(isAllSelected ? [] : data.map((_, index) => index));
  };

  const handleDelete = () => {
    setData(data.filter((_, index) => !selectedRows.includes(index)));
    setSelectedRows([]);
  };

  const handleEdit = () => {
    if (selectedRows.length > 0) {
      const firstSelectedIndex = selectedRows[0];
      setEditIndex(firstSelectedIndex);
      setEditedRow({ ...data[firstSelectedIndex] });
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditedRow(null);
  };

  const handleSaveEdit = () => {
    const updatedData = [...data];
    updatedData[editIndex] = editedRow;
    setData(updatedData);
    setEditIndex(null);
    setEditedRow(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRow((prev) => ({ ...prev, [name]: value }));
  };

  const handleView = (row) => {
    navigate('/invoice', { state: { invoice } });
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <div className="bg-zinc-700 text-white py-4 px-7 flex justify-between items-center">
        <h2 className="text-xl">Invoices</h2>
        <div>
          <IconButton onClick={handleEdit} disabled={selectedRows.length === 0}>
            <EditIcon className="text-white transition duration-300 ease-in-out active:scale-90 active:text-blue-500" />
          </IconButton>
          <IconButton onClick={handleDelete} disabled={selectedRows.length === 0}>
            <DeleteIcon className="text-white transition duration-300 ease-in-out active:scale-90 active:text-red-500" />
          </IconButton>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox checked={isAllSelected} onChange={handleSelectAll} />
              </TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>
                  <Checkbox checked={selectedRows.includes(rowIndex)} onChange={() => handleRowSelect(rowIndex)} />
                </TableCell>

                {editIndex === rowIndex ? (
                  <>
                    <TableCell><TextField name="customer" value={editedRow.customer} onChange={handleInputChange} /></TableCell>
                    <TableCell><TextField name="mobile" value={editedRow.mobile} onChange={handleInputChange} /></TableCell>
                    <TableCell><TextField name="Date" value={editedRow.Date} onChange={handleInputChange} /></TableCell>
                    <TableCell><TextField name="Total" value={editedRow.Total} onChange={handleInputChange} /></TableCell>
                    <TableCell>
                      <IconButton onClick={handleSaveEdit}><SaveIcon className="text-green-500" /></IconButton>
                      <IconButton onClick={handleCancelEdit}><CloseIcon className="text-red-500" /></IconButton>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>{row.customer}</TableCell>
                    <TableCell>{row.mobile}</TableCell>
                    <TableCell>{row.Date}</TableCell>
                    <TableCell>{row.Total}</TableCell>
                    <TableCell>
                      <Button variant="outlined" color="primary" size="small" onClick={() => handleView(row)}>View</Button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default InvoiceTable;
======================================================================================================================================================= */