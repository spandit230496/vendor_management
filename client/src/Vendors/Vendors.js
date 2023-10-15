import React, { useEffect, useState } from 'react';
import axios from 'axios';
import css from './css.css'
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
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10)


    const showVendor = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/vendor/get-vendors');
            const respdata = response.data;
            setData(respdata);
            console.log(respdata)
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
                toast("data updated successfully")

                setShowEditForm(false);
            })
            .catch((error) => {

                console.log(error);
            });
    };

    const cancelEdit = () => {
        setShowEditForm(false);
    };

    useEffect(() => {
        showVendor();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <h1>Vendor List</h1> <span>Total Number of Vendors is {data.length}</span>
            {showDeleteModal && (
                <div className="delete-modal">
                    <div>
                        <p>Are you sure you want to delete this vendor?</p>
                        <div className='btn'>
                            <button onClick={confirmDelete} className='primary'>Yes</button>
                            <button onClick={cancelDelete} className='danger'>No</button>
                        </div>
                    </div>
                </div>
            )}
            {showEditForm && selectedVendor && (
                <EditForm
                    vendor={selectedVendor}
                    onSave={saveEditedVendor}
                    onCancel={cancelEdit}
                />
            )}
            <ToastContainer />
            <div style={{ width: '50%', overflowX: 'auto' }} className='table'>
                <div style={{ overflowX: 'auto' }}>

                    <table className='data' style={{ width: '100%', tableLayout: 'fixed', height: "20px", borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th>Vendor Name</th>
                                <th>Bank Account</th>
                                <th>Bank Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{ textAlign: 'center', }}>
                            {currentData.map((vendor, index) => (
                                <tr key={index}>
                                    <td>{vendor.vendorname}</td>
                                    <td>{vendor.bankaccount}</td>
                                    <td>{vendor.bankname}</td>
                                    <td>
                                        <EditIcon onClick={() => handleEdit(vendor)} />
                                        <DeleteIcon onClick={() => handleDelete(vendor._id)} style={{ color: "red" }} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>



                    <div className="pagination">
                        <ul>
                            {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
                                <li key={index}>
                                    <button onClick={() => paginate(index + 1)}>{index + 1}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>



        </div>
    );
}

export default VendorList;
