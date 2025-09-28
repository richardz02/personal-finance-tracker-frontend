import "./App.css";
import TransactionForm from "./components/TransactionForm";
import TransactionTable from "./components/TransactionTable";
import SummaryTable from "./components/SummaryTable";
import Button from "./components/Button";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchTransactions();
    fetchSummary();
  }, []);

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

  // After any changes made to the transaction table, fetch the new list of transactions to display
  const refreshTransactions = () => {
    fetchTransactions();
    fetchSummary();
  };

  return (
    <>
      <h1>Hello, Richard!</h1>
      <p>This is your finance overview</p>
      <TransactionForm onTransactionAdded={refreshTransactions} />
      <TransactionTable
        transactions={transactions}
        onTransactionDeleted={refreshTransactions}
      />
      {/* <Button
        button_text="Create Summary"
        button_id="summary-btn"
        handleOnClick={fetchSummary}
      /> */}
      <SummaryTable transactionSummary={summary} />
    </>
  );
}

export default App;
