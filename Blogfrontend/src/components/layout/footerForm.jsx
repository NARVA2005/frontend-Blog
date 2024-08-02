import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import Swal from "sweetalert2";
const FooterForm = () => {
  const [validated, setValidated] = useState(false);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    // Realiza la llamada a la API para obtener la lista de países
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        // Mapear los datos de la API para obtener solo el nombre y el código del país
        const countryList = data.map((country) => ({
          code: country.cca2,
          name: country.name.common,
        }));
        setCountries(countryList);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }else{
      event.preventDefault();
      Swal.fire({
        icon: 'success',
        title: 'Formulario enviado',
        text: 'Todos los campos están completos y el formulario ha sido enviado con éxito.',
      });
    }

    setValidated(true);
  };

  return (
    <Container className="py-4">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Nombre</Form.Label>
            <Form.Control required type="text" placeholder="Nombre" />
            <Form.Control.Feedback>Completado!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Apellido</Form.Label>
            <Form.Control required type="text" placeholder="Apellido" />
            <Form.Control.Feedback>Completado!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Correo</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Correo"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback>Completado!</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom07">
            <Form.Label>Pais</Form.Label>
            <Form.Select as="select" required>
              <option value="">Pais de origen</option>
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback>Completado!</Form.Control.Feedback>
          </Form.Group>
        </Row>
       
        <Button type="submit" className="btn-success">Enviar datos</Button>
      </Form>

    </Container>
  );
};

export default FooterForm;
