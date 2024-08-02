import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
 

      if (!userId) {
        setError('No se encontró el ID del usuario en el almacenamiento local.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`https://blog-mn1w.onrender.com/usuarios/traerUsuarioId/${userId}`);
    

        // Asumimos que la respuesta es un array y tomamos el primer elemento
        const userData = response.data[0] || {};

        setFormData({
          nombre: userData.nombre || '',
          email: userData.email || '',
          password: '', // No se recomienda prellenar contraseñas por razones de seguridad
        });
      } catch (error) {
        setError('Error al obtener los datos del usuario.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    if (!userId) {
      setError('No se encontró el ID del usuario en el almacenamiento local.');
      return;
    }

    try {
      await axios.put(`https://blog-mn1w.onrender.com/usuarios/${userId}`, formData);
      alert('Datos actualizados con éxito.');
    } catch (error) {
      setError('Error al actualizar los datos del usuario.');
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light p-3">
      <h2 className="text-center mb-3">Información Personal</h2>
      <Card className="w-75 max-w-sm bg-white p-3 rounded-sm shadow-sm">
        <Card.Body>
          {loading ? (
            <p>Cargando...</p>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2" controlId="formNombre">
                <Form.Label className="fs-6">Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Ingresa tu nombre"
                  size="sm"
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formCorreo">
                <Form.Label className="fs-6">Correo Electrónico</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ingresa tu correo electrónico"
                  size="sm"
                />
              </Form.Group>

              <Form.Group className="mb-2" controlId="formPassword">
                <Form.Label className="fs-6">Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Ingresa tu contraseña"
                  size="sm"
                />
              </Form.Group>

              <Button variant="success" type="submit" size="sm">
                Guardar
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PersonalInfo;
