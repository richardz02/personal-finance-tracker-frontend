import "./App.css";
import TransactionForm from "./components/TransactionForm";
import TransactionTable from "./components/TransactionTable";
import Button from "./components/Button";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

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

  // After any changes made to the transaction table, fetch the new list of transactions to display
  const refreshTransactions = () => {
    fetchTransactions();
  };

  return (
    <>
      <h1>Personal Finance Tracker</h1>
      <TransactionForm onTransactionAdded={refreshTransactions} />
      <TransactionTable
        transactions={transactions}
        onTransactionDeleted={refreshTransactions}
      />
    </>
  );
}

export default App;
