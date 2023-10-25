import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'


const defaultTheme = createTheme();

export default function CreatedVendor() {

    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const vendorData = {
            vendorname: formData.get('vendorname'),
            bankaccount: formData.get('bankaccount'),
            bankname: formData.get('bankname'),
            addressline1: formData.get('address1'),
            addressline2: formData.get('address2'),
            city: formData.get('city'),
            pincode: formData.get('pincode'),
            country: formData.get('country'),
        };

        console.log(vendorData)

        try {
            const response = await axios.post('https://vendor-uq4e.onrender.com/api/vendor/register', vendorData);
            toast.success("vendor created successfully")


        } catch (error) {
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <ToastContainer />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create Vendor
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="given-name"
                                    name="vendorname"
                                    required
                                    fullWidth
                                    id="vendorname"
                                    label="Vendor Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="Bank Account"
                                    name="bankaccount"
                                    required
                                    fullWidth
                                    id="bankaccount"
                                    label="Bank Account Number"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="Bank Name"
                                    name="bankname"
                                    required
                                    fullWidth
                                    id="bankname"
                                    label="Bank Name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="Address"
                                    name="address1"
                                    fullWidth
                                    id="address1"
                                    label="Address Line 1"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    autoComplete="Address2"
                                    name="address2"
                                    fullWidth
                                    id="address2"
                                    label="Address Line 2"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="city"
                                    label="City"
                                    id="city"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="pincode"
                                    label="Pin Code"
                                    id="pincode"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="country"
                                    label="Country"
                                    id="country"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
