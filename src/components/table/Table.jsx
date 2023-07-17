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

const List = () => {
  const [rows, setRows] = useState([]);
  const [columnNames, setColumnNames] = useState([]);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Accounts"));
        const data = querySnapshot.docs.map((doc) => doc.data());
        setRows(data);

          // Get column names from the first document
          if (data.length > 0) {
            // Use let instead of const to allow reassignment
            let columns = Object.keys(data[0]);
            // Filter out the img column
            columns = columns.filter((column) => column !== "img");
            setColumnNames(columns);
          }
        } catch (error) {
          console.log(error);
        }
    };

    fetchGalleryData();
  }, []);

  return (
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
  );
};

export default List;
