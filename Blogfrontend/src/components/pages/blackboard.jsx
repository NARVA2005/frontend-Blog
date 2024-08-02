import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import AgregarComentario from "../layout/agregarComentario";
import ListarEntradas from "../layout/listarEntradas";
import BuscarEntradas from "../layout/buscarEntrada";
import BlogNavbarUsers from "../layout/navbarUsers";
import PersonalInfo from "../layout/personalInfo"; // Asegúrate de tener este componente
import AboutUs from "../layout/aboutUs"; // Asegúrate de tener este componente

const ParentComponent = () => {
  const [datos, setDatos] = useState([]);
  const [entradaSeleccionada, setEntradaSeleccionada] = useState(null);
  const [view, setView] = useState("home"); // Inicializa el estado de la vista
  const [scrolling, setScrolling] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Si estás usando un token
    localStorage.removeItem("view"); // Limpia el estado de view en localStorage
    setView("home"); // Cambia la vista a login
    window.location.href = "/home"; // Redirige a la página de login
  };
  useEffect(() => {
    // Obtén el ID del usuario desde localStorage
    const idUsuario = localStorage.getItem("userId");
    setUserId(idUsuario);
  }, []);

  const renderContent = () => {
    switch (view) {
      case "personalInfo":
        return <PersonalInfo />;
      case "aboutUs":
        return <AboutUs />;
      default:
        return (
          <Row>
            <Col md={8}>
              <Card className="p-4">
                <ListarEntradas
                  datos={datos}
                  setDatos={setDatos}
                  setEntradaSeleccionada={setEntradaSeleccionada}
                />
              </Card>
            </Col>
            <Col md={4}>
              <Card
                className={`p-4 ${scrolling ? "position-sticky" : ""}`}
                style={{ top: scrolling ? "20px" : "auto" }}
              >
                <aside className="lateral">
                  <BuscarEntradas datos={datos} setDatos={setDatos} />
                  {entradaSeleccionada && (
                    <AgregarComentario
                      entrada={entradaSeleccionada}
                      userId={userId}
                    />
                  )}
                </aside>
              </Card>
            </Col>
          </Row>
        );
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 200) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container fluid>
      <BlogNavbarUsers setView={setView} onLogout={handleLogout} />{" "}
      {/* Pasa la función onLogout aquí */}
      <main className="py-4">{renderContent()}</main>
      <footer className="footer bg-dark text-white text-center py-4">
        <p>
          &copy; BLOG REACT -{" "}
          <a href="https://blogreact.quest/" className="text-white">
            blogreact.quest
          </a>
        </p>
      </footer>
    </Container>
  );
};

export default ParentComponent;
