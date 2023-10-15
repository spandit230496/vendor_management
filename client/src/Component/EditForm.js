import React, { useState } from 'react';
import css from '../Vendors/css.css'
import { ToastContainer, toast } from 'react-toastify';

function EditForm({ vendor, onSave, onCancel }) {
    const [editedVendor, setEditedVendor] = useState({ ...vendor });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedVendor({ ...editedVendor, [name]: value });
    };

    const handleSave = () => {
        onSave(editedVendor);

    };

    return (
        <div className='edit-modal'>
            <ToastContainer />
            <form className='from'>
                <label>Vendor Name:</label>
                <input
                    type="text"
                    name="vendorname"
                    value={editedVendor.vendorname}
                    onChange={handleInputChange}
                />

                <label>Bank Account:</label>
                <input
                    type="text"
                    name="bankaccount"
                    value={editedVendor.bankaccount}
                    onChange={handleInputChange}
                />

                <label>Bank Name:</label>
                <input
                    type="text"
                    name="bankname"
                    value={editedVendor.bankname}
                    onChange={handleInputChange}
                />
                <div className='btn2'>
                    <button onClick={handleSave} className='primary'>Save</button>
                    <button onClick={onCancel} className='danger'>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default EditForm;
