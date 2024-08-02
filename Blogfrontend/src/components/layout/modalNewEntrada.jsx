import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Image } from "react-bootstrap";
import axios from "axios";

const ModalNewEntrada = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    contenido: "",
    imagen: "",
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen" && files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    const fechaActual = new Date().toISOString().split('T')[0];

    data.append("Titulos", formData.titulo);
    data.append("Contenido", formData.contenido);
    data.append("imagen", formData.imagen);
    data.append("fechaPublicacion", fechaActual);

    try {
      const response = await axios.post("https://blog-mn1w.onrender.com/entradas", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      handleClose();
    } catch (error) {
      console.error("Error al guardar la publicación:", error);
    }
  };

  useEffect(() => {
    if (!show) {
      setFormData({
        titulo: "",
        contenido: "",
        imagen: "",
      });
      setPreview(null);
    }
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Crear Nueva Publicación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el título"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contenido</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingresa el contenido"
              name="contenido"
              value={formData.contenido}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="file"
              name="imagen"
              onChange={handleChange}
              required
            />
            {preview && (
              <Image src={preview} thumbnail className="mt-3" />
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            Guardar Publicación
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalNewEntrada;
