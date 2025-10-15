import "./App.css";
import axios from "axios";

import { useEffect, useState, useCallback } from "react";

import { Button, ButtonGroup } from "@mui/material";

import TransactionSummary from "./components/TransactionSummary";
import TransactionForm from "./components/TransactionForm";
import TransactionTable from "./components/TransactionTable";

function App() {
  const [openForm, setOpenForm] = useState(false); // Boolean variable to open/close form
  const [editTransaction, setEditTransaction] = useState(null); // Boolean variable, whether we are editing an existing transaction
  const [transactions, setTransactions] = useState([]); // List of transactions to display in the table
  const [summary, setSummary] = useState(null); // Transaction summary
  const [period, setPeriod] = useState("day"); // Time period in which we want to display our summaries for

  // Get summary
  const fetchTransactionSummary = useCallback(async () => {
    const currentDate = new Date();
    const isoFormattedDate = currentDate.toISOString();
    try {
      console.log(
        "Fetching summaries for " +
          period +
          " with current date: " +
          isoFormattedDate
      );
      const response = await axios.get(
        `http://127.0.0.1:8080/api/v1/transactions/summary?period=${period}`
      );
      setSummary(response.data.data.summary);
      setTransactions(response.data.data.transactions);
    } catch (error) {
      console.log(error);
    }
  }, [period]);

  useEffect(() => {
    fetchTransactionSummary();
  }, [fetchTransactionSummary]);

  const handleEditTransaction = (transaction) => {
    setEditTransaction(transaction);
    setOpenForm(true);
  };

  // After any changes made to the transaction table, fetch the new list of transactions to display, and also update summary
  const refreshTransactions = () => {
    fetchTransactionSummary();
  };

  // Handles opening and closing transaction form
  const handleOpenForm = () => {
    setEditTransaction(null); // Clear previous transaction
    setOpenForm(true); // Open form
  };
  const handleCloseForm = () => {
    setOpenForm(false); // Close form
  };

  return (
    <>
      {/* After establishing the user feature, we should be able to dynamically greet each user */}
      <h1>Hello, Richard!</h1>
      <p>This is your finance overview</p>

      <ButtonGroup variant="text">
        <Button onClick={() => setPeriod("day")}>Daily</Button>
        <Button onClick={() => setPeriod("week")}>Weekly</Button>
        <Button onClick={() => setPeriod("month")}>Monthly</Button>
        <Button onClick={() => setPeriod("year")}>Yearly</Button>
        <Button onClick={() => setPeriod("all")}>All time</Button>
      </ButtonGroup>

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
