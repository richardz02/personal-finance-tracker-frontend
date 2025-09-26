import axios from "axios";

function TransactionTable({ transactions, onTransactionDeleted }) {
  // TODO: handle edit

  // Handles deletion of a transaction
  const handleDelete = async (transactionId) => {
    let confirmation = confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (confirmation) {
      try {
        const response = await axios.delete(
          `http://127.0.0.1:8080/api/v1/transactions/${transactionId}`
        );

        onTransactionDeleted();

        console.log(response.data.message);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <td
              className={
                transaction.transactionType === "INCOME" ? "income" : "expense"
              }
            >
              {transaction.date}
            </td>
            <td>{transaction.transactionType}</td>
            <td>${transaction.amount}</td>
            <td>{transaction.description}</td>
            <td>
              <button className="edit-btn">Edit</button>
              <button
                onClick={() => handleDelete(transaction.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionTable;
