import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Grid,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    TablePagination,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditForm from '../Component/EditForm';

function VendorList() {
    const [data, setData] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const showVendor = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/vendor/get-vendors');
            const respdata = response.data;
            setData(respdata);
            console.log(respdata);
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelete = (id) => {
        setItemToDelete(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/vendor/delete-vendor/${itemToDelete}`);
            toast.success("Vendor deleted successfully");
            setData(data.filter((vendor) => vendor._id !== itemToDelete));
        } catch (e) {
            console.log(e);
            toast.error("Error deleting vendor");
        }

        setShowDeleteModal(false);
    };

    const cancelDelete = () => {
        setItemToDelete(null);
        setShowDeleteModal(false);
    };

    const handleEdit = (vendor) => {
        setShowEditForm(true);
        setSelectedVendor(vendor);
    };

    const saveEditedVendor = (editedVendor) => {
        axios.post(`http://localhost:5000/api/vendor/edit/${editedVendor._id}`, editedVendor)
            .then(() => {
                const updatedData = data.map((vendor) => (vendor._id === editedVendor._id ? editedVendor : vendor));
                setData(updatedData);
                toast("data updated successfully");

                setShowEditForm(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        showVendor();
    }, []);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeItemsPerPage = (event) => {
        setItemsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Vendor List
                    </Typography>
                    <span>Total Number of Vendors is {data.length}</span>
                </Toolbar>
            </AppBar>
            {showDeleteModal && (
                <div className="delete-modal">
                    <div>
                        <p>Are you sure you want to delete this vendor?</p>
                        <div className="btn">
                            <Button onClick={confirmDelete} variant="contained" color="primary">Yes</Button>
                            <Button onClick={cancelDelete} variant="contained" color="secondary">No</Button>
                        </div>
                    </div>
                </div>
            )}
            {showEditForm && selectedVendor && (
                <EditForm
                    vendor={selectedVendor}
                    onSave={saveEditedVendor}
                    onCancel={() => setShowEditForm(false)}
                />
            )}
            <ToastContainer />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Vendor Name</TableCell>
                                        <TableCell>Bank Account</TableCell>
                                        <TableCell>Bank Name</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentData.map((vendor, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{vendor.vendorname}</TableCell>
                                            <TableCell>{vendor.bankaccount}</TableCell>
                                            <TableCell>{vendor.bankname}</TableCell>
                                            <TableCell>
                                                <EditIcon onClick={() => handleEdit(vendor)} />
                                                <DeleteIcon onClick={() => handleDelete(vendor._id)} style={{ color: "red" }} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
            <TablePagination
                component="div"
                count={data.length}
                page={currentPage}
                onPageChange={handleChangePage}
                rowsPerPage={itemsPerPage}
                onRowsPerPageChange={handleChangeItemsPerPage}
            />
        </div>
    );
}

export default VendorList;
