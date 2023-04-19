import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Skeleton, Stack } from '@mui/material';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LabStorage() {
    const [rows, setRows] = useState([]);
    const [storage, setStorage] = useState([]);
    const navigate = useNavigate();

    const getAmount = (id) => {
        const result = storage.filter((item) => item.id === id);
        return result.length > 0 ? result[0].amount : 0;
      };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`http://localhost:5002/lab/${localStorage.getItem('idPage')}`);
                console.log(res.data)
                setRows(res.data.books);
                setStorage(res.data.lab.storage);
            } catch (err) {
                console.error(err);
            } 
        };
        getData();
    }, []);

    const PriceVND = (price) => {
        const priceVND = Intl.NumberFormat('en-US').format;
        return priceVND(price);
    };

    return (
        <>
            <Box
                id="style-2"
                sx={{
                    backgroundColor: '#fff',
                    width: 'calc(100% - var(--default-layout-width-sidebar))',
                    height: 'calc(100vh - var(--default-layout-height-header))',
                    float: 'right',
                    overflowY: 'scroll',
                }}
            >
                <Button onClick={() => navigate('/lab')} variant="outlined" sx={{ margin: '10px' }}>
                    <KeyboardArrowLeftOutlinedIcon />
                    Quay lại
                </Button>

                <TableContainer sx={{ marginTop: '10px' }} component={Paper}>
                    {rows.length > 0 ? (
                        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Mã Sản Phẩm</TableCell>
                                    <TableCell>Tên sản phẩm</TableCell>
                                    <TableCell>Giá</TableCell>
                                    <TableCell>Số lượng</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow
                                        id={row._id}
                                        className="row"
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { brent: 0 } }}
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell component="th" scope="row" sortDirection="desc">
                                            {row.code}
                                        </TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{PriceVND(row.price)}</TableCell>
                                        <TableCell>{getAmount(row._id)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <>
                            <Stack spacing={1} sx={{padding: '0 10px'}}>
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                            </Stack>
                        </>
                    )}
                </TableContainer>
            </Box>
        </>
    );
}

export default LabStorage;
