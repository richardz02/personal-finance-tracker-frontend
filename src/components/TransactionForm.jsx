import { useState } from "react";
import axios from "axios";

function TransactionForm({ onTransactionAdded }) {
  const [typeInput, setTypeInput] = useState("INCOME");
  const [amountInput, setAmountInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");

  // Send form data to backend API to create new transaction
  async function createTransaction() {
    // TODO: Add checks to make sure user input fields are of correct data type

    try {
      const transaction = {
        transactionType: typeInput,
        amount: parseFloat(amountInput),
        description: descriptionInput,
      };

      const response = await axios.post(
        "http://127.0.0.1:8080/api/v1/transactions",
        transaction
      );

      // Tell parent to refresh data
      onTransactionAdded();

      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  // Handle submission on form
  function handleSubmit(e) {
    e.preventDefault();

    createTransaction();

    // Clear field data
    setTypeInput("");
    setAmountInput("");
    setDescriptionInput("");
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="transactionTypeDropdown">Transaction Type: </label>
        <select
          name="transactionTypeDropdown"
          id="transactionTypeDropdown"
          value={typeInput}
          onChange={(e) => setTypeInput(e.target.value)}
        >
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
        </select>
      </div>

      <div className="form-row">
        <label htmlFor="amount">Amount: </label>
        <input
          type="text"
          id="amount"
          value={amountInput}
          onChange={(e) => setAmountInput(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          id="description"
          value={descriptionInput}
          onChange={(e) => setDescriptionInput(e.target.value)}
        />
      </div>

      <input type="submit" value="Add" className="submit-btn" />
    </form>
  );
}

export default TransactionForm;
