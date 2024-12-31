import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";
import './Customers.css';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);  // For loading state
  const [error, setError] = useState("");  // For error handling

  // Fetch customers from the server
  async function getCustomers() {
    setLoading(true);  // Start loading
    setError("");  // Clear previous errors
    try {
      const customersRes = await axios.get(`${process.env.REACT_APP_URL}/customer`);
      setCustomers(customersRes.data);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError("Failed to load customers. Please try again later.");
    } finally {
      setLoading(false);  // End loading
    }
  }

  useEffect(() => {
    getCustomers();  // Fetch customers when the component mounts
  }, []);

  return (
    <div className="customers-container">
      <h1>Customers</h1>
      <div className="customer-form-container">
        <CustomerForm getCustomers={getCustomers} />
      </div>
      <div className="customer-list-container">
        {loading ? (
          <p>Loading customers...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <CustomerList
            customers={customers}
            getCustomers={getCustomers}
            setLoading={setLoading}
            setError={setError}
          />
        )}
      </div>
    </div>
  );
}

export default Customers;
