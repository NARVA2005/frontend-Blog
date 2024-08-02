import React, { useState } from "react";
import { Modal, Button, Card, Form } from "react-bootstrap";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import axios from 'axios';

const ModalComentarios = ({ show, handleClose, comments, setComments, entrada }) => {
  const [newComment, setNewComment] = useState("");
  const [editComment, setEditComment] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const userRole = localStorage.getItem("userRole");

  const handleAddComment = () => {
    setNewComment("");
  };

  const handleDeleteComment = async (id) => {
    try {
      await axios.delete(`https://blog-mn1w.onrender.com/comentarios/eliminarComentario/${id}`);
      setComments(comments.filter(comment => comment.idComentarios !== id));
    } catch (error) {
      console.error("Error al eliminar el comentario:", error);
    }
  };

  const handleOpenEditModal = (comment) => {
    setEditComment(comment);
    setEditContent(comment.Contenido);
    setShowEditModal(true);
  };

  const handleUpdateComment = async () => {
    try {
      const updatedComment = {
        Contenido: editContent,
        fechaComentario: new Date().toISOString() // Fecha y hora actual en formato ISO
      };
  
      console.log(`Updating comment with ID: ${editComment.idComentarios}`);
      console.log('Updated comment data:', updatedComment);
  
      const response = await axios.post(`https://blog-mn1w.onrender.com/comentarios/editarComentario/${editComment.idComentarios}`,
        updatedComment
      );
  
      console.log('Response:', response);
      setComments(comments.map(comment =>
        comment.idComentarios === editComment.idComentarios
          ? { ...comment, Contenido: editContent, fechaComentario: updatedComment.fechaComentario }
          : comment
      ));
      setShowEditModal(false);
      setEditComment(null);
      setEditContent("");
    } catch (error) {
      console.error("Error al actualizar el comentario:", error);
    }
  };
  

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comentarios para {entrada.Titulos}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {comments.length === 0 ? (
            <p>No hay comentarios para esta entrada.</p>
          ) : (
            <ul className="list-unstyled">
              {comments.map((comment, index) => (
                <li key={comment.idComentarios || index} className="mb-3">
                  <Card>
                    <Card.Body>
                      <Card.Title style={{ color: "blue" }}>
                        {comment.Usuario.nombre}
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {comment.fechaComentario}
                      </Card.Subtitle>
                      <Card.Text style={{ color: "green" }}>
                        {comment.Contenido}
                      </Card.Text>
                      <div>
                        <Button variant="button" size="sm" className="me-2">
                          <FaThumbsUp /> Me gusta
                        </Button>
                        <Button variant="button" size="sm" className="me-2">
                          <FaThumbsDown /> No me gusta
                        </Button>
                        {userRole === "admin" && (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteComment(comment.idComentarios)}
                          >
                            Eliminar
                          </Button>
                        )}
                        {userRole === "user" && (
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => handleOpenEditModal(comment)}
                          >
                            Editar
                          </Button>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </li>
              ))}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Comentario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formEditContent">
            <Form.Label>Contenido</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpdateComment}>
            Actualizar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComentarios;
