import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from 'react-bootstrap';

const BlogNavbar = ({ setView }) => {

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
            
                <Navbar.Brand href="#home" onClick={() => setView('home')}>Blog NARVA</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse  id="basic-navbar-nav">
                    <Nav className="ml-auto" >
                        <Nav.Link href="#login" onClick={() => setView('login')}>Iniciar sesión</Nav.Link>
                        <Nav.Link href="#signup" onClick={() => setView('signup')}>Registrarse</Nav.Link>
                    
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BlogNavbar;
