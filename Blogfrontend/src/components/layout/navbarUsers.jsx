import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//Se llaman los componentes de react-bootstrap
import { Navbar, Nav, Container, Button } from "react-bootstrap";

//Importo la modal

import ModalNewEntrada from "./modalNewEntrada";

const BlogNavbarUsers = ({ setView, onLogout }) => {
    const [showModal, setShowModal]=useState(false);
    const handleShow=()=>setShowModal(true);
    const handleClose=()=>setShowModal(false);
  // Obtén el rol del usuario desde el localStorage
  const userRole = localStorage.getItem("userRole"); 

  //Retornamos la vista
  return (
    <>
    

    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#blackboard" onClick={() => setView("blackboard")}>
          Blog NARVA
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link
              href="#personalInfo"
              onClick={() => setView("personalInfo")}
            >
              Información personal
            </Nav.Link>
            <Nav.Link href="#aboutUs" onClick={() => setView("aboutUs")}>
              Sobre nosotros
            </Nav.Link>
            <Nav.Link
              href="#logout"
              onClick={(e) => {
                e.preventDefault();
                console.log("Botón de salir clickeado");
                onLogout();
              }}
            >
              Salir
            </Nav.Link>
{/* Operacion en la que se decide si es admin o es users para mostrar elementos */}
{userRole === "admin" && (
  <Button
    style={{
      backgroundColor: "#000",  // Fondo negro
      color: "#fff",            // Texto blanco
      borderColor: "#fff",      // Borde blanco
      borderRadius: "5px",      // Bordes redondeados
      padding: "10px 20px",     // Espaciado interno
      fontWeight: "bold",       // Negrita para el texto
    }}
    className="me-2"
    onClick={handleShow}
  >
    Crear una nueva publicación
  </Button>
)}

       
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <ModalNewEntrada  show={showModal} handleClose={handleClose} />
    </>
  );
};

export default BlogNavbarUsers;
