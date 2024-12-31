import axios from "axios";
import './CustomerList.css'
function CustomerList({ customers, getCustomers, setLoading, setError }) {
  
  async function deleteCustomer(id) {
    console.log(`Deleting customer with ID: ${id}`);
    setLoading(true);
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/customer/${id}`);
      getCustomers();
    } catch (err) {
      console.error("Error deleting customer:", err);
      setError("Failed to delete customer. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <ul>
        {customers.map((customer) => (
          <li key={customer._id || customer.id} className='customer-list'>
            {customer.name}{" "}
            <button className="delete-Btn"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this customer?')) {
                  deleteCustomer(customer._id || customer.id);
                }
              }}
            >
             <i className="fas fa-trash"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerList;
