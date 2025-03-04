import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

function TableComponent({ data , onEdit, onDelete, heading, selectedRows, setSelectedRows, handleRowSelect, handleSelectAll, setData, handleUpdate }) {
  const [editRowId, setEditRowId] = useState(null); // Track which row is being edited
  const [editedRow, setEditedRow] = useState({}); // Store edited values

  useEffect(() => {
    console.log("Updated selectedRows:", selectedRows);
  }, [selectedRows]);

  if (!Array.isArray(data) || data.length === 0) {
    return <p className="text-center text-gray-500 mt-5">No Data Available</p>;
  }

  const columns = Object.keys(data[0]).filter(col => col !== "id"); // Hide ID column
  const isAllSelected = selectedRows.length === data.length;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // Format as DD-MM-YY
  };

  const handleEdit = () => {
    if (selectedRows.length > 0) {
      const firstSelectedId = selectedRows[0]; // Get selected row ID
      const rowToEdit = data.find(row => row.id === firstSelectedId);
      if (rowToEdit) {
        setEditRowId(firstSelectedId);
        setEditedRow({ ...rowToEdit });
      }
    }
  };
  
  const handleSaveEdit = async () => {
    await handleUpdate(editRowId, editedRow); // ✅ Update customer
    setEditRowId(null);  // ✅ Exit edit mode
    setEditedRow({});    // ✅ Clear edit state
    setSelectedRows([]); // ✅ Unselect row
  };
  
  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRow(prev => ({ ...prev, [name]: value }));
  };

  // Cancel Editing
  const handleCancelEdit = () => {
    setEditRowId(null);
    setEditedRow({});
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-lg mt-8">
      {/* Header */}
      <div className="bg-zinc-700 text-white py-4 px-7 flex justify-between items-center">
        <h2 className="text-xl">{heading}</h2>
        <div className="flex gap-3">
          <IconButton onClick={onDelete} disabled={selectedRows.length === 0}>
            <DeleteIcon className="text-white transition duration-300 ease-in-out active:scale-90 active:text-red-500" />
          </IconButton>
          <IconButton onClick={handleEdit} disabled={selectedRows.length === 0}>
            <EditIcon className="text-white transition duration-300 ease-in-out active:scale-90 active:text-blue-500" />
          </IconButton>
        </div>
      </div>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          {/* Table Head */}
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox checked={isAllSelected} onChange={handleSelectAll} />
              </TableCell>
              {columns.map((col, index) => (
                <TableCell key={index}>{col.charAt(0).toUpperCase() + col.slice(1)}</TableCell>
              ))}
              {editRowId && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Checkbox checked={selectedRows.includes(row.id)} onChange={() => handleRowSelect(row.id)} />
                </TableCell>
                
                {/* Edit Mode */}
                {editRowId === row.id ? (
                  <>
                    {columns.map((col, colIndex) => (
                      <TableCell key={colIndex}>
                        <TextField
                          name={col}
                          value={editedRow[col]}
                          onChange={handleInputChange}
                        />
                      </TableCell>
                    ))}
                    <TableCell>
                      <IconButton  onClick={handleSaveEdit}>
                        <SaveIcon className="text-green-500" />
                      </IconButton>
                      <IconButton onClick={handleCancelEdit}>
                        <CloseIcon className="text-red-500" />
                      </IconButton>
                    </TableCell>
                  </>
                ) : (
                  columns.map((col, colIndex) => (
                    <TableCell key={colIndex}>{col.includes("date") ? formatDate(row[col]) : row[col]}</TableCell>
                  ))
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableComponent;
