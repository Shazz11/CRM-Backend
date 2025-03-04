import React from "react";
import { useLocation } from "react-router-dom";
// import jsPDF from "jspdf";

function InvoiceDetails() {
  const location = useLocation();
  const { invoice } = location.state || {};

  if (!invoice) return <h2>No Invoice Found</h2>;

  

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text("Invoice Details", 20, 20);
    doc.text(`Customer: ${invoice.name}`, 20, 40);
    doc.text(`Mobile: ${invoice.number}`, 20, 50);
    doc.text(`Date: ${invoice.date}`, 20, 60);
    doc.text("Products:", 20, 80);

    let y = 90;
    invoice.products.forEach((item, index) => {
      doc.text(`${index + 1}. ${item.product} - ₹${item.price} x ${item.quantity} + GST ${item.gst}% = ₹${item.total}`, 20, y);
      y += 10;
    });

    doc.text(`Total Amount: ₹${invoice.Total}`, 20, y + 10);
    doc.save(`Invoice_${invoice.id}.pdf`);
  };

  return (
    <div style={{ padding: "20px", border: "1px solid black", width: "60%", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Invoice</h2>
      <p><strong>Customer:</strong> {invoice.name}</p>
      <p><strong>Mobile:</strong> {invoice.number}</p>
      <p><strong>Date:</strong> {invoice.date}</p>

      <table border="1" width="100%" style={{ marginTop: "10px", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>GST (%)</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.products.map((item, index) => (
            <tr key={index}>
              <td>{item.product}</td>
              <td>₹{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.gst}%</td>
              <td>₹{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ textAlign: "right", marginTop: "10px" }}>Grand Total: ₹{invoice.total}</h3>

      <button onClick={handleDownload} style={{ padding: "10px", background: "blue", color: "white", border: "none", cursor: "pointer", marginTop: "10px" }}>
        Download Invoice
      </button>
    </div>
  );
}

export default InvoiceDetails;
