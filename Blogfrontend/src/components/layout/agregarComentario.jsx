import React from "react";
import { Container, Form, FormControl, Button, Card } from "react-bootstrap";
import axios from 'axios';

const AgregarComentario = ({ entrada = {}, userId }) => {
  console.log('Entrada en AgregarComentario:', entrada);
  console.log('userId en AgregarComentario:', userId); // Verifica el valor del userId

  const getDatosFrm = async (e) => {
    e.preventDefault();
    let descripcion = e.target.descripcion.value;
    let comentario = {
      Contenido: descripcion,
      fechaComentario: new Date().toISOString().split('T')[0],
      Usuarios_idUsuarios: userId,
      Entradas_idEntradas: entrada.idEntradas || 2, // Aquí debes asegurar que entrada tenga un id válido
    };
    console.log('Comentario:', comentario); // Verifica los datos antes de enviar

    try {
      const response = await axios.post('https://blog-mn1w.onrender.com/comentarios', comentario);
      console.log(response.data);
      e.target.reset();
    } catch (error) {
      console.error('Error al agregar comentario:', error);
    }
  };

  return (
    <Container>
      <Card className="mt-4 p-1">
        <Card.Body id="titulo">
          <h4 className="title">Agregar Comentario</h4>
          <Form onSubmit={getDatosFrm}>
            <FormControl
              as="input"
              id="Titulos"
              name="titulo"
              value={entrada.Titulos || "Sin título"}
              disabled
            />
            <hr />
            <FormControl
              as="textarea"
              id="descripcion"
              name="descripcion"
              placeholder="Descripción"
              required
            />
            <Button type="submit" id="save" variant="primary" className="mt-2">
              Guardar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AgregarComentario;
