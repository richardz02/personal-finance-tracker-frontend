function SummaryTable({ transactionSummary }) {
  return (
    <>
      {transactionSummary && (
        <table className="summary-table">
          <thead>
            <tr>
              <th>Total Income</th>
              <th>Total Expense</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${transactionSummary.totalIncome}</td>
              <td>${transactionSummary.totalExpense}</td>
              <td>${transactionSummary.balance}</td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
}

export default SummaryTable;
