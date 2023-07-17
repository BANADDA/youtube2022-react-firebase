import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { Download } from "@mui/icons-material";
import Stack from '@mui/material/Stack';

const Products = () => {
  const [rows, setRows] = useState([]);
  const [columnNames, setColumnNames] = useState([]);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Gallery"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        setRows(data);

        // Get column names from the first document
        if (data.length > 0) {
          const columns = Object.keys(data[0]);
          setColumnNames(columns);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchGalleryData();
  }, []);

  const downloadCSV = () => {
    const csvContent = [
      columnNames.join(","), // Header row
      ...rows.map((row) => Object.values(row).join(",")), // Data rows
    ].join("\n");
    const csvBlob = new Blob([csvContent], { type: "text/csv" });
    const csvURL = URL.createObjectURL(csvBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = csvURL;
    downloadLink.download = "data.csv";
    downloadLink.click();
  };

  const downloadJSON = () => {
    const jsonContent = JSON.stringify(rows, null, 2);
    const jsonBlob = new Blob([jsonContent], { type: "application/json" });
    const jsonURL = URL.createObjectURL(jsonBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = jsonURL;
    downloadLink.download = "data.json";
    downloadLink.click();
  };

  return (
    <div>
    <Stack direction="row" spacing={2}>
      <Button onClick={downloadCSV} variant="outlined" startIcon={<Download />}>
      Download CSV
      </Button>
      <Button onClick={downloadJSON} variant="contained" endIcon={<Download />}>
      Download JSON
      </Button>
    </Stack>
      <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columnNames.map((columnName) => (
                <TableCell className="tableCell" key={columnName}>
                  {columnName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {columnNames.map((columnName) => (
                  <TableCell className="tableCell" key={`${row.id}-${columnName}`}>
                    {row[columnName]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Products;
