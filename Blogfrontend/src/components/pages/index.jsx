import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import Swal from "sweetalert2";
import axios from 'axios';

const BASE_URL = "https://blog-mn1w.onrender.com/img/";

const BlogIndex = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://blog-mn1w.onrender.com/entradas/traerTodos');
                const allPosts = response.data;

                // Seleccionar tres entradas aleatorias
                const randomPosts = allPosts.sort(() => 0.5 - Math.random()).slice(0, 3);

                setPosts(randomPosts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const message = (post) => {
        Swal.fire({
            icon: 'info',
            title: 'Alerta',
            text: 'Debes iniciar sesión o registrarte para acceder a esta publicación.',
        });
    };

    return (
        <Container className="col-8">
            <Row xs={1} md={3} className="g-4">
                {posts.map(post => (
                    <Col key={post.idEntradas}>
                        <Card className="h-100">
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
                                <Card.Title>{post.Titulos}</Card.Title>
                                <Button variant="info" onClick={() => message(post)}>Ver publicación</Button>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Publicado el {post.fechaPublicacion}</small>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default BlogIndex;
