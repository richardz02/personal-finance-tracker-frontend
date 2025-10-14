import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

function TransactionSummary({ summary }) {
  // Deconstruct the transactionSummary object
  // If the object is null, all fields have default value of 0
  const { totalIncome = 0, totalExpense = 0, balance = 0 } = summary || {};

  return (
    <>
      <Box display="flex" justifyContent="center" gap={3} mt={3}>
        <Card
          sx={{
            minWidth: 200,
            backgroundColor: "#e8f5e9", // light green
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <CardContent>
            <Typography variant="h6" color="text.secondary">
              Total Income
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="green">
              ${totalIncome ?? 0}
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            minWidth: 200,
            backgroundColor: "#ffebee", // light red
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <CardContent>
            <Typography variant="h6" color="text.secondary">
              Total Expense
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="red">
              ${totalExpense ?? 0}
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            minWidth: 200,
            backgroundColor: "#e3f2fd", // light blue
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <CardContent>
            <Typography variant="h6" color="text.secondary">
              Balance
            </Typography>
            <Typography
              variant="h5"
              fontWeight="bold"
              color={balance >= 0 ? "green" : "red"}
            >
              ${balance ?? 0}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default TransactionSummary;
