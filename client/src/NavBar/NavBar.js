import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import nav from './nav.css'

const NavBar = () => {
    const navigate = useNavigate();
    const user = sessionStorage.getItem('authenticatedUser');

    const handleLogout = () => {
        sessionStorage.removeItem('authenticatedUser');
        navigate('/login');
    };

    useEffect(() => { }, [sessionStorage.getItem('authenticatedUser')])

    return (
        <Navbar bg="dark" expand="lg" >
            <Navbar.Brand href="#home" style={{ color: 'white' }}>VENDOR MANAGEMENT</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" color='dark' bg="light" >
                <Nav className="ms-auto">
                    <Nav.Link as={NavLink} to="/vendor" style={{ color: 'white' }}>
                        Vendor
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/createvendor" style={{ color: 'white' }}>
                        Create Vendor
                    </Nav.Link>
                    {user ? (
                        <Button variant="primary" onClick={handleLogout}>
                            Log Out
                        </Button>
                    ) : (
                        ''
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
