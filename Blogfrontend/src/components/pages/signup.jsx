import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Container, Alert } from 'react-bootstrap';
import lottie from "lottie-web";
import animationData from "../../assets/img/animacionRegistro.json";
import axios from 'axios';

const Signup = ({ setView }) => {
  const container = useRef(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: animationData,
    });
    return () => {
      animation.destroy();
    };
  }, []);

  const [validated, setValidated] = useState(false);
  const [nombre, setNombre] = useState('');
  const [identificacion, setIdentificacion] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para manejar el mensaje de error

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await axios.post('https://blog-mn1w.onrender.com/usuarios', { 
          identificacion,
          nombre,
          email,
          password,
        });
        console.log(response.data); 
        setView('login');
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
        setError(error.response?.data?.error || 'Error al registrar el usuario.'); // Actualizar el mensaje de error
      }
    }
    setValidated(true);
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light p-4">
      <div ref={container} style={{ width: '100%', height: '200px', marginBottom: '20px' }}></div>
      <h1 className="text-center mb-4">Regístrate</h1>
      {error && <Alert variant="danger">{error}</Alert>} {/* Mostrar el mensaje de error */}
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="bg-light p-4 rounded-lg shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Identificación</Form.Label>
          <Form.Control
            type="number"
            placeholder="Identificación"
            value={identificacion}
            onChange={(e) => setIdentificacion(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" variant="danger" className="w-100 mb-3">
          Registrarme
        </Button>
        <p className="text-center mb-3">o</p>
        <Button variant="secondary" className="w-100 mb-3">
          Usar un código de registro
        </Button>
        <Form.Group className="mb-3 d-flex align-items-center">
          <Form.Check
            type="checkbox"
            id="acceptTerms"
            label="Acepto los términos y condiciones"
            className="me-2"
          />
        </Form.Group>
        <p className="text-center">
          ¿Ya tienes una cuenta? <a href="login" className="text-primary">Inicia sesión</a>
        </p>
      </Form>
    </Container>
  );
};

export default Signup;
