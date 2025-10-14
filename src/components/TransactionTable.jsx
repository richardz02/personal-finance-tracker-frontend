import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import ActionCell from "./ActionCell";

function TransactionTable({
  transactions,
  refreshTransactions,
  onAddClick,
  onEditClick,
}) {
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

        // Refresh after deleting transaction
        refreshTransactions();

        console.log(response.data.message);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const columns = [
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "transactionType",
      headerName: "Transaction Type",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount",
      headerName: "Amount($)",
      flex: 1,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 2,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      renderCell: (params) => (
        <ActionCell
          row={params.row}
          onEdit={(row) => onEditClick(row)}
          onDelete={(id) => handleDelete(id)}
        />
      ),
    },
  ];

  return (
    <Box sx={{ width: "90%", margin: "20px auto" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Transactions
        </Typography>
        <Button variant="contained" color="primary" onClick={onAddClick}>
          Add
        </Button>
      </Box>
      <Paper
        elevation={3}
        sx={{
          height: 400,
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <DataGrid
          rows={transactions}
          columns={columns}
          pageSize={5}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          getRowId={(row) => row.id}
          sx={{
            border: 0,
            fontFamily: "Roboto, sans-serif",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
              fontSize: 14,
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #eee",
              fontSize: 13,
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#fafafa",
            },
            "& .MuiCheckbox-root": {
              color: "#1976d2 !important",
            },
          }}
          getCellClassName={(params) => {
            if (params.field === "transactionType") {
              return params.value === "INCOME" ? "income-cell" : "expense-cell";
            }
            return "";
          }}
        />
      </Paper>
    </Box>
  );
}

export default TransactionTable;
