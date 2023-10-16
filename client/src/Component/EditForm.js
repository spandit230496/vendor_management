import React, { useState } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

const EditForm = ({ vendor, onSave, onCancel }) => {
    const [editedVendor, setEditedVendor] = useState({ ...vendor });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedVendor({ ...editedVendor, [name]: value });
    };

    const handleSave = () => {
        onSave(editedVendor);
    };

    return (
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
            <ToastContainer />
            <Grid item xs={12}>
                <form className="form">
                    <TextField
                        fullWidth
                        label="Vendor Name"
                        name="vendorname"
                        value={editedVendor.vendorname}
                        onChange={handleInputChange}
                        style={{ marginBottom: '10px' }} // Add margin bottom
                    />
                    <TextField
                        fullWidth
                        label="Bank Account"
                        name="bankaccount"
                        value={editedVendor.bankaccount}
                        onChange={handleInputChange}
                        style={{ marginBottom: '10px' }} // Add margin bottom
                    />
                    <TextField
                        fullWidth
                        label="Bank Name"
                        name="bankname"
                        value={editedVendor.bankname}
                        onChange={handleInputChange}
                        style={{ marginBottom: '10px' }} // Add margin bottom
                    />
                    <Box mt={2} display="flex" justifyContent="space-between">
                        <Button variant="contained" color="primary" onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant="contained" color="secondary" onClick={onCancel}>
                            Cancel
                        </Button>
                    </Box>
                </form>
            </Grid>
        </Grid>
    );
};

export default EditForm;
