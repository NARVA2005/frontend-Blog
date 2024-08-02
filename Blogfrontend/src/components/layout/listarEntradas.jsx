import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Modal, Spinner, Alert } from "react-bootstrap";
import { FaComment } from "react-icons/fa";
import ModalComentarios from "./modalComentarios";

const BASE_URL = "https://blog-mn1w.onrender.com/img/"; // Asegúrate de ajustar esto a la ruta correcta

const ListarEntradas = ({ datos, setDatos, setEntradaSeleccionada }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);

  const mostrarDatosEntrada = async (postId) => {
    try {
      const response = await axios.get(`https://blog-mn1w.onrender.com/entradas/TraerEntradaId/${postId}`);
      const entradaData = response.data.length > 0 ? response.data[0] : {};
      setEntradaSeleccionada(entradaData);
    } catch (error) {
      console.error('Error fetching entrada', error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://blog-mn1w.onrender.com/entradas/traerTodos');
        console.log('Publicaciones:', response.data);
        setDatos(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Error al obtener las publicaciones');
        setLoading(false);
      }
    };

    fetchPosts();
  }, [setDatos]);

  const fetchComments = async (postId) => {
    try {
      const response = await axios.get(`https://blog-mn1w.onrender.com/comentarios/TraerTodosID/${postId}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleOpenModal = (post) => {
    setSelectedPost(post);
    fetchComments(post.idEntradas);
    setShowModal(true);
  };

  const idEntrada = (post) => {
    setSelectedPost(post);
    mostrarDatosEntrada(post.idEntradas);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPost(null);
    setComments([]);
  };

  return (
    <>
      <Modal.Body style={{ maxHeight: '60vh', overflowY: 'auto' }}>
        <Container className="col-8">
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : datos.length === 0 ? (
            <h2>No hay publicaciones en la base de datos</h2>
          ) : (
            <Row xs={1} md={1} className="g-5">
              {datos.map((post) => (
                <Col key={post.idEntradas}>
                  <Card
                    className="mb-3"
                    onClick={() => idEntrada(post)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Card.Footer>
                      <small className="text-muted">Publicado el {post.fechaPublicacion}</small>
                    </Card.Footer>
                    <Card.Img
  variant="top"
  src={`${BASE_URL}${post.imagen}`}
  onError={(e) => {
    console.log("Error al cargar la imagen:", e);
    e.target.onerror = null; 
    e.target.src = "https://via.placeholder.com/150";
  }}
/>
                    <Card.Body>
                      <Card.Title className="fw-bold">{post.Titulos}</Card.Title>
                      <hr />
                      <Card.Text>{post.Contenido}</Card.Text>
                      <Button
                        variant="info"
                        className="float-end mt-2"
                        onClick={(e) => { e.stopPropagation(); handleOpenModal(post); }}
                      >
                        <FaComment className="me-2" /> Comentarios
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
          {datos.length === 0 && !loading && !error && (
            <Alert variant="info">
              No hay publicaciones disponibles en la base de datos.
            </Alert>
          )}
        </Container>

        {selectedPost && (
          <ModalComentarios
            show={showModal}
            handleClose={handleCloseModal}
            comments={comments}
            setComments={setComments}
            entrada={selectedPost}
          />
        )}
      </Modal.Body>
    </>
  );
};

export default ListarEntradas;
