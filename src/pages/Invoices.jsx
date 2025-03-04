import { useState, useEffect } from 'react';
import InvoiceTable from '../components/InvoiceTable';
import { getInvoices } from '../services/apiService';

function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await getInvoices();
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, []);
  
  return (
    <div>
      <InvoiceTable data={invoices} setData={setInvoices} />
    </div>
  );
}

export default Invoices;
