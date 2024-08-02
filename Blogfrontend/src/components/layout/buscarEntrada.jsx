import React, { useState, useRef, useCallback } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const BuscarEntradas = ({ datos, setDatos }) => {
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);

  // Debounce function to delay API call
  const debounce = (func, delay) => {
    return (...args) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => func(...args), delay);
    };
  };

  const buscarPublicacion = useCallback(
    debounce(async (busquedaTexto) => {
      setError(null);
      try {
        if (busquedaTexto.length === 0) {
          const response = await axios.get('https://blog-mn1w.onrender.com/entradas/traerTodos');
          setDatos(response.data);
        } else {
          const response = await axios.get(`https://blog-mn1w.onrender.com/entradas/TraerEntradaTitulo/${busquedaTexto}`);
          setDatos(response.data);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Error al buscar publicaciones');
      }
    }, 300),
    [setDatos]
  );

  const handleInputChange = (e) => {
    const busquedaTexto = e.target.value;
    setBusqueda(busquedaTexto);
    buscarPublicacion(busquedaTexto);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    buscarPublicacion(busqueda);
  };

  return (
    <Container>
      <Card className="mt-2 p-1">
        <Card.Body>
          <div className="search">
            <h4 className="title">Buscador</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="search_field">
                <Form.Control
                  type="text"
                  name="busqueda"
                  value={busqueda}
                  onChange={handleInputChange}
                  placeholder="Buscar..."
                />
              </Form.Group>
              <Button variant="primary" id="search" type="submit">
                Buscar
              </Button>
            </Form>
            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BuscarEntradas;
