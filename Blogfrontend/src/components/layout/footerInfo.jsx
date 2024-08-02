import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTwitter, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const FooterInfo = () => {
    return (
        <>
            <Container className="text-center py-4">
            <h2>Jhon Narvaez</h2>   
            <p>Desarrollador Frontend</p>
            <p>
                <a href="mailto:jhon@example.com" className="text-decoration-none">
                    <FaEnvelope /> jhon@example.com
                </a>
            </p>
            <Row className="justify-content-center">
                <Col xs="auto">
                    <a href="https://twitter.com/jhon" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                        <FaTwitter size={30} />
                    </a>
                </Col>
                <Col xs="auto">
                    <a href="https://www.linkedin.com/in/jhon" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                        <FaLinkedin size={30} />
                    </a>
                </Col>
                <Col xs="auto">
                    <a href="https://github.com/jhon" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                        <FaGithub size={30} />
                    </a>
                </Col>
            </Row>
        </Container>
        
        </>

    );
};

export default FooterInfo;
