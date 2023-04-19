import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Skeleton, Stack, TextField, Typography } from '@mui/material';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    brentRadius: '10px',
    p: 3,
};

function LabSold() {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    const [listBooks, setListBooks] = useState([]);
    const [storage, setStorage] = useState([]);

    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [nameLab, setNameLab] = useState('');
    const [nameStudent, setNameStudent] = useState('');
    const [sdt, setSdt] = useState('');
    const [address, setAddress] = useState('');
    const [codeBook, setCodeBook] = useState('');
    const [price, setPrice] = useState(0);

    const [openModalPenalty, setOpenModalPenalty] = useState(false);
    const [idRent, setIdRent] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`http://localhost:5001/lab/rent/${localStorage.getItem('idPage')}`);
                const resStorage = await axios.get(`http://localhost:5001/lab/${localStorage.getItem('idPage')}`);
                console.log(res.data);
                setRows(res.data.rents.reverse());
                setNameLab(res.data.nameLab);
                setListBooks(res.data.books);
                setStorage(resStorage.data.lab.storage);
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

    const getPriceByID = (id) => {
        const book = listBooks.find((book) => {
            return book._id === id;
        });
        return book.price;
    };

    const getDate = (data) => {
        let date = new Date(data);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return dt + '/' + month + '/' + year;
    };

    const compareDate = (data) => {
        let date = new Date(data);
        let today = new Date();
        let ms1 = date.getTime();
        let ms2 = today.getTime();
        return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
    };

    const handleCreateRent = async () => {
        const rest = storage.filter((item) => {
            return item.id !== codeBook;
        });
        const bookImport = storage.find((item) => {
            return item.id === codeBook;
        });
        var amount = bookImport.amount - 1;
        console.log(amount);

        try {
            await axios.post('http://localhost:5001/lab/updateAmount', {
                id: localStorage.getItem('idPage'),
                storage: [{ id: codeBook, amount: amount }, ...rest],
            });

            const res = await axios.post('http://localhost:5001/lab/createRent', {
                idLab: localStorage.getItem('idPage'),
                nameLab: nameLab,
                nameStudent: nameStudent,
                sdt: sdt,
                address: address,
                price: Number(price),
                idBook: codeBook,
            });

            if (res.data.create) {
                alert(res.data.msg);
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
    };
    const handleRentPenalty = async () => {
        try {
            const res = await axios.post('http://localhost:5001/lab/createRentPenalty', {
                idRent: idRent,
                error: error,
                idLab: localStorage.getItem('idPage'),
                status: 'lab',
            });
            if (res.data.create) {
                alert(res.data.msg);
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
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
                    <Button
                        sx={{ marginLeft: '10px' }}
                        onClick={() => setOpenModalCreate(true)}
                        variant="outlined"
                        color="secondary"
                    >
                        Tạo hóa đơn
                    </Button>
                    {rows.length > 0 ? (
                        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Tên sản phẩm</TableCell>
                                    <TableCell>ID khách hàng</TableCell>
                                    <TableCell>Giá</TableCell>
                                    <TableCell>Thời gian</TableCell>
                                    <TableCell>Bảo hành</TableCell>
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
                                            {row.nameBook}
                                        </TableCell>
                                        <TableCell>{row.idStudent}</TableCell>
                                        <TableCell>{PriceVND(row.price)}</TableCell>
                                        <TableCell>{getDate(row.createdAt)}</TableCell>
                                        <TableCell>
                                            {compareDate(row.createdAt) > 365 ? (
                                                <Button
                                                    onClick={() => {}}
                                                    variant="outlined"
                                                    disabled
                                                    color="secondary"
                                                >
                                                    Hết bảo hành
                                                </Button>
                                            ) : (
                                                <>
                                                    {row.status === 'not penalty' ? (
                                                        <Button
                                                            onClick={() => {
                                                                setIdRent(row._id);
                                                                setOpenModalPenalty(true);
                                                            }}
                                                            variant="outlined"
                                                            color="primary"
                                                        >
                                                            Bảo hành
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            onClick={() => {}}
                                                            sx={{
                                                                color: 'red !important',
                                                                brent: '1px solid red !important',
                                                            }}
                                                            disabled
                                                            variant="outlined"
                                                        >
                                                            Đang bảo hành
                                                        </Button>
                                                    )}
                                                </>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <Stack spacing={1} sx={{padding: '0 10px'}}>
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                            </Stack>
                    )}
                </TableContainer>
            </Box>
            {/* Modal create rent */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalCreate}
                onClose={() => setOpenModalCreate(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalCreate}>
                    <Box sx={styleModal}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Tạo hóa đơn
                        </Typography>
                        <TextField
                            sx={{ margin: '10px 0' }}
                            label="Tên Đại lý"
                            variant="standard"
                            fullWidth
                            type="text"
                            value={nameLab}
                        />
                        <TextField
                            sx={{ margin: '10px 0' }}
                            label="Tên khách hàng"
                            variant="standard"
                            fullWidth
                            type="text"
                            value={nameStudent}
                            onChange={(e) => setNameStudent(e.target.value)}
                        />
                        <TextField
                            sx={{ margin: '10px 0' }}
                            label="Số điện thoại"
                            variant="standard"
                            fullWidth
                            type="number"
                            value={sdt}
                            onChange={(e) => setSdt(e.target.value)}
                        />
                        <TextField
                            sx={{ margin: '10px 0' }}
                            label="Địa chỉ"
                            variant="standard"
                            fullWidth
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <FormControl fullWidth sx={{ margin: '10px 0' }}>
                            <InputLabel id="demo-simple-select-label">Mã Sản phẩm</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={codeBook}
                                label="Mã sản phẩm"
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setCodeBook(e.target.value);
                                    setPrice(getPriceByID(e.target.value));
                                }}
                            >
                                {listBooks.map((book) => {
                                    return (
                                        <MenuItem key={book._id} value={book._id}>
                                            {book.code}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <TextField
                            sx={{ margin: '10px 0' }}
                            label="Giá sản phẩm"
                            variant="standard"
                            fullWidth
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />

                        <Button
                            sx={{ marginTop: '10px' }}
                            variant="contained"
                            fullWidth
                            type="submit"
                            onClick={handleCreateRent}
                        >
                            Xác nhận
                        </Button>
                    </Box>
                </Fade>
            </Modal>
            {/* Modal penalty rent */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalPenalty}
                onClose={() => setOpenModalPenalty(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalPenalty}>
                    <Box sx={styleModal}>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ textAlign: 'center' }}
                        >
                            Chuyển vào danh sách bảo hành
                        </Typography>

                        <TextField
                            sx={{ marginTop: '15px' }}
                            label="Lỗi sản phẩm"
                            variant="standard"
                            fullWidth
                            type="text"
                            value={error}
                            onChange={(e) => setError(e.target.value)}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                            <Button
                                sx={{ marginTop: '10px' }}
                                color="secondary"
                                variant="contained"
                                type="submit"
                                onClick={() => setOpenModalPenalty(false)}
                            >
                                Hủy bỏ
                            </Button>
                            <Button
                                sx={{ marginTop: '10px', marginLeft: '10px' }}
                                variant="contained"
                                type="submit"
                                onClick={handleRentPenalty}
                            >
                                Xác nhận
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default LabSold;
