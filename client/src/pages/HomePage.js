import React from "react";
import Register from "../components/Auths/Register";
import { Container, Col, Row } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container>
      <Row>
        <Col lg={4} md={3} sm={2}></Col>
        <Col lg={4} md={6} sm={8}>
          <Register />
        </Col>
        <Col lg={4} md={3} sm={2}></Col>
      </Row>
    </Container>
  );
};

export default HomePage;
