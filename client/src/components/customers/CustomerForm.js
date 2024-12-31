import axios from "axios";
import React, { useState } from "react";
import './CustomerForm.css'

function CustomerForm({ getCustomers }) {
  const [customerName, setCustomerName] = useState("");
  const [loading, setLoading] = useState(false);  // To manage the loading state
  const [error, setError] = useState("");  // To manage error messages

  async function saveCustomer(e) {
    e.preventDefault();
    setLoading(true);  // Start loading

    try {
      const customerData = {
        name: customerName,
      };
      
      // Send request to backend to save customer
      await axios.post("http://localhost:5000/customer/", customerData);

      // Refresh customer list after successful save
      getCustomers();
      
      // Reset the form and clear the error
      setCustomerName("");
      setError("");
    } catch (err) {
      // Handle error and show message to the user
      console.error(err);
      setError("Failed to save customer. Please try again.");
    } finally {
      setLoading(false);  // End loading regardless of success or failure
    }
  }

  return (
    <div className="customer-form">
      <form onSubmit={saveCustomer}>
        <input
          type="text"
          placeholder="Customer name"
          onChange={(e) => setCustomerName(e.target.value)}
          value={customerName}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save new customer"}
        </button>
      </form>

      {/* Display error message if there is one */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default CustomerForm;
