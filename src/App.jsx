import "./App.css";
import TransactionForm from "./components/TransactionForm";
import TransactionTable from "./components/TransactionTable";
import { useEffect, useState } from "react";
import axios from "axios";
import TransactionSummary from "./components/TransactionSummary";

function App() {
  const [openForm, setOpenForm] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchTransactions();
    fetchSummary();
  }, []);

  const handleEditTransaction = (transaction) => {
    setEditTransaction(transaction);
    setOpenForm(true);
  };

  // Get the list of all transactions from the backend
  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8080/api/v1/transactions"
      );
      setTransactions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Get summary
  const fetchSummary = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8080/api/v1/transactions/summary"
      );
      setSummary(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // After any changes made to the transaction table, fetch the new list of transactions to display, and also update summary
  const refreshTransactions = () => {
    fetchTransactions();
    fetchSummary();
  };

  // Handles opening and closing transaction form
  const handleOpenForm = () => {
    setEditTransaction(null); // Clear previous transaction
    setOpenForm(true);
  };
  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <>
      {/* After establishing the user feature, we should be able to dynamically greet each user */}
      <h1>Hello, Richard!</h1>
      <p>This is your finance overview</p>
      <TransactionSummary summary={summary} />
      <TransactionForm
        open={openForm}
        transaction={editTransaction}
        handleCloseForm={handleCloseForm}
        onTransactionAdded={refreshTransactions}
        onTransactionUpdated={refreshTransactions}
      />
      <TransactionTable
        transactions={transactions}
        refreshTransactions={refreshTransactions}
        onAddClick={handleOpenForm}
        onEditClick={handleEditTransaction}
      />
    </>
  );
}

export default App;
