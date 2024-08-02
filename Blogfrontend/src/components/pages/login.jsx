import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";
import lottie from "lottie-web";
import animationData from "../../assets/img/animacionRegistro.json";
import axios from 'axios';

const Login = ({ setView }) => {
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");  // Estado para errores

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        const response = await axios.post('https://blog-mn1w.onrender.com/login', { email, password });
        if (response.status === 200) {
          const { token, userId, userRole } = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('userId', userId); // Guardar userId en localStorage
          localStorage.setItem('view', 'blackboard'); // Actualiza la vista en localStorage
          localStorage.setItem('userRole', userRole); // Asumimos que userData.role contiene el rol del usuario
          setView('blackboard'); // Actualiza el estado local
        }
      } catch (error) {
        setError(error.response?.data?.error || "Error desconocido");
      }
    }
    setValidated(true);
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light p-4">
      <Card className="w-100 max-w-sm p-4">
        <Card.Body>
          <div ref={container} style={{ width: '100%', height: '200px', marginBottom: '20px' }}></div>
          <h1 className="text-center mb-4">Inicia sesión</h1>
          {error && <Alert variant="danger">{error}</Alert>} {/* Mostrar errores */}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="danger" className="w-100 mb-3">
              Iniciar sesión
            </Button>
            <p className="text-center mb-3">o</p>
            <Button variant="outline-secondary" className="w-100 mb-3">
              Usar un código de inicio de sesión
            </Button>
            <Form.Group className="mb-3 d-flex align-items-center">
              <Form.Check
                type="checkbox"
                id="remember"
                label="Recuérdame"
                className="me-2"
              />
            </Form.Group>
            <p className="text-center mb-3">
              <a href="#" className="text-primary">¿Olvidaste la contraseña?</a>
            </p>
            <p className="text-center">
              ¿Primera vez en el blog? <a href="#" className="text-primary">Suscríbete ahora</a>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
