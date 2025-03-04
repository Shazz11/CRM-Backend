import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

function BillingTable({ data, onDelete, heading, selectedRows, setSelectedRows }) {
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
  
    return (
      <div className="rounded-lg overflow-hidden shadow-lg mt-8">
        <div className="bg-zinc-700 text-white py-4 px-7 flex justify-between items-center">
          <h2 className="text-xl">{heading}</h2>
          <IconButton onClick={onDelete} disabled={selectedRows.length === 0}>
            <DeleteIcon className="text-white transition duration-300 ease-in-out active:scale-90 active:text-red-500" />
          </IconButton>
        </div>
  
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox checked={isAllSelected} onChange={handleSelectAll} />
                </TableCell>
                {Object.keys(data[0] || {}).map((col, index) => (
                  <TableCell key={index}>{col.charAt(0).toUpperCase() + col.slice(1)}</TableCell>
                ))}
              </TableRow>
            </TableHead>
  
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(index)}
                      onChange={() => handleRowSelect(index)}
                    />
                  </TableCell>
                  {Object.keys(row).map((col, colIndex) => (
                    <TableCell key={colIndex}>{row[col]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
  

export default BillingTable;
