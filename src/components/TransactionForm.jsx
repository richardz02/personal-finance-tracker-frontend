import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import { MenuItem } from "@mui/material";

function TransactionForm({
  open,
  transaction,
  handleCloseForm,
  onTransactionAdded,
  onTransactionUpdated,
}) {
  const [typeInput, setTypeInput] = useState("INCOME");
  const [amountInput, setAmountInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  useEffect(() => {
    if (transaction) {
      setTypeInput(transaction.transactionType);
      setAmountInput(transaction.amount.toString());
      setDescriptionInput(transaction.description);
    } else {
      setTypeInput("INCOME");
      setAmountInput("");
      setDescriptionInput("");
    }
  }, [transaction]);

  // Send form data to backend API to create new transaction
  async function createTransaction(data) {
    // TODO: Add checks to make sure user input fields are of correct data type

    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/api/v1/transactions",
        data
      );

      // Tell parent to refresh data
      onTransactionAdded();

      // Close the form after submitting data
      handleCloseForm();

      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  // Send updated transaction data to backend API to update a transaction
  const updateTransaction = async (data) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8080/api/v1/transactions/${transaction.id}`,
        data
      );
      console.log(response.data.message);

      // Refresh the list of transactions after updating an existing transaction
      onTransactionUpdated();

      // Close the form after submitting data
      handleCloseForm();
    } catch (error) {
      console.log(error);
    }
  };

  // Handle submission on form
  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      transactionType: typeInput,
      amount: parseFloat(amountInput),
      description: descriptionInput,
    };

    if (transaction) {
      updateTransaction(data);
    } else {
      createTransaction(data);
    }

    // Clear field data, leave transaction type as is
    setAmountInput("");
    setDescriptionInput("");
  }

  const transactionType = [
    {
      value: "INCOME",
      label: "Income",
    },
    {
      value: "EXPENSE",
      label: "Expense",
    },
  ];

  return (
    <Dialog open={open} onClose={handleCloseForm}>
      <DialogTitle>
        {transaction ? "Edit Transaction" : "Create New Transaction"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="transactionType"
            select
            label="Transaction Type"
            type="text"
            fullWidth
            variant="standard"
            value={typeInput}
            onChange={(e) => setTypeInput(e.target.value)}
          >
            {transactionType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            id="amount"
            label="Amount"
            type="text"
            fullWidth
            variant="standard"
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            multiline
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
          <DialogActions>
            <Button onClick={handleCloseForm}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TransactionForm;
