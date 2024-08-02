import React from 'react';
import { Container, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/aboutUs.css'; // Importa un archivo CSS para estilos personalizados
import blogImg from '../../assets/img/BlogImg.png';
const AboutUs = () => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 p-4">
      <h1 className="text-center mb-5 title-font">Sobre Nosotros</h1>
      <Card className="w-100 max-w-md p-4 rounded-lg shadow-lg custom-card">
        <Card.Img 
          variant="top" 
          src={blogImg} 
          alt="blog" 
          className="mb-4 img-style"
        />
        <Card.Body>
          <Card.Text className="text-muted mb-3 body-text">
            ¡Bienvenido a nuestro blog personal! Somos un equipo apasionado por compartir nuestras experiencias, conocimientos y opiniones sobre diversos temas que nos apasionan.
          </Card.Text>
          <Card.Text className="text-muted mb-3 body-text">
            Explora nuestras publicaciones para descubrir artículos interesantes, consejos útiles y reflexiones inspiradoras. ¡Esperamos que disfrutes de tu tiempo en nuestro espacio virtual!
          </Card.Text>
          <Card.Text className="text-muted body-text">
            No dudes en ponerte en contacto con nosotros si tienes alguna pregunta o sugerencia. ¡Estamos aquí para conectarnos contigo y compartir juntos esta increíble aventura en la blogosfera!
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AboutUs;
