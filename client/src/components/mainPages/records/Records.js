import { useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

export default function Records({ dataRows, handleDeleteCallBack }) {

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const handleChangePage = (newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const columns = [
        { id: 'address', label: "Property Address" },
        { id: 'type', label: 'Expense Type', minWidth: 170, align: 'right' },
        { id: 'amount', label: 'Expense Amount', minWidth: 100, align: 'right' },
        { id: 'schedule', label: 'Schedule', minWidth: 100, align: 'right' },
        {
            id: 'Delete',
            minWidth: 100,
            align: 'right'
        }
    ]

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            dataRows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell component='th' scope="row">
                                                {row.propertyAddress}
                                            </TableCell>
                                            <TableCell align="right">{row.type}</TableCell>
                                            <TableCell align="right">{row.amount}</TableCell>
                                            <TableCell align="right">{row.currentType}</TableCell>
                                            <TableCell align="right">
                                                <Button variant="outlined" color="error" onClick={() => handleDeleteCallBack(row.id)}>
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={dataRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

{/* <TableRow
key={row.id}
sx={{
    '&:last-child td, &:last-child th': { border: 0 }
}}
>
<TableCell component='th' scope="row">
    {row.propertyAddress}
</TableCell>
<TableCell align="right">{row.type}</TableCell>
<TableCell align="right">{row.amount}</TableCell>
<TableCell align="right">{row.currentType}</TableCell>
<TableCell align="right">
    <Button variant="outlined" color="error" onClick={() => handleDeleteCallBack(row.id)}>
        Delete
    </Button>
</TableCell>
</TableRow> */}